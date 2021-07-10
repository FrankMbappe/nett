import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Divider } from "react-native-elements";
import authApi from "../../api/auth";
import Toast from "react-native-root-toast";

import NettButton from "../../components/Button";
import NettText from "../../components/Text";
import NettTextInput from "../../components/TextInput";
import Screen from "../../components/Screen";
import StartTitle from "../../components/start/Title";
import StartBottomBar from "../../components/start/BottomBar";

import styles from "./styles";
import { buttons } from "../../config/enums";
import { navigators, screens } from "../../navigation/routes";
import UploadScreen from "../UploadScreen/UploadScreen";
import ActivityIndicator from "../../components/ActivityIndicator";
import colors from "../../config/colors";

function PhoneNumberConfirmationScreen({ route, navigation }) {
	// Params
	const { phone } = route.params;
	const timerValue = 600; // In seconds, 10 minutes

	// States
	const [validationCode, setValidationCode] = useState("");
	const [doneAnimVisible, setDoneAnimVisible] = useState(false);
	const [showLoader, setShowLoader] = useState(false);
	const apiResult = useRef();

	//#region - TIMER COUNTDOWN
	const [timerLeft, setTimerLeft] = useState(timerValue);
	useEffect(() => {
		const timer = setTimeout(() => {
			if (!timerLeft) return;
			setTimerLeft(timerLeft - 1);
		}, 1000);
		return () => clearTimeout(timer);
	}, [timerLeft]);
	//#endregion

	// Action handlers
	const handlePrevious = () => {
		navigation.goBack();
	};
	const handleSubmit = async () => {
		// Here, I attempt to verify the phone number
		setShowLoader(true);
		const result = await authApi.verify(phone, validationCode);

		// Failure
		if (!result) {
			setShowLoader(false);
			apiResult.current = null;
			return Toast.show(
				"Please retry, something went wrong while verifying your phone number.",
				{ duration: Toast.durations.LONG, backgroundColor: colors.danger }
			);
		}

		// Success
		apiResult.current = result;
		setShowLoader(false); // I dismiss the loader
		setDoneAnimVisible(true); // Then I show the done animation, which will trigger 'handleDone'
	};
	const handleSuccess = () => {
		// I dismiss the done animation
		setDoneAnimVisible(false);

		// I get data from the API result
		const { authToken, user, isNew } = apiResult.current;

		// First of all, I store the JWT token
		// TODO: Store 'authToken' Token

		// If the user is new, he goes to account type selection
		if (isNew) {
			Toast.show(
				`Account with phone number ${user.phone} successfully created.`,
				{ backgroundColor: colors.ok }
			);
			return navigation.navigate(screens.AccountTypeSelection);
		}

		// Otherwise, he goes to the profile configuration screen
		if (!user.profile)
			Toast.show("You need to configure your profile before moving on...", {
				backgroundColor: colors.warning,
			});
		else
			Toast.show(`Welcome back ${user.profile.firstName}!`, {
				backgroundColor: colors.ok,
			});

		navigation.navigate(screens.ProfileEdition, user.profile);
	};
	const handleRetry = () => {
		handlePrevious();
	};

	return (
		<Screen style={styles.screen}>
			{/* Upload screen */}
			<UploadScreen
				progress={1}
				visible={doneAnimVisible}
				onDone={handleSuccess}
			/>

			{/* --- Main Box --- */}
			<View style={[styles.mainContainer, { opacity: showLoader ? 0.25 : 1 }]}>
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
						onChangeText={(text) => setValidationCode(text)}
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
						<NettText style={styles.resendCodeLink} onPress={handleRetry}>
							Resend
						</NettText>
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
							onPress={handleSubmit}
						/>
					}
				/>
			) : (
				<View style={styles.bottomBar}>
					<NettButton text="Retry" onPress={handleRetry} />
				</View>
			)}

			{/* Loader */}
			<ActivityIndicator visible={showLoader} />
		</Screen>
	);
}

export default PhoneNumberConfirmationScreen;
