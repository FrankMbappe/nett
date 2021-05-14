import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { compareAsc, compareDesc } from "date-fns";

import { ClassroomCard, PostCard } from "../../components/cards";
import ButtonIcon from "../../components/ButtonIcon";
import NettTextInput from "../../components/TextInput";
import SectionHeader from "../../components/SectionHeader";
import Screen from "../../components/Screen";
import TopBar from "../../components/TopBar";

import { classrooms, posts } from "../../config/dummyData";

import styles from "./styles";

function Header() {
	return (
		<TopBar style={styles.header}>
			<ButtonIcon name="qrcode-scan" containerStyle={{ margin: 7 }} size={30} />
			<NettTextInput
				icon="magnify"
				containerStyle={{ flex: 1 }}
				fontSize={15}
				placeholder="Topics, classrooms, ..."
			/>
			<ButtonIcon
				name="bell-outline"
				containerStyle={{ margin: 7 }}
				size={30}
			/>
		</TopBar>
	);
}

function HomeScreen(props) {
	const [classroomList, setClassroomList] = useState(classrooms);
	const [postList, setPostList] = useState(
		posts
			.slice()
			.sort((x, y) => compareDesc(new Date(x.createdOn), new Date(y.createdOn)))
	);

	return (
		<Screen style={styles.screen}>
			<Header />
			<View style={{ flex: 1 }}>
				<SectionHeader
					icon="google-classroom"
					title="Classrooms"
					endLinkText="Show all"
					onPressEndlink={() => alert("Shown")}
				/>
				<FlatList
					style={{
						backgroundColor: "aquamarine",
						flex: 1,
					}}
					data={classroomList}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <ClassroomCard classroom={item} />}
					horizontal
				/>
				<FlatList
					style={{
						backgroundColor: "salmon",
						flex: 1,
					}}
					contentContainerStyle={{ alignItems: "center", width: "100%" }}
					data={postList}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <PostCard userId="usr-100" post={item} />}
				/>
			</View>
		</Screen>
	);
}

export default HomeScreen;
