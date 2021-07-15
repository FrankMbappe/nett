import React from "react";
import { View } from "react-native";
import styles from "./styles";
import Screen from "../../components/Screen";
import NettButton from "../../components/Button";
import NettText from "../../components/Text";
import { buttons } from "../../config/enums";
import useAuth from "../../hooks/useAuth";

function ProfileScreen({ navigation }) {
	// Context
	const { logOut } = useAuth();

	return (
		<Screen style={styles.screen}>
			<View style={styles.mainContainer}>
				<NettText>Profile</NettText>
			</View>
			<View style={styles.bottomBar}>
				<NettButton
					style={styles.logoutButton}
					text="Log out"
					type={buttons.SECONDARY}
					onPress={() => logOut()}
				/>
			</View>
		</Screen>
	);
}

export default ProfileScreen;
