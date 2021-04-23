import React from "react";
import { Text, View } from "react-native";
import { Divider } from "react-native-elements";

import Screen from "../../components/Screen";
import TinyTextDescription from "../../components/TinyTextDescription";
import NettTextInput from "../../components/NettTextInput";
import WelcomeTitle from "../../components/Welcome/Title";
import WelcomeBottomBar from "../../components/Welcome/BottomBar";

import styles from "./styles";
import enums from "../../config/enums";

// --- HANDLERS --- //
const handlePrevious = () => console.log("Previous");
const handleNext = () => console.log("Next");

// --- SCREEN --- //
function PhoneNumberConfirmation({ phone }) {
	return (
		<Screen style={styles.screen}>
			{/* --- Main Box --- */}
			<View style={styles.mainContainer}>
				{/* Title */}
				<WelcomeTitle style={styles.titleContainer}>
					Confirm your phone number: {phone}
				</WelcomeTitle>

				{/* Directive */}
				<TinyTextDescription style={styles.inputDescription}>
					Enter the 4-digit code you were sent by SMS
				</TinyTextDescription>

				{/* Input */}
				<View style={styles.inputContainer}>
					<NettTextInput
						style={styles.codeInput}
						placeholder={"4-digit code"}
						keyboardType={"numeric"}
						icon={"key"}
						maxLength={4}
					/>
				</View>

				{/* Code expiration timer */}
				<View style={styles.timerContainer}>
					<TinyTextDescription style={styles.timerDescription}>
						This code will expire in:
					</TinyTextDescription>
					<Text style={styles.timer}>00:50</Text>
				</View>

				{/* Resend code */}
				<View style={styles.resendCodeContainer}>
					<Divider style={styles.resendCodeDivider} />
					<View style={styles.resendCodeTextContainer}>
						<Text style={styles.resendCodeLabel}>
							Didn't received the code ?
						</Text>
						<Text style={styles.resendCodeLink}>Resend</Text>
					</View>
				</View>
			</View>

			{/* --- Bottom bar --- */}
			<WelcomeBottomBar
				buttonStart={{
					text: "Previous",
					type: enums.BUTTON_SECONDARY,
					onPress: handlePrevious,
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

export default PhoneNumberConfirmation;
