import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import classroomsApi from "../../api/classrooms";

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
import QuizInfoModal from "./QuizInfoModal";
import Toast from "react-native-root-toast";
import colors from "../../config/colors";
import { isAfter } from "date-fns";
import UploadScreen from "../UploadScreen/UploadScreen";

function QuizCreationScreen({ navigation, route }) {
	// Params
	const { classroomId } = route.params;

	// States
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [qaList, setQaList] = useState([]);
	const [infoModalIsVisible, setInfoModalIsVisible] = useState(false);
	const [uploadIsVisible, setUploadIsVisible] = useState(false);
	const [progress, setProgress] = useState(0);

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
	const handleSubmit = () => {
		// Input validation
		if (title.length <= 1 || qaList.length <= 1)
			return Toast.show("A quiz must have a title, and have at least 2 QAs", {
				backgroundColor: colors.warning,
			});

		// I show additional info modal
		setInfoModalIsVisible(true);
	};
	const handleAddQA = () => {
		navigation.navigate(screens.QACreation);
	};
	const handleCloseInfoModal = () => {
		setInfoModalIsVisible(false);
	};
	const handleSubmitInfoModal = ({
		isDeterministic,
		hasTimeInterval,
		dateOpening,
		dateClosing,
	}) => {
		// Input validation
		if (hasTimeInterval && isAfter(dateOpening, dateClosing))
			return Toast.show("The opening date cannot be after the closing date", {
				backgroundColor: colors.warning,
			});

		// I define the shape of the quiz
		const quiz = {
			classroomId,
			title,
			description: description.length > 0 ? description : undefined,
			qas: qaList,
			hasTimeInterval,
			dateOpening: hasTimeInterval ? dateOpening : undefined,
			dateClosing: hasTimeInterval ? dateClosing : undefined,
			isDeterministic,
		};

		// Then I call the API
		uploadQuiz(quiz);
	};
	const uploadQuiz = async (quiz) => {
		// Starting uploading
		setProgress(0);
		setUploadIsVisible(true);
		const result = await classroomsApi.addQuiz(quiz, (progress) =>
			setProgress(progress)
		);

		// Result handler
		if (!result || !result.ok) {
			setUploadIsVisible(false);
			return Toast.show(
				"Something went wrong while adding your quiz, please try again",
				{ backgroundColor: colors.danger }
			);
		}
	};
	const handleDone = () => {
		setUploadIsVisible(false);
		Toast.show("Refresh the page to see your new post!", {
			backgroundColor: colors.ok,
		});
		navigation.goBack();
	};

	return (
		<Screen style={styles.screen}>
			{/* Upload screen */}
			<UploadScreen
				progress={progress}
				visible={uploadIsVisible}
				onDone={handleDone}
			/>

			{/* Header */}
			<TopBar style={styles.topBar}>
				<ButtonIcon name="arrow-left" size={25} />
				<NettText style={styles.topBarTitle}>{"New Quiz"}</NettText>
			</TopBar>

			{/* Main container */}
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

			{/* Add QA button */}
			<FloatingButton
				icon="plus"
				style={styles.addQAButton}
				onPress={handleAddQA}
			/>

			{/* Footer */}
			<View style={styles.bottomBar}>
				<NettButton
					disabled={qaList.length <= 0}
					onPress={handleSubmit}
					text="Publish"
					type={buttons.PRIMARY}
				/>
			</View>

			{/* Additional infos modal */}
			<QuizInfoModal
				isVisible={infoModalIsVisible}
				onTapOutside={handleCloseInfoModal}
				onSubmit={handleSubmitInfoModal}
			/>
		</Screen>
	);
}

export default QuizCreationScreen;
