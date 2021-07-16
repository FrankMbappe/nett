import React from "react";
import { View } from "react-native";
import styles from "./styles";
import Screen from "../../components/Screen";
import NettButton from "../../components/Button";

import { screens } from "../../navigation/routes";

function QuizPreviewScreen({ navigation }) {
	return (
		<Screen style={styles.screen}>
			<View style={styles.mainContainer}></View>
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

export default QuizPreviewScreen;
