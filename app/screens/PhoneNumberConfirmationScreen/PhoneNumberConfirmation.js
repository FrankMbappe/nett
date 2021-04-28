import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Divider } from "react-native-elements";

import NettTextInput from "../../components/NettTextInput";
import NettButton from "../../components/NettButton";
import Screen from "../../components/Screen";
import TinyTextDescription from "../../components/TinyTextDescription";
import WelcomeTitle from "../../components/welcome/Title";
import WelcomeBottomBar from "../../components/welcome/BottomBar";

import styles from "./styles";
import { buttons } from "../../config/enums";

// --- HANDLERS --- //
const handlePrevious = () => console.log("Previous");
const handleNext = () => console.log("Next");

// --- SCREEN --- //
function PhoneNumberConfirmation({ phone }) {
	const [timerLeft, setTimerLeft] = useState(30);
	useEffect(() => {
		const timer = setTimeout(() => {
			if (!timerLeft) return;
			setTimerLeft(timerLeft - 1);
		}, 1000);
		return () => clearTimeout(timer);
	});

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
						fontSize={18}
						maxLength={4}
					/>
				</View>

				{/* Code expiration timer */}
				<View style={styles.timerContainer}>
					<TinyTextDescription style={styles.timerDescription}>
						Time left before expiration:
					</TinyTextDescription>
					<Text style={styles.timer}>
						{timerLeft
							? new Date(timerLeft * 1000).toISOString().substr(14, 5)
							: "Expired"}
					</Text>
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
			{timerLeft ? (
				<WelcomeBottomBar
					style={styles.bottomBar}
					buttonStart={{
						text: "Previous",
						type: buttons.SECONDARY,
						onPress: handlePrevious,
					}}
					buttonEnd={{
						text: "Next",
						type: buttons.PRIMARY,
						disabled: !timerLeft, // TODO: Disable button when timer's value == 0
						onPress: handleNext,
					}}
				/>
			) : (
				<View style={styles.bottomBar}>
					<NettButton text="Retry" onPress={handlePrevious} />
				</View>
			)}
		</Screen>
	);
}

export default PhoneNumberConfirmation;
