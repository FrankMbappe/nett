import React, { useCallback, useState } from "react";
import { View, ScrollView } from "react-native";
import { Divider } from "react-native-elements";

import ButtonIcon from "../../components/ButtonIcon";
import NettButton from "../../components/Button";
import NettText from "../../components/Text";
import NettTextInput from "../../components/TextInput";
import Screen from "../../components/Screen";
import TopBar from "../../components/TopBar";

import { buttons } from "../../config/enums";
import { capitalize } from "lodash";
import { formatTime, formatWordCount } from "../../utils";
import styles from "./styles";
import colors from "../../config/colors";
import TextIcon from "../../components/TextIcon";
import Label from "../../components/Label";

function getQuestionFontSize({ length }) {
	if (length <= 50) return 30;
	if (length > 50 && length <= 75) return 26;
	return 20;
}

function QACreationScreen({ maxTextLength = 255, maxAnswersCount = 5 }) {
	const [timer, setTimer] = useState(60);
	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState([
		{
			id: "1",
			value:
				"All I have to do is dream a chouchou oh a chouchou owoh tonepewa wa ndé fatigué wa ndé fille de joie",
			isRight: true,
		},
		{
			id: "2",
			value: "Call me when you want, call me when you need",
			isRight: true,
		},
		{ id: "3", value: "Yeah, call me when you want", isRight: false },
		{ id: "4", value: "Call me when you want", isRight: false },
		{ id: "5", value: "Call me when you want", isRight: false },
	]);

	const onPublish = useCallback(() => console.log("Publish")); // TODO

	return (
		<Screen style={styles.screen}>
			<TopBar style={styles.topBar}>
				<ButtonIcon name="arrow-left" size={25} />
				<NettText style={styles.topBarTitle}>{"New QA"}</NettText>
			</TopBar>

			<ScrollView style={styles.mainContainer}>
				{timer != null ? (
					<View style={styles.allottedTimeContainer}>
						<TextIcon
							containerStyle={styles.allottedTimeTextContainer}
							style={styles.allottedTimeText}
							icon="clock-outline"
							text={`Allotted time: ${formatTime(timer)}`}
							fontSize={14}
							numberOfLines={1}
						/>
						<ButtonIcon name="pencil" color={colors.medium} />
						<ButtonIcon
							name="delete"
							color={colors.danger}
							onPress={() => setTimer(null)}
						/>
					</View>
				) : (
					<NettButton
						style={styles.addTimerButton}
						icon="clock-outline"
						text="Add a timer"
						type={buttons.SECONDARY}
						fontSize={12}
					/>
				)}

				<Divider style={styles.divider} />

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

				<>
					<Label
						style={styles.label}
						value={capitalize(formatWordCount(answers.length, "answer"))}
					/>

					<NettText style={styles.labelDescription}>
						{"Right answers are shown in green, and wrong answers in red."}
					</NettText>

					{answers.map(({ id, value, isRight }) => {
						const frontColor = isRight ? colors.ok : colors.danger;
						const backColor = isRight ? colors.okLight : colors.dangerLight;
						return (
							<View
								key={String(id)}
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
								<ButtonIcon name="pencil" color={frontColor} />
								<ButtonIcon
									name="delete"
									color={colors.danger}
									onPress={() => setAnswers(answers.filter((x) => x.id !== id))}
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

					<NettButton
						disabled={answers.length >= maxAnswersCount}
						fontSize={12}
						icon="plus"
						onPress={() => console.log("TODO")}
						style={styles.addAnswerButton}
						text="Add answer"
						type={buttons.SECONDARY}
					/>
				</>
			</ScrollView>

			<View style={styles.bottomBar}>
				<NettButton
					disabled={question.length <= 0 || answers.length <= 1}
					onPress={onPublish}
					text="SAVE"
					type={buttons.PRIMARY}
				/>
			</View>
		</Screen>
	);
}

export default QACreationScreen;