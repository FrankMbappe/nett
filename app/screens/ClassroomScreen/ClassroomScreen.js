import React, { useState } from "react";
import { View, FlatList, Image, TouchableHighlight } from "react-native";
import ButtonIcon from "../../components/ButtonIcon";
import Icon from "../../components/Icon";
import TopBar from "../../components/TopBar";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import NettText from "../../components/Text";
import styles from "./styles";
import { PostCard } from "../../components/cards";
import { posts } from "../../config/dummyData";
import images from "../../config/images";
import { compareDesc } from "date-fns";

const topics = [
	"Genomics",
	"Metabolism",
	"Hyperglycemia",
	"Cardiac muscle",
	"AIDS",
];

function sortPosts(array = posts) {
	// Sort: Most recent post first
	return array.sort((x, y) =>
		compareDesc(new Date(x.createdOn), new Date(y.createdOn))
	);
}

function ClassroomScreen({
	userId,
	classroom: {
		id,
		name,
		teacher: { profile: teacherProfile },
	},
}) {
	const [isAtInitScrollPosition, setIsAtInitScrollPosition] = useState(true);

	return (
		<Screen style={styles.screen}>
			<TopBar style={styles.topBar}>
				<ButtonIcon name="arrow-left" size={25} />
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
						{`Held by ${teacherProfile.fullName}`}
					</NettText>
				</View>
				<ButtonIcon name="magnify" />
				<ButtonIcon name="dots-vertical" />
			</TopBar>

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
					keyExtractor={(_, index) => String(index)}
					renderItem={({ item }) => (
						<NettText style={styles.topic}>{item}</NettText>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
				/>
			</View>

			<View style={styles.postFlatListContainer}>
				<Image
					source={images.CLASSROOM_BACKGROUND}
					style={styles.postFlatListBackground}
				/>
				<FlatList
					contentContainerStyle={styles.postFlatListContent}
					onScroll={(event) =>
						setIsAtInitScrollPosition(event.nativeEvent.contentOffset.y === 0)
					}
					data={sortPosts(posts.filter((x) => x.classroom === id))}
					keyExtractor={(_, index) => String(index)}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<PostCard userId="usr-100" post={item} classroomName={name} />
					)}
				/>
			</View>

			<TouchableHighlight style={styles.footer}>
				<NettText>{`15 persons connected`}</NettText>
			</TouchableHighlight>
		</Screen>
	);
}

export default ClassroomScreen;
