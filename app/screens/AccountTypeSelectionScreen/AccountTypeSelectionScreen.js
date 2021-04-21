import React from "react";
import { View } from "react-native";

import Screen from "../../components/Screen";
import WelcomeTitle from "../../components/Welcome/Title";
import WelcomeBottomBar from "../../components/Welcome/BottomBar";
import OptionCardSelector from "../../components/Welcome/OptionCardSelector";

import styles from "./styles";
import enums from "../../config/enums";
import icons from "../../config/icons";

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
					Which kind of account would you like to create ?
				</WelcomeTitle>

				{/* Account type selection */}
				<OptionCardSelector
					style={styles.selector}
					options={[
						{
							icon: icons.TEACHER_ACCOUNT,
							name: "Teacher",
							description:
								"Create classrooms and lecture your courses to students.",
						},
						{
							icon: icons.STUDENT_ACCOUNT,
							name: "Student",
							description:
								"Join classrooms and attend courses made by your teachers.",
						},
						{
							icon: icons.CONSULT_ACCOUNT,
							name: "Consultant",
							description:
								"Share your knowledge with teachers and students via classrooms.",
						},
					]}
				/>
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
