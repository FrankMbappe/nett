import React from "react";
import { Text, View } from "react-native";
import { Divider } from "react-native-elements";

import Screen from "../../components/Screen";
import TinyDescriptionText from "../../components/TinyDescriptionText";
import NettTextInput from "../../components/Nett/TextInput";
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
		<Screen style={styles.container}>
			{/* --- Main Box --- */}
			<View style={styles.mainBox}>
				{/* Title */}
				<WelcomeTitle style={styles.title}>
					Confirm your phone number: {phone}
				</WelcomeTitle>

				{/* Directive */}
				<TinyDescriptionText style={styles.tinyDescription}>
					Enter the 4-digit code you were sent by SMS
				</TinyDescriptionText>

				{/* Input */}
				<View style={styles.validationInputContainer}>
					<NettTextInput
						style={styles.textInput}
						placeholder={"4-digit code"}
					/>
				</View>

				{/* Code expiration timer */}
				<View style={styles.codeExpirationContainer}>
					<TinyDescriptionText style={styles.tinyDescription}>
						This code will expire in:
					</TinyDescriptionText>
					<Text style={styles.importantText}>00:50</Text>
				</View>

				{/* Resend code */}
				<View style={styles.resendCode}>
					<Divider style={styles.resendCodeDivider} />
					<View style={styles.resendCodeContainer}>
						<Text style={styles.resendLabel}>Didn't received the code ?</Text>
						<Text style={styles.resendLink}>Resend</Text>
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
