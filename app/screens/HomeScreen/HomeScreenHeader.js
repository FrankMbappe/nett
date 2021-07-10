import React from "react";
import { StyleSheet } from "react-native";
import ButtonIcon from "../../components/ButtonIcon";
import NettTextInput from "../../components/TextInput";
import TopBar from "../../components/TopBar";
import colors from "../../config/colors";

function HomeScreenHeader({ isAtInitScrollPosition }) {
	return (
		<TopBar
			style={[
				styles.container,
				!isAtInitScrollPosition && {
					borderColor: colors.light,
				},
			]}
		>
			<ButtonIcon name="qrcode-scan" size={25} />
			<NettTextInput
				icon="magnify"
				containerStyle={{ flex: 1, marginHorizontal: 10 }}
				fontSize={14}
				placeholder="Topics, classrooms, ..."
			/>
			<ButtonIcon name="message-outline" size={25} badge />
		</TopBar>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 70,
		borderBottomWidth: 2,
		borderColor: colors.appBack,
		paddingTop: 5,
		paddingHorizontal: 15,
	},
});

export default HomeScreenHeader;
