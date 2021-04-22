import React from "react";
import { FlatList } from "react-native";
import ListItem from "../../components/ListItem";

import Screen from "../../components/Screen";

import styles from "./styles";

// Dummy data
const chats = [
	{
		id: 1,
		picUrl: "https://picsum.photos/200",
		user: "Paul Zebaze",
		lastMessage: "Hey what's up? Hope you enjoy!",
	},
	{
		id: 2,
		picUrl: "https://picsum.photos/200",
		user: "Marie Antoinette",
		lastMessage: "Wanna hangout?",
	},
	{
		id: 3,
		picUrl: "https://picsum.photos/200",
		user: "Kayleen Green",
		lastMessage: "No, not today unfortunately",
	},
];

// --- SCREEN --- //
function UserChatListScreen(props) {
	return (
		<Screen style={styles.screen}>
			<FlatList
				data={chats}
				keyExtractor={(chat) => chat.id}
				renderItem={({ item }) => (
					<ListItem
						image={item.picUrl}
						name={item.user}
						description={item.lastMessage}
					/>
				)}
			/>
		</Screen>
	);
}

export default UserChatListScreen;
