import React, { useState } from "react";
import {
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	FlatList,
	View,
	Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "./Screen";
import NettButton from "./NettButton";

import colors from "../config/colors";
import enums from "../config/enums";
import NettPickerItem from "./NettPickerItem";

function NettPicker({
	icon,
	items,
	onSelectItem,
	selectedItem,
	placeholder,
	fontSize = 20,
	...otherProps
}) {
	const [modalIsVisible, setModalIsVisible] = useState(false);

	return (
		<>
			<TouchableWithoutFeedback onPress={() => setModalIsVisible(true)}>
				<View
					style={[
						styles.container,
						{ padding: fontSize * 0.75 },
						otherProps.style,
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
					<Text
						style={[styles.text, { fontSize }, otherProps.style]}
						{...otherProps}
					>
						{selectedItem ? selectedItem : placeholder}
					</Text>
					<MaterialCommunityIcons
						name={"chevron-down"}
						size={fontSize * 1.5}
						color={colors.medium}
					/>
				</View>
			</TouchableWithoutFeedback>
			<Modal visible={modalIsVisible} animationType="slide">
				<Screen style={{ paddingHorizontal: 10 }}>
					<NettButton
						text="Close"
						type={enums.BUTTON_TERTIARY}
						onPress={() => setModalIsVisible(false)}
					/>
					<FlatList
						data={items}
						keyExtractor={(item) => item.value.toString()}
						renderItem={({ item }) => (
							<NettPickerItem
								label={item.label}
								onPress={() => {
									setModalIsVisible(false);
									onSelectItem(item);
								}}
								fontSize={15}
							/>
						)}
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
		width: "100%",
	},
	text: {
		width: "100%",
		color: colors.dark,
		flex: 1,
	},
});

export default NettPicker;
