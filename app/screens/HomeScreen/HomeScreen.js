import React, { useState } from "react";
import { FlatList, SectionList, View } from "react-native";
import { compareDesc } from "date-fns";

import { ClassroomCard, PostCard } from "../../components/cards";
import ButtonIcon from "../../components/ButtonIcon";
import NettTextInput from "../../components/TextInput";
import SectionHeader from "../../components/SectionHeader";
import Screen from "../../components/Screen";
import TopBar from "../../components/TopBar";

import { classrooms, posts } from "../../config/dummyData";

import styles from "./styles";
import colors from "../../config/colors";

function Header({ isAtInitScrollPosition }) {
	return (
		<TopBar
			style={[
				styles.header,
				!isAtInitScrollPosition && {
					borderBottomWidth: 2,
					borderColor: colors.light,
				},
			]}
		>
			<ButtonIcon name="qrcode-scan" size={25} />
			<NettTextInput
				icon="magnify"
				containerStyle={{ flex: 1, marginHorizontal: 7 }}
				fontSize={14}
				placeholder="Topics, classrooms, ..."
			/>
			<ButtonIcon name="bell-outline" size={25} />
		</TopBar>
	);
}

function HomeScreen(props) {
	const [classroomList, setClassroomList] = useState(classrooms);
	const [postList, setPostList] = useState(
		posts.sort((x, y) =>
			compareDesc(new Date(x.createdOn), new Date(y.createdOn))
		)
	);
	const [isInitScrollPosition, setIsInitScrollPosition] = useState(true);

	const DATA = [
		{
			Title: (
				<SectionHeader
					expand
					icon="google-classroom"
					title="Classrooms"
					endLinkText="Show all"
					onExpansion={() => alert("Shown")}
				/>
			),
			data: [
				<FlatList
					style={{ flexGrow: 0 }}
					data={classroomList}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <ClassroomCard classroom={item} />}
					horizontal
				/>,
			],
		},
		{
			Title: <SectionHeader title="Recent updates" />,
			data: postList,
		},
	];

	return (
		<Screen style={styles.screen}>
			<Header isAtInitScrollPosition={isInitScrollPosition} />
			<SectionList
				keyExtractor={(_, index) => String(index)}
				contentContainerStyle={{ alignItems: "center" }}
				style={{ flex: 1 }}
				sections={DATA}
				onScroll={(event) =>
					setIsInitScrollPosition(event.nativeEvent.contentOffset.y === 0)
				}
				renderSectionHeader={({ section: { Title } }) => Title}
				renderItem={({ item }) => {
					if (React.isValidElement(item)) return item;
					else
						return (
							<PostCard
								userId="usr-100"
								post={item}
								classroomName={
									classrooms.find((x) => x.id === item.classroom).name
								}
							/>
						);
				}}
			/>
		</Screen>
	);
}

export default HomeScreen;
