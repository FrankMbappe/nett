import React, { useContext } from "react";
import { View } from "react-native";

import styles from "./styles";
import Screen from "../../components/Screen";
import NettButton from "../../components/Button";

import NettText from "../../components/Text";
import { buttons } from "../../config/enums";
import AuthContext from "../../auth/context";
import authStorage from "../../auth/storage";

function ProfileScreen({ navigation }) {
	// Context
	const { setCurrentUser } = useContext(AuthContext);

	// Action handlers
	const handleLogout = () => {
		setCurrentUser(null);
		authStorage.removeToken();
	};

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
					onPress={handleLogout}
				/>
			</View>
		</Screen>
	);
}

export default ProfileScreen;