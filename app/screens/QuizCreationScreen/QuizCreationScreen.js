import React, { useEffect, useState } from "react";
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
import NettTextInput from "../../components/TextInput";
import { QACard } from "../../components/cards";
import { capitalize, formatWordCount } from "../../utils";
import FloatingButton from "../../components/FloatingButton";
import { screens } from "../../navigation/routes";

function QuizCreationScreen({ navigation, route }) {
	// Params

	// States
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [qaList, setQaList] = useState([]);

	// Effects
	useEffect(() => {
		// The QA passed back from QACreationScreen is handled here
		if (route.params && route.params.qa) {
			// I define the shape of the QA
			const { question, answers, timer, topic } = route.params.qa;
			const qaToAdd = {
				position: qaList.length + 1,
				question,
				answers: answers.map(({ id, value }) => ({ id, value })),
				rightAnswers: answers
					.filter((answer) => answer.isRight)
					.map((answer) => answer.id),
				timer,
				topic,
			};

			// Then I add it to the qaList
			setQaList((prevValue) => prevValue.concat(qaToAdd));

			/* Ultimately, I remove it from the params so that
			   it cannot be added anymore. */
			route.params.qa = null;
		}
	}, [route.params]);

	// Action handlers
	const handlePublish = async () => {};
	const handleAddQA = () => {
		navigation.navigate(screens.QACreation);
	};

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
					{qaList != null && qaList.length <= 0 && (
						<NettText style={styles.qaTip}>
							{"🧩  Tap the '+' floating button to add a new QA."}
						</NettText>
					)}
					<View style={styles.qaListContainer}>
						{qaList.map((qa, index) => (
							<QACard key={String(index)} qa={qa} />
						))}
					</View>
				</>
			</ScrollView>

			<FloatingButton
				icon="plus"
				style={styles.addQAButton}
				onPress={handleAddQA}
			/>

			<View style={styles.bottomBar}>
				<NettButton
					disabled={qaList.length <= 0}
					onPress={handlePublish}
					text="Publish"
					type={buttons.PRIMARY}
				/>
			</View>
		</Screen>
	);
}

export default QuizCreationScreen;
