import React, { useEffect, useState } from "react";
import {
	FlatList,
	Modal,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firstBy } from "thenby";

import { ListItemSeparator } from "./lists";
import ButtonIcon from "./ButtonIcon";
import NettPickerItem from "./PickerItem";
import NettText from "./Text";
import NettTextInput from "./TextInput";
import Screen from "./Screen";

import colors from "../config/colors";

function NettPicker({
	// Picker props
	hasSearchBar,
	icon,
	placeholder,
	fontSize = 20,

	// List of items
	onChangeSearchText,
	listItems = [],
	listItemKey = "value",
	selectedListItem,
	onSelectListItem,
	listItemStyle,
	showListItemValue,

	...otherProps
}) {
	const [itemList, setItemList] = useState(listItems);
	const [modalIsVisible, setModalIsVisible] = useState(false);

	useEffect(() => {
		setItemList(listItems);
	}, [modalIsVisible]);

	return (
		<>
			<TouchableWithoutFeedback onPress={() => setModalIsVisible(true)}>
				<View
					style={[
						styles.container,
						{ padding: fontSize * 0.75 },
						otherProps.containerStyle,
					]}
				>
					{icon && (
						<MaterialCommunityIcons
							name={icon}
							size={fontSize * 1.67}
							color={colors.medium}
							style={{ marginEnd: fontSize * 0.65 }}
						/>
					)}
					<NettText
						style={[styles.text, { fontSize }, otherProps.style]}
						{...otherProps}
					>
						{selectedListItem ? selectedListItem : placeholder}
					</NettText>
					<MaterialCommunityIcons
						name={"chevron-down"}
						size={fontSize * 1.5}
						color={colors.medium}
					/>
				</View>
			</TouchableWithoutFeedback>
			<Modal
				statusBarTranslucent
				visible={modalIsVisible}
				animationType="slide"
				onRequestClose={() => {
					setModalIsVisible(false);
				}}
			>
				<Screen style={styles.modalScreen}>
					<ButtonIcon
						name="close"
						containerStyle={styles.modalCloseButton}
						size={30}
						onPress={() => setModalIsVisible(false)}
					/>
					{hasSearchBar && (
						<NettTextInput
							autoFocus={true}
							containerStyle={styles.searchBar}
							icon="magnify"
							fontSize={15}
							placeholder="Search an item..."
							onChangeText={(text) => onChangeSearchText(text)}
						/>
					)}
					<FlatList
						data={itemList}
						keyExtractor={(item) => String(item[listItemKey])}
						ItemSeparatorComponent={ListItemSeparator}
						ListHeaderComponent={
							listItems != null &&
							itemList.length !== listItems.length && (
								<NettText
									style={styles.searchResultLabel}
								>{`Results - ${itemList.length}`}</NettText>
							)
						}
						renderItem={({ item }) => (
							<NettPickerItem
								style={listItemStyle}
								label={showListItemValue(item)}
								onPress={() => {
									setModalIsVisible(false);
									onSelectListItem(item);
								}}
								fontSize={15}
							/>
						)}
						style={styles.flatList}
					/>
				</Screen>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.lighter,
		borderRadius: 15,
		flexDirection: "row",
		alignItems: "center",
	},
	flatList: {
		width: "100%",
	},
	modalCloseButton: {
		alignItems: "center",
		backgroundColor: colors.light,
		borderRadius: 25,
		height: 50,
		justifyContent: "center",
		marginBottom: 15,
		width: 50,
	},
	modalScreen: { alignItems: "center", paddingHorizontal: 10 },
	searchBar: { marginBottom: 15 },
	searchResultLabel: { fontWeight: "bold" },
});

export default NettPicker;
