import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableHighlight } from "react-native";
import useApi from "../../hooks/useApi";
import classroomsApi from "../../api/classrooms";

import ButtonIcon from "../../components/ButtonIcon";
import Icon from "../../components/Icon";
import TopBar from "../../components/TopBar";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import NettText from "../../components/Text";
import styles from "./styles";
import { PostCard } from "../../components/cards";
import images from "../../config/images";
import FloatingButton from "../../components/FloatingButton";
import { screens } from "../../navigation/routes";
import currentUser from "../../config/test";
import ActivityIndicator from "../../components/ActivityIndicator";
import { userFullName } from "../../utils";

function ClassroomScreen({ route, navigation }) {
	// Getting params
	const { classroomId } = route.params;

	// API
	const {
		data: classroom,
		error,
		isLoading,
		request: loadClassroom,
	} = useApi(classroomsApi.getClassroom);

	useEffect(() => {
		loadClassroom(classroomId);
	}, []);

	// States
	const [isAtInitScrollPosition, setIsAtInitScrollPosition] = useState(true);

	// Extracted variables
	const {
		name,
		posts,
		topics,
		teacher: { profile: teacherProfile },
	} = classroom;
	const teacherFullName = userFullName({ ...teacherProfile });

	return (
		<Screen style={styles.screen} backImage={images.CLASSROOM_BACKGROUND}>
			{/* When an error occurs */}
			{error && !isLoading && (
				<>
					<NettText style={{ padding: 15, fontSize: 18 }}>
						Couldn't connect to the server
					</NettText>
					<NettButton text="Retry" onPress={loadCountries} />
				</>
			)}

			{/* Screen body */}
			{!error && (
				<>
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
								{`Held by ${teacherFullName}`}
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
						data={posts}
						keyExtractor={({ _id }) => String(_id)}
						showsVerticalScrollIndicator={false}
						renderItem={({ item: post }) => (
							<PostCard userId={currentUser.id} post={post} />
						)}
					/>

					<FloatingButton
						icon="pencil"
						onPress={() =>
							navigation.navigate(screens.PostCreation, {
								userId: currentUser.id,
								classroomName: name,
							})
						}
						style={styles.createPostButton}
					/>

					<TouchableHighlight style={styles.footer}>
						<NettText
							style={styles.footerText}
						>{`1 online participant(s)`}</NettText>
					</TouchableHighlight>
				</>
			)}

			{/* Loader */}
			<ActivityIndicator visible={isLoading} />
		</Screen>
	);
}

export default ClassroomScreen;
