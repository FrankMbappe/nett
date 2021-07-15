import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Divider } from "react-native-elements";
import authApi from "../../api/auth";
import Toast from "react-native-root-toast";
import authStorage from "../../auth/storage";

import NettButton from "../../components/Button";
import NettText from "../../components/Text";
import NettTextInput from "../../components/TextInput";
import Screen from "../../components/Screen";
import StartTitle from "../../components/start/Title";
import StartBottomBar from "../../components/start/BottomBar";

import styles from "./styles";
import { buttons } from "../../config/enums";
import { screens } from "../../navigation/routes";
import UploadScreen from "../UploadScreen/UploadScreen";
import ActivityIndicator from "../../components/ActivityIndicator";
import colors from "../../config/colors";
import jwtDecode from "jwt-decode";
import useAuth from "../../hooks/useAuth";

function PhoneNumberConfirmationScreen({ route, navigation }) {
	// Context
	const authContext = useAuth();

	// Params
	const { phone } = route.params;
	const timerValue = 600; // In seconds, 10 minutes

	// States
	const [validationCode, setValidationCode] = useState("");
	const [doneAnimVisible, setDoneAnimVisible] = useState(false);
	const [showLoader, setShowLoader] = useState(false);
	const apiResultData = useRef();

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
		if (!result || !result.ok) {
			setShowLoader(false);
			apiResultData.current = null;

			// If the result is not Ok, that means the code is incorrect
			if (!result.ok)
				return Toast.show("Incorrect validation code, please retry", {
					duration: Toast.durations.LONG,
					backgroundColor: colors.danger,
				});

			// Else, an error occured while interacting with the server
			return Toast.show(
				"Please retry, something went wrong while verifying your phone number.",
				{ duration: Toast.durations.LONG, backgroundColor: colors.danger }
			);
		}

		// Success
		apiResultData.current = result.data;
		setShowLoader(false); // I dismiss the loader
		setDoneAnimVisible(true); // Then I show the done animation, which will trigger 'handleDone'
	};
	const handleSuccess = () => {
		// I dismiss the done animation
		setDoneAnimVisible(false);

		// I get data from the API result
		const { authToken, isNew, userProfileExists } = apiResultData.current;

		/* First of all, I store the JWT token
		   and decode the user object encoded in it */
		authStorage.storeToken(authToken);
		const decodedUser = jwtDecode(authToken);

		// Then I set the current user to decoded user
		authContext.setCurrentUser(decodedUser);

		// If the user is new, he goes to account type selection
		if (isNew) {
			Toast.show(
				`Account with phone number ${decodedUser.phone} successfully created.`,
				{ backgroundColor: colors.ok }
			);
			return navigation.navigate(screens.AccountTypeSelection);
		}

		// Otherwise, he goes to the profile configuration screen
		if (!userProfileExists) {
			Toast.show("You need to configure your profile before moving on...", {
				backgroundColor: colors.warning,
			});
			navigation.navigate(screens.ProfileEdition);
		} else {
			Toast.show(`Welcome back ${decodedUser.profile.firstName}!`, {
				backgroundColor: colors.ok,
			});
			navigation.navigate(screens.ProfileEdition, {
				profile: decodedUser.profile,
			});
		}
	};
	const handleRetry = () => {
		handlePrevious();
	};

	return (
		<>
			{/* Loader */}
			<ActivityIndicator visible={showLoader} />

			<Screen style={styles.screen}>
				{/* Upload screen */}
				<UploadScreen
					progress={1}
					visible={doneAnimVisible}
					onDone={handleSuccess}
				/>

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
			</Screen>
		</>
	);
}

export default PhoneNumberConfirmationScreen;
