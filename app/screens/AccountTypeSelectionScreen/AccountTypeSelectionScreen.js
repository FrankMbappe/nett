import React, { useState } from "react";
import { View } from "react-native";

import Screen from "../../components/Screen";
import StartTitle from "../../components/start/Title";
import StartBottomBar from "../../components/start/BottomBar";
import ListItemSelector from "../../components/start/ListItemSelector";

import styles from "./styles";
import { buttons } from "../../config/enums";
import images from "../../config/images";
import NettButton from "../../components/Button";

// --- CONSTANTS --- //
const options = [
	{
		key: "teacher",
		image: images.TEACHER_ACCOUNT,
		name: "Teacher",
		description: "Create classrooms and lecture your courses to students.",
	},
	{
		key: "student",
		image: images.STUDENT_ACCOUNT,
		name: "Student",
		description: "Join classrooms and attend courses made by your teachers.",
	},
	{
		key: "consultant",
		image: images.CONSULT_ACCOUNT,
		name: "Consultant",
		description: "Share your knowledge with the world via classrooms.",
	},
];

// --- HANDLERS --- //
const handleQuit = () => console.log("Quit");
const handleNext = () => console.log("Next");

// --- SCREEN --- //
function LoginWithPhoneScreen(props) {
	const [selectedType, setSelectedType] = useState();

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
					onSelectOption={(option) => setSelectedType(option)}
					options={options}
					selectedOption={selectedType}
					selectedStyle={{
						backgroundColor: "#ffeae8",
						borderColor: "#f5c8c4",
					}}
					style={styles.typeSelector}
				/>
			</View>

			{/* --- Bottom bar --- */}
			<View style={styles.bottomBar}>
				<NettButton
					disabled={!selectedType}
					onPress={handleNext}
					text="Next"
					type={buttons.PRIMARY}
				/>
			</View>
		</Screen>
	);
}

export default LoginWithPhoneScreen;
