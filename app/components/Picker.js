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
	hasSearchBar,
	icon,
	onSelectItem,
	pickerItemStyle,
	placeholder,
	selectedItem,

	flatListKey = "value",
	fontSize = 20,
	items = [],
	...otherProps
}) {
	const [itemList, setItemList] = useState(items);
	const [modalIsVisible, setModalIsVisible] = useState(false);

	useEffect(() => {
		setItemList(items);
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
						{selectedItem ? selectedItem : placeholder}
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
							onChangeText={(text) => {
								setItemList(
									items
										.slice()
										.sort(firstBy("value").thenBy("label").thenBy("key"))
										.filter((x) =>
											(x.key + x.label + x.value)
												.toLowerCase()
												.includes(text.toLowerCase())
										)
								);
							}}
						/>
					)}
					<FlatList
						data={itemList}
						keyExtractor={(item) => item[flatListKey].toString()}
						ItemSeparatorComponent={ListItemSeparator}
						ListHeaderComponent={
							itemList.length !== items.length && (
								<NettText
									style={styles.searchResultLabel}
								>{`Results - ${itemList.length}`}</NettText>
							)
						}
						renderItem={({ item }) => (
							<NettPickerItem
								style={pickerItemStyle}
								label={item.label}
								onPress={() => {
									setModalIsVisible(false);
									onSelectItem(item);
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
