import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import Screen from "../../components/Screen";
import NettButton from "../../components/Button";
import NettText from "../../components/Text";
import { buttons } from "../../config/enums";
import useAuth from "../../hooks/useAuth";
import { capitalize } from "../../utils";
import TopBar from "../../components/TopBar";

function ProfileScreen({ navigation }) {
	// Context
	const {
		logOut,
		currentUser: { _type, profile },
	} = useAuth();

	return (
		<Screen style={styles.screen}>
			<TopBar>
				<NettText style={styles.title}>Your profile</NettText>
			</TopBar>

			<View style={styles.mainContainer}>
				<Image style={styles.profilePhoto} source={{ uri: profile.picUri }} />
				<NettText style={styles.fullName}>{profile.fullName}</NettText>
				<NettText style={styles.type}>{`✅ ${capitalize(_type)}`}</NettText>
			</View>
			<View style={styles.bottomBar}>
				<NettButton
					style={styles.logoutButton}
					text="Log out"
					type={buttons.TERTIARY}
					onPress={() => logOut()}
				/>
			</View>
		</Screen>
	);
}

export default ProfileScreen;
