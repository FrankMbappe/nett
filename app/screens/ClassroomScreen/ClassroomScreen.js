import React, { useMemo, useState } from "react";
import { View, FlatList, Image, TouchableHighlight } from "react-native";
import ButtonIcon from "../../components/ButtonIcon";
import Icon from "../../components/Icon";
import TopBar from "../../components/TopBar";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import NettText from "../../components/Text";
import styles from "./styles";
import { PostCard } from "../../components/cards";
import { classrooms, users } from "../../config/dummyData";
import images from "../../config/images";
import { compareDesc } from "date-fns";

const sortPosts = (posts) => {
	// Sort: Most recent post first
	return posts.sort((x, y) =>
		compareDesc(new Date(x.createdOn), new Date(y.createdOn))
	);
};
const getData = (classroomId) => {
	return classrooms.find(({ id }) => id === classroomId);
};
const getTeacherData = (teacherId) => {
	return users.find(({ id }) => id === teacherId).profile;
};

function ClassroomScreen({
	route: {
		params: { id: classroomId },
	},
	navigation,
}) {
	const [isAtInitScrollPosition, setIsAtInitScrollPosition] = useState(true);
	const [
		{
			name,
			posts,
			topics,
			teacher: { id: teacherId },
		},
		setClassroom,
	] = useState(getData(classroomId));
	const { fullName } = useMemo(() => getTeacherData(teacherId), [teacherId]);

	return (
		<Screen style={styles.screen} backImage={images.CLASSROOM_BACKGROUND}>
			<TopBar style={styles.topBar}>
				<ButtonIcon
					name="arrow-left"
					size={25}
					onPress={() => navigation.goBack()}
				/>
				<Icon
					name="school"
					iconColor={colors.ok}
					backgroundColor={colors.okLight}
					style={styles.classroomPic}
				/>
				<View style={styles.topBarTitleContainer}>
					<NettText style={styles.topBarTitle} numberOfLines={1}>
						{name}
					</NettText>
					<NettText style={styles.topBarCaption} numberOfLines={1}>
						{`Held by ${fullName}`}
					</NettText>
				</View>
				<ButtonIcon name="magnify" />
				<ButtonIcon name="dots-vertical" />
			</TopBar>

			{topics != null && topics.length > 0 && (
				<View style={styles.topicFlatListContainer}>
					<FlatList
						contentContainerStyle={[styles.topicFlatListContent]}
						style={[
							styles.topicFlatList,
							!isAtInitScrollPosition && {
								borderBottomColor: colors.light,
							},
						]}
						data={topics}
						keyExtractor={({ id }) => String(id)}
						renderItem={({ item: { title } }) => (
							<NettText style={styles.topic}>{title}</NettText>
						)}
						horizontal
						showsHorizontalScrollIndicator={false}
					/>
				</View>
			)}

			<FlatList
				contentContainerStyle={styles.postFlatListContent}
				onScroll={(event) =>
					setIsAtInitScrollPosition(event.nativeEvent.contentOffset.y === 0)
				}
				data={sortPosts(posts)}
				keyExtractor={({ id }) => String(id)}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => <PostCard userId="usr-100" post={item} />} // TODO: userId = current user
			/>

			<TouchableHighlight style={styles.footer}>
				<NettText
					style={styles.footerText}
				>{`15 online participants`}</NettText>
			</TouchableHighlight>
		</Screen>
	);
}

export default ClassroomScreen;
