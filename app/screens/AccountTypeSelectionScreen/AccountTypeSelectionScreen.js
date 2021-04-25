import React from "react";
import { View } from "react-native";

import Screen from "../../components/Screen";
import WelcomeTitle from "../../components/welcome/Title";
import WelcomeBottomBar from "../../components/welcome/BottomBar";
import ListItemSelector from "../../components/welcome/ListItemSelector";

import styles from "./styles";
import enums from "../../config/enums";
import images from "../../config/images";

// --- HANDLERS --- //
const handleQuit = () => console.log("Quit");
const handleNext = () => console.log("Next");

// --- SCREEN --- //
function LoginWithPhoneScreen(props) {
	return (
		<Screen style={styles.screen}>
			{/* --- Main Box --- */}
			<View style={styles.mainContainer}>
				{/* Title */}
				<WelcomeTitle style={styles.titleContainer}>
					Which kind of account would you like to create ?
				</WelcomeTitle>

				{/* Account type selection */}
				<ListItemSelector
					style={styles.typeSelector}
					options={[
						{
							image: images.TEACHER_ACCOUNT,
							name: "Teacher",
							description:
								"Create classrooms and lecture your courses to students.",
						},
						{
							image: images.STUDENT_ACCOUNT,
							name: "Student",
							description:
								"Join classrooms and attend courses made by your teachers.",
						},
						{
							image: images.CONSULT_ACCOUNT,
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
