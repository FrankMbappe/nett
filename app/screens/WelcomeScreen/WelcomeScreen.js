import React from "react";
import { View } from "react-native";

import Screen from "../../components/Screen";
import StartTitle from "../../components/start/Title";

import styles from "./styles";
import NettButton from "../../components/Button";
import { buttons } from "../../config/enums";

function WelcomeScreen({ navigation }) {
	return (
		<Screen style={styles.screen}>
			<View style={styles.mainContainer}>
				<StartTitle style={styles.titleContainer}>Welcome on Nett!</StartTitle>
			</View>
			<View style={styles.bottomBar}>
				<NettButton style={styles.loginButton} text="Login" />
				<NettButton
					style={styles.registerButton}
					text="Register"
					type={buttons.TERTIARY}
				/>
			</View>
		</Screen>
	);
}

export default WelcomeScreen;
