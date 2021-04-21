import React from "react";
import { Text, View } from "react-native";

import Screen from "../../components/Screen";
import TinyDescriptionText from "../../components/TinyDescriptionText";
import NettTextInput from "../../components/Nett/TextInput";
import WelcomeTitle from "../../components/Welcome/Title";
import WelcomeBottomBar from "../../components/Welcome/BottomBar";

import styles from "./styles";
import enums from "../../config/enums";

// --- HANDLERS --- //
const handleQuit = () => console.log("Quit");
const handleNext = () => console.log("Next");

// --- SCREEN --- //
function LoginWithPhoneScreen(props) {
	return (
		<Screen style={styles.container}>
			{/* --- Main Box --- */}
			<View style={styles.mainBox}>
				{/* Title */}
				<WelcomeTitle style={styles.title}>
					Enter your phone number
				</WelcomeTitle>

				{/* Input */}
				<View style={styles.inputContainer}>
					<Text style={styles.importantText}>+237</Text>
					<NettTextInput
						style={styles.textInput}
						placeholder={"Your phone number"}
					/>
				</View>

				{/* Description */}
				<TinyDescriptionText style={styles.tinyDescription}>
					Phone numbers are used to register and log into Nett accounts. After
					entering yours, we will send you a confirmation message to verify it.
				</TinyDescriptionText>
			</View>

			{/* --- Bottom bar --- */}
			<WelcomeBottomBar
				buttonStart={{
					text: "Quit",
					type: enums.BUTTON_SECONDARY,
					onPress: handleQuit,
				}}
				buttonEnd={{
					text: "Next",
					type: enums.BUTTON_PRIMARY,
					onPress: handleNext,
				}}
			/>
		</Screen>
	);
}

export default LoginWithPhoneScreen;
