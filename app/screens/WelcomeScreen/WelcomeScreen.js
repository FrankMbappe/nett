import React from "react";
import { View } from "react-native";

import styles from "./styles";
import Screen from "../../components/Screen";
import StartTitle from "../../components/start/Title";
import NettButton from "../../components/Button";

import { screens } from "../../config/navigators";

function WelcomeScreen({ navigation }) {
	return (
		<Screen style={styles.screen}>
			<View style={styles.mainContainer}>
				<StartTitle style={styles.titleContainer}>Welcome on Nett!</StartTitle>
			</View>
			<View style={styles.bottomBar}>
				<NettButton
					style={styles.loginButton}
					text="Get started"
					onPress={() => navigation.navigate(screens.LoginWithPhoneNumber)}
				/>
			</View>
		</Screen>
	);
}

export default WelcomeScreen;
