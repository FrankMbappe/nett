import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Divider } from "react-native-elements";

import ButtonIcon from "../../components/ButtonIcon";
import NettButton from "../../components/Button";
import NettText from "../../components/Text";
import NettTextInput from "../../components/TextInput";
import Screen from "../../components/Screen";
import TopBar from "../../components/TopBar";

import { buttons } from "../../config/enums";
import { capitalize, find, findIndex } from "lodash";
import { formatTime, formatWordCount } from "../../utils";
import styles from "./styles";
import colors from "../../config/colors";
import TextIcon from "../../components/TextIcon";
import Label from "../../components/Label";
import AnswerModal from "./AnswerModal";
import { screens } from "../../navigation/routes";
import Toast from "react-native-root-toast";
import TimerModal from "./TimerModal";

function getQuestionFontSize({ length }) {
	if (length <= 50) return 30;
	if (length > 50 && length <= 75) return 26;
	return 20;
}

function QACreationScreen({
	navigation,
	maxTextLength = 255,
	maxAnswersCount = 5,
}) {
	// States
	const [timer, setTimer] = useState();
	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState([]);
	const [answerModalVisible, setAnswerModalVisible] = useState(false);
	const [timerModalVisible, setTimerModalVisible] = useState(false);

	// Refs & Memos
	const answerToEdit = useRef();
	const timerToEdit = useRef();
	const timerList = useMemo(() => [15, 30, 60, 90, 120, 150, 180], []);

	// Action handlers
	const handleSubmit = useCallback(() => {
		/* Answers are valid only if there are at least 2 existing,
		   at least one right, and at least one wrong.  */
		const answersAreValid =
			find(answers, (answer) => answer.isRight) &&
			find(answers, (answer) => !answer.isRight) &&
			answers.length >= 2;
		if (!answersAreValid)
			return Toast.show(
				"You must register at least 2 answers, with at least one correct" +
					", and one incorrect.",
				{ backgroundColor: colors.warning, duration: Toast.durations.LONG }
			);

		navigation.navigate(screens.QuizCreation, { question, answers, timer });
	});

	// Actions: Timer
	const handleAddTimer = () => {
		setTimerModalVisible(true);
	};
	const handleEditTimer = () => {
		timerToEdit.current = timer;
		setTimerModalVisible(true);
	};
	const handleRemoveTimer = () => {
		// I remove the timer
		setTimer(null);
	};
	const handleSubmitTimer = (seconds) => {
		// I dismiss the modal
		setTimerModalVisible(false);

		// Then, I set the current timer value
		setTimer(seconds);

		// Finally, the object to edit is cleaned up
		timerToEdit.current = null;

		Toast.show("A timer has been added to this QA");
	};
	const handleCloseTimerModal = () => {
		setTimerModalVisible(false);
	};

	// Actions: Answers
	const handleAddAnswer = () => {
		if (answers.length >= maxAnswersCount) return;
		setAnswerModalVisible(true);
	};
	const handleEditAnswer = (index) => {
		// I set the answer to be edited
		answerToEdit.current = answers[index];
		setAnswerModalVisible(true);
	};
	const handleRemoveAnswer = (index) => {
		// I remove the answer from the answers list
		setAnswers(answers.filter((_, answerIndex) => answerIndex !== index));
		Toast.show("Answer removed");
	};
	const handleSubmitAnswer = (text, isRight) => {
		// I dismiss the modal
		setAnswerModalVisible(false);

		// If answerToEdit isn't null, I update the value
		if (answerToEdit.current != null) {
			// I get the index of the answer
			const index = findIndex(answers, answerToEdit.current);

			// Then its value gets updated
			setAnswers((prevValue) =>
				prevValue.map((answer) =>
					answer.id === index
						? {
								...answer,
								value: text,
								isRight: isRight,
						  }
						: answer
				)
			);

			// Then I cleanup the object to edit
			answerToEdit.current = null;

			return Toast.show("Answer has been updated.");
		}

		// Otherwise it's a new answer, therefore I add it
		setAnswers((prevValue) =>
			prevValue.concat({
				id: prevValue.length,
				value: text,
				isRight: isRight,
			})
		);
		Toast.show("Your answer has been added.");
	};
	const handleCloseAnswerModal = () => {
		setAnswerModalVisible(false);
	};

	return (
		<Screen style={styles.screen}>
			{/* Header */}
			<TopBar style={styles.topBar}>
				<ButtonIcon name="arrow-left" size={25} />
				<NettText style={styles.topBarTitle}>{"New QA"}</NettText>
			</TopBar>

			{/* Main container */}
			<ScrollView style={styles.mainContainer}>
				{/* Timer setter */}
				{timer != null ? (
					<Pressable
						style={styles.allottedTimeContainer}
						onPress={handleEditTimer}
					>
						<TextIcon
							containerStyle={styles.allottedTimeTextContainer}
							style={styles.allottedTimeText}
							text={`🎯 Allotted time: ${formatTime(timer)}`}
							fontSize={14}
							numberOfLines={1}
						/>
						<ButtonIcon
							name="pencil"
							color={colors.optimal}
							onPress={handleEditTimer}
						/>
						<ButtonIcon
							name="delete"
							color={colors.danger}
							onPress={handleRemoveTimer}
						/>
					</Pressable>
				) : (
					<NettButton
						style={styles.addTimerButton}
						text="⌛ Add a timer"
						type={buttons.SECONDARY}
						fontSize={12}
						onPress={handleAddTimer}
					/>
				)}

				{/* Divider */}
				<Divider style={styles.divider} />

				{/* Question */}
				<>
					<Label style={styles.label} value="Question" />
					<View style={styles.questionContainer}>
						<NettTextInput
							autoFocus={false}
							containerStyle={styles.questionInput}
							fontSize={getQuestionFontSize(question)}
							multiline
							maxLength={maxTextLength}
							onChangeText={(text) => setQuestion(text)}
							placeholder="Start typing..."
							value={question}
						/>
					</View>

					<NettText style={styles.characterCount}>
						<NettText style={styles.characterCountLabel}>
							{"Remaining characters:  "}
						</NettText>
						<NettText
							style={styles.characterCountValue}
						>{`${question.length} / ${maxTextLength}`}</NettText>
					</NettText>
				</>

				<Divider style={styles.divider} />

				{/* Answers */}
				<>
					{/* Header */}
					<Label
						style={styles.label}
						value={capitalize(formatWordCount(answers.length, "answer"))}
					/>
					<NettText style={styles.labelDescription}>
						{"Right answers are shown in green, and wrong answers in red."}
					</NettText>

					{/* Answers list */}
					{answers.map(({ value, isRight }, index) => {
						const frontColor = isRight ? colors.ok : colors.danger;
						const backColor = isRight ? colors.okLight : colors.dangerLight;
						return (
							<View
								key={String(index)}
								style={[
									styles.answerContainer,
									{
										backgroundColor: backColor,
									},
								]}
							>
								<NettText style={[styles.answerText, { color: frontColor }]}>
									{value}
								</NettText>
								<ButtonIcon
									name="pencil"
									color={frontColor}
									onPress={() => handleEditAnswer(index)}
								/>
								<ButtonIcon
									name="delete"
									color={colors.danger}
									onPress={() => handleRemoveAnswer(index)}
								/>
							</View>
						);
					})}

					{answers.length > 0 && (
						<NettText style={styles.answerCountLabel}>
							{`You can add ${formatWordCount(
								maxAnswersCount - answers.length,
								"more answer"
							)}`}
						</NettText>
					)}

					{/* Add answer button */}
					<NettButton
						disabled={answers.length >= maxAnswersCount}
						fontSize={12}
						icon="plus"
						onPress={handleAddAnswer}
						style={styles.addAnswerButton}
						text="Add answer"
						type={buttons.SECONDARY}
					/>
				</>
			</ScrollView>

			{/* Submit button */}
			<View style={styles.bottomBar}>
				<NettButton
					disabled={question.length <= 0 || answers.length <= 1}
					onPress={handleSubmit}
					text="Submit"
					type={buttons.PRIMARY}
				/>
			</View>

			{/* Modal for adding a timer */}
			<TimerModal
				isVisible={timerModalVisible}
				onTapOutside={handleCloseTimerModal}
				onSubmit={handleSubmitTimer}
				timerValue={timerToEdit.current}
				timerList={timerList}
			/>

			{/* Modal for adding a new answer */}
			<AnswerModal
				isVisible={answerModalVisible}
				onTapOutside={handleCloseAnswerModal}
				onSubmit={handleSubmitAnswer}
				value={answerToEdit.current && answerToEdit.current.value}
				isRight={answerToEdit.current && answerToEdit.current.isRight}
			/>
		</Screen>
	);
}

export default QACreationScreen;
