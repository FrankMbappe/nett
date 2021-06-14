import React, { useCallback, useState } from "react";
import { View, ScrollView } from "react-native";
import { Divider } from "react-native-elements";

import ButtonIcon from "../../components/ButtonIcon";
import NettButton from "../../components/Button";
import NettText from "../../components/Text";
import Screen from "../../components/Screen";
import TopBar from "../../components/TopBar";
import Label from "../../components/Label";

import { buttons } from "../../config/enums";
import styles from "./styles";
import colors from "../../config/colors";
import NettTextInput from "../../components/TextInput";
import { quizzes } from "../../config/dummyData";
import { QACard } from "../../components/cards";
import { capitalize, formatWordCount } from "../../utils";
import FloatingButton from "../../components/FloatingButton";

function QuizCreationScreen({}) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [qaList, setqaList] = useState([]);

	const onPublish = useCallback(() => console.log("Publish")); // TODO
	const onSave = useCallback(() => console.log("Save")); // TODO

	return (
		<Screen style={styles.screen}>
			<TopBar style={styles.topBar}>
				<ButtonIcon name="arrow-left" size={25} />
				<NettText style={styles.topBarTitle}>{"New Quiz"}</NettText>
			</TopBar>

			<ScrollView style={styles.mainContainer}>
				<>
					<Label value="Title" />
					<NettTextInput
						containerStyle={styles.titleInput}
						placeholder="How do you want to name it?"
						onChangeText={(text) => setTitle(text)}
						value={title}
					/>
				</>

				<>
					<Label value="Description" />
					<NettTextInput
						containerStyle={styles.descriptionInput}
						placeholder="What is your quiz about?"
						onChangeText={(text) => setDescription(text)}
						value={description}
						multiline
					/>
				</>

				<Divider style={styles.divider} />

				<>
					<Label
						value={`${capitalize(formatWordCount(qaList.length, "QA"))} added`}
					/>
					{qaList.length <= 0 && (
						<NettText style={styles.qaTip}>
							{"Tap the '+' floating button to add a new QA."}
						</NettText>
					)}
					<View style={styles.qaListContainer}>
						{qaList.map((qa, index) => (
							<QACard key={String(index)} qa={qa} />
						))}
					</View>
				</>
			</ScrollView>

			<FloatingButton icon="plus" style={styles.addQAButton} />

			<View style={styles.bottomBar}>
				<NettButton
					disabled={title.length <= 0}
					onPress={onSave}
					text="SAVE"
					type={buttons.SECONDARY}
				/>
				<NettButton
					disabled={qaList.length <= 0}
					onPress={onPublish}
					text="PUBLISH"
					type={buttons.PRIMARY}
				/>
			</View>
		</Screen>
	);
}

export default QuizCreationScreen;
