import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Divider } from "react-native-elements";

import NettButton from "../../components/Button";
import NettText from "../../components/Text";
import NettTextInput from "../../components/TextInput";
import Screen from "../../components/Screen";
import StartTitle from "../../components/start/Title";
import StartBottomBar from "../../components/start/BottomBar";

import styles from "./styles";
import { buttons } from "../../config/enums";

// --- HANDLERS --- //
const handlePrevious = () => console.log("Previous");
const handleNext = () => console.log("Next");

// --- SCREEN --- //
function PhoneNumberConfirmation({ phone }) {
	//#region - TIMER COUNTDOWN
	const [timerLeft, setTimerLeft] = useState(35);
	useEffect(() => {
		const timer = setTimeout(() => {
			if (!timerLeft) return;
			setTimerLeft(timerLeft - 1);
		}, 1000);
		return () => clearTimeout(timer);
	}, [timerLeft]);
	//#endregion

	return (
		<Screen style={styles.screen}>
			{/* --- Main Box --- */}
			<View style={styles.mainContainer}>
				{/* Title */}
				<StartTitle style={styles.titleContainer}>
					Confirm your phone number: {phone}
				</StartTitle>

				{/* Input */}
				<NettText style={styles.inputDescription}>
					Enter the 4-digit code you were sent by SMS
				</NettText>
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
					<NettText style={styles.timerDescription}>
						Time left before expiration:
					</NettText>
					<NettText style={styles.timer}>
						{timerLeft
							? new Date(timerLeft * 1000).toISOString().substr(14, 5)
							: "Expired"}
					</NettText>
				</View>

				{/* Resend code */}
				<View style={styles.resendCodeContainer}>
					<Divider style={styles.resendCodeDivider} />
					<View style={styles.resendCodeTextContainer}>
						<NettText style={styles.resendCodeLabel}>
							Didn't receive the code?
						</NettText>
						<NettText style={styles.resendCodeLink}>Resend</NettText>
					</View>
				</View>
			</View>

			{/* --- Bottom bar --- */}
			{timerLeft ? (
				<StartBottomBar
					style={styles.bottomBar}
					buttonStart={
						<NettButton
							text="Previous"
							type={buttons.SECONDARY}
							onPress={handlePrevious}
						/>
					}
					buttonEnd={
						<NettButton
							text="Next"
							type={buttons.PRIMARY}
							onPress={handleNext}
						/>
					}
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
