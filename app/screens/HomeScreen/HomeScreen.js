import React, { useEffect, useState } from "react";
import { SectionList, View } from "react-native";
import useApi from "../../hooks/useApi";
import classroomsApi from "../../api/classrooms";

import { PostCard } from "../../components/cards";
import ActivityIndicator from "../../components/ActivityIndicator";
import HomeScreenHeader from "./HomeScreenHeader";
import Screen from "../../components/Screen";
import { getClassroomInfo, userFullName } from "../../utils";
import ApiError from "../../components/ApiError";
import {
	handlePublishComment,
	handleShare,
} from "../ClassroomScreen/ClassroomScreen";

import styles from "./styles";
import getHomeScreenSections from "./sections";
import useAuth from "../../hooks/useAuth";

function HomeScreen({ navigation }) {
	// Context
	const { currentUser } = useAuth();

	// API
	const {
		data: classrooms,
		error,
		isLoading,
		request: loadClassrooms,
	} = useApi(classroomsApi.getClassrooms);

	// States
	const [isInitScrollPosition, setIsInitScrollPosition] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [sections, setSections] = useState([]);

	// Effects
	useEffect(() => {
		loadClassrooms();
	}, []);

	useEffect(() => {
		if (!isLoading) {
			console.log(error);
			console.log(classrooms.length);
			setSections(getHomeScreenSections(classrooms));
		}
	}, [isLoading]);

	return (
		<Screen style={styles.screen}>
			{/* When an error occurs */}
			<ApiError show={error && !isLoading} onPressRetry={loadClassrooms} />

			{/* Screen body */}
			{!error && (
				<>
					{/* --> Header */}
					<HomeScreenHeader isAtInitScrollPosition={isInitScrollPosition} />

					{/* --> Main content */}
					<View style={styles.mainContainer}>
						<SectionList
							keyExtractor={(_, index) => String(index)}
							contentContainerStyle={{ alignItems: "center" }}
							style={{ flex: 1, opacity: error || isLoading ? 0 : 1 }}
							sections={sections}
							onRefresh={loadClassrooms}
							onScroll={(event) =>
								setIsInitScrollPosition(event.nativeEvent.contentOffset.y === 0)
							}
							refreshing={refreshing}
							renderSectionHeader={({ section: { Title } }) => Title}
							renderItem={({ item: post }) => {
								if (!post) return null;
								if (React.isValidElement(post)) return post;
								else {
									// Getting classroom info
									const classroom = getClassroomInfo(classrooms, post);
									return classroom ? (
										<PostCard
											currentUserId={currentUser._id}
											post={{
												...post,
												author: {
													fullName: userFullName({ ...post.author.profile }),
													picUri: post.author.profile.picUri,
												},
												classroom: classroom.name,
											}}
											onLike={() => alert("Call endpoint /like")}
											onPublishComment={(text) =>
												handlePublishComment(classroom._id, post._id, text)
											}
											onShare={() => handleShare(post.text)}
										/>
									) : null;
								}
							}}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				</>
			)}

			{/* Loader */}
			<ActivityIndicator visible={isLoading} />
		</Screen>
	);
}

export default HomeScreen;
