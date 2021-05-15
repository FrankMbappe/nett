import React from "react";
import { View } from "react-native";

import Screen from "../../components/Screen";
import StartTitle from "../../components/start/Title";
import StartBottomBar from "../../components/start/BottomBar";
import ListItemSelector from "../../components/start/ListItemSelector";

import styles from "./styles";
import { buttons } from "../../config/enums";
import images from "../../config/images";
import NettButton from "../../components/Button";

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
				<StartTitle style={styles.titleContainer}>
					Which kind of account would you like to create ?
				</StartTitle>

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
								"Share your knowledge with the world via classrooms.",
						},
					]}
				/>
			</View>

			{/* --- Bottom bar --- */}
			<StartBottomBar
				style={styles.bottomBar}
				buttonStart={
					<NettButton
						text="Quit"
						type={buttons.SECONDARY}
						onPress={handleQuit}
					/>
				}
				buttonEnd={
					<NettButton text="Next" type={buttons.PRIMARY} onPress={handleNext} />
				}
			/>
		</Screen>
	);
}

export default LoginWithPhoneScreen;
