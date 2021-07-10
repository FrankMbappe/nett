import React from "react";
import { StyleSheet } from "react-native";
import ButtonIcon from "../../components/ButtonIcon";
import NettText from "../../components/Text";
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
			<NettText style={styles.appName}>nett.io</NettText>

			<ButtonIcon
				name="magnify"
				color={colors.white}
				size={22}
				containerStyle={styles.icon}
			/>
			<ButtonIcon
				name="message-outline"
				color={colors.white}
				size={22}
				badge
				containerStyle={styles.icon}
				badgeStyle={styles.badge}
			/>
			<ButtonIcon
				name="qrcode-scan"
				color={colors.white}
				size={22}
				containerStyle={styles.icon}
			/>
		</TopBar>
	);
}

const styles = StyleSheet.create({
	appName: {
		flex: 1,
		fontSize: 24,
		color: colors.white,
		fontWeight: "bold",
	},
	badge: {
		backgroundColor: colors.white,
		borderColor: colors.appPrimary,
	},
	container: {
		borderBottomWidth: 2,
		borderColor: colors.appPrimary,
		paddingHorizontal: 15,
		backgroundColor: colors.appPrimary,
	},
	icon: {
		margin: 5,
	},
});

export default HomeScreenHeader;
