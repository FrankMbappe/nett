import React from "react";
import { Text, View } from "react-native";

import Screen from "../../components/Screen";
import TinyTextDescription from "../../components/TinyTextDescription";
import NettTextInput from "../../components/NettTextInput";
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
		<Screen style={styles.screen}>
			{/* --- Main container --- */}
			<View style={styles.mainContainer}>
				{/* Title */}
				<WelcomeTitle style={styles.titleContainer}>
					Enter your phone number
				</WelcomeTitle>

				{/* Input */}
				<View style={styles.inputContainer}>
					<Text style={styles.countryIndicator}>+237</Text>
					<NettTextInput
						style={styles.input}
						placeholder={"Your phone number"}
						keyboardType={"phone-pad"}
						maxLength={9}
					/>
				</View>

				{/* Description */}
				<TinyTextDescription style={styles.inputDescription}>
					Phone numbers are used to register and log into Nett accounts. After
					entering yours, we will send you a confirmation message to verify it.
				</TinyTextDescription>
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
