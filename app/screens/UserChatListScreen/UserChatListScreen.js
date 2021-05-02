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
		user:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula lectus, posuere vel tempor a, pharetra quis risus. Etiam sed cursus orci. Sed id sollicitudin elit, eget scelerisque erat. Ut finibus nec augue ut suscipit. Phasellus scelerisque lacus eu viverra ultrices. Curabitur porttitor, ex eu sodales pharetra, ipsum elit pellentesque risus, ac ornare tellus augue ut urna. Quisque lorem est, feugiat non lacinia id, egestas vitae tellus. Praesent in bibendum justo, eget convallis arcu. Aenean rhoncus gravida dui sit amet tristique. Donec nec orci porttitor, cursus libero in, consectetur magna. Integer tincidunt mi eget laoreet pretium. Aenean accumsan convallis tellus id porttitor.",
		lastMessage:
			"Curabitur eu ullamcorper lectus. Duis maximus arcu quis cursus ultricies. Sed at orci in neque sagittis venenatis et vel massa. Morbi efficitur varius aliquam. Etiam quis sapien sit amet massa ullamcorper consectetur quis sit amet nisi. Sed nec rhoncus magna. Phasellus eleifend, leo eu consectetur finibus, massa nisl iaculis ligula, et sagittis nisi tortor consequat metus.",
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
						isChatItem
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
