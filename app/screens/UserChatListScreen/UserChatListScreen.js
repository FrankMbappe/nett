import React, { useState } from "react";
import { FlatList } from "react-native";
import ListItem from "../../components/lists/ListItem";
import ListItemDeleteAction from "../../components/lists/ListItemDeleteAction";
import ListItemSeparator from "../../components/lists/ListItemSeparator";
import Screen from "../../components/Screen";

import images from "../../config/images";
import styles from "./styles";

// Dummy data
const chats = [
	{
		id: 1,
		picUrl: images.random,
		user: "Paul Zebaze",
		lastMessage: "Hey what's up? Hope you enjoy!",
	},
	{
		id: 2,
		user: "Marie Antoinette",
		lastMessage: "Wanna hangout?",
	},
	{
		id: 3,
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
		console.log("Deletion triggered: ", item);

		// Delete the item from the current array
		setItems(items.filter((i) => i.id !== item.id));

		// TODO: Call the server to delete that item as well
	};

	// Render
	return (
		<Screen style={styles.screen}>
			<FlatList
				style={styles.flatList}
				data={items}
				keyExtractor={(chat) => chat.id.toString()}
				renderItem={({ item }) => (
					<ListItem
						style={styles.listItem}
						image={item.picUrl ? item.picUrl : images.USER_DEFAULT}
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
					setItems(chats); // TODO: Call the server to get the new list of items
				}}
			/>
		</Screen>
	);
}

export default UserChatListScreen;
