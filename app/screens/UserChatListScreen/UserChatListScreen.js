import React, { useState } from "react";
import { FlatList, View } from "react-native";
import ListItem from "../../components/ListItem";
import ListItemDeleteAction from "../../components/ListItemDeleteAction";
import ListItemSeparator from "../../components/ListItemSeparator";
import Screen from "../../components/Screen";

import images from "../../config/images";
import styles from "./styles";

// Dummy data
const chats = [
	{
		id: 1,
		picUrl: images.USER_DEFAULT,
		user: "Paul Zebaze",
		lastMessage: "Hey what's up? Hope you enjoy!",
	},
	{
		id: 2,
		picUrl: images.USER_DEFAULT,
		user: "Marie Antoinette",
		lastMessage: "Wanna hangout?",
	},
	{
		id: 3,
		picUrl: images.USER_DEFAULT, //"https://picsum.photos/200"
		user: "Kayleen Green",
		lastMessage: "No, not today unfortunately",
	},
];

// --- SCREEN --- //
function UserChatListScreen(props) {
	// Declaration
	const [items, setItems] = useState(chats);
	const [refreshing, setRefreshing] = useState(false);

	// Handlers
	const handleDelete = (item) => {
		// Delete the item from the current array
		setItems(items.filter((i) => i.id != item.id));

		// Call the server to delete that item as well
		// TODO
	};

	// Render
	return (
		<Screen style={styles.screen}>
			<FlatList
				style={styles.flatList}
				data={chats}
				keyExtractor={(chat) => chat.id.toString()}
				renderItem={({ item }) => (
					<ListItem
						style={styles.listItem}
						image={item.picUrl}
						name={item.user}
						description={item.lastMessage}
						imageIsRounded={true}
						onPress={() => console.log("Item selected: ", item)}
						renderRightActions={() => (
							<ListItemDeleteAction onPress={() => handleDelete(item)} />
						)}
					/>
				)}
				ItemSeparatorComponent={ListItemSeparator}
				refreshing={refreshing}
				onRefresh={() => {
					setItems([
						{
							id: 3,
							picUrl: images.USER_DEFAULT, //"https://picsum.photos/200"
							user: "Kayleen Green",
							lastMessage: "No, not today unfortunately",
						},
					]);
				}} // Call the server to get the new list of items
			/>
		</Screen>
	);
}

export default UserChatListScreen;
