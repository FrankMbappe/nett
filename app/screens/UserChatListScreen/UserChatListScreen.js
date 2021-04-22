import React from "react";
import { FlatList } from "react-native";
import ListItem from "../../components/ListItem";

import Screen from "../../components/Screen";
import icons from "../../config/icons";

import styles from "./styles";

// Dummy data
const chats = [
	{
		id: 1,
		picUrl: icons.USER_DEFAULT,
		user: "Paul Zebaze",
		lastMessage: "Hey what's up? Hope you enjoy!",
	},
	{
		id: 2,
		picUrl: icons.USER_DEFAULT,
		user: "Marie Antoinette",
		lastMessage: "Wanna hangout?",
	},
	{
		id: 3,
		picUrl: icons.USER_DEFAULT, //"https://picsum.photos/200"
		user: "Kayleen Green",
		lastMessage: "No, not today unfortunately",
	},
];

// --- SCREEN --- //
function UserChatListScreen(props) {
	return (
		<Screen style={styles.screen}>
			<FlatList
				style={styles.flatList}
				data={chats}
				keyExtractor={(chat) => chat.id}
				renderItem={({ item }) => (
					<ListItem
						style={styles.listItem}
						image={item.picUrl}
						name={item.user}
						description={item.lastMessage}
						imageIsRounded={true}
					/>
				)}
			/>
		</Screen>
	);
}

export default UserChatListScreen;
