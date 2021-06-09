import { isEqual } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
} from "react-native";
import NettButton from "../../components/Button";
import NettText from "../../components/Text";
import colors from "../../config/colors";
import images from "../../config/images";
import { toggleAddRemove } from "../../utils";

function getQuestionFontSize({ length }) {
	if (length <= 50) return 30;
	if (length > 50 && length <= 75) return 26;
	return 20;
}

function QATaker({
	qa: { id, topic, question, answers, rightAnswers, timer },
	remainingTime,
	onTimerEnd,
	onSubmit,
}) {
	const [providedAnswers, setProvidedAnswers] = useState([]);

	const session = useRef({
		// TODO: Generate ID for the new session and add it as an id. id: randomUUID();
		qaId: id,
		remainingTime: timer,
		isCorrect: false,
	});

	useEffect(() => {
		if (remainingTime <= 0) onTimerEnd(session.current);
		session.current.remainingTime = remainingTime;
	}, [remainingTime]);

	useEffect(() => {
		/* -- Whenever a new QA comes on -- */
		// I clear the provided answers array
		setProvidedAnswers([]);
		// I mutate the current session object accordingly
		session.current = {
			qaId: id,
			remainingTime: remainingTime,
			isCorrect: false,
		};
	}, [id]);

	/* -- Whenever the provided answers' array changes -- */
	useEffect(() => {
		session.current.isCorrect = isEqual(rightAnswers, providedAnswers);
	}, [providedAnswers]);

	return (
		<View style={styles.container}>
			<View style={styles.mainContainer}>
				<Image
					style={styles.mainImageBackground}
					source={{
						uri: "https://www.freevector.com/uploads/vector/preview/30374/Colorful-Plait-Background.jpg",
					}}
				/>
				<ScrollView
					contentContainerStyle={styles.mainSubContentContainer}
					style={styles.mainSubContainer}
				>
					<NettText style={styles.topic}>{topic}</NettText>
					<View style={styles.questionContainer}>
						<NettText
							style={[
								styles.question,
								{ fontSize: getQuestionFontSize(question) },
							]}
						>
							{question}
						</NettText>
					</View>
					<NettText style={styles.answersLength}>
						{answers.length + " available answers"}
					</NettText>
					{answers.map(({ id, value }) => (
						<TouchableOpacity
							key={id}
							style={[
								styles.answer,
								providedAnswers.includes(id) && styles.selectedAnswer,
							]}
							onPress={() => {
								setProvidedAnswers(
									toggleAddRemove(id, providedAnswers, rightAnswers.length)
								);
							}}
						>
							<NettText style={styles.answerText}>{value}</NettText>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
			<View style={styles.bottomBar}>
				<NettButton
					disabled={providedAnswers.length <= 0}
					text="Submit"
					onPress={() => onSubmit(session.current)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	mainContainer: {
		flex: 1,
	},
	mainImageBackground: {
		position: "absolute",
		height: "100%",
		width: "100%",
	},
	mainSubContainer: {
		flex: 1,
		backgroundColor: colors.barelyTransparentDark,
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	mainSubContentContainer: {
		alignItems: "center",
		paddingBottom: 25,
	},
	topic: {
		alignSelf: "center",
		backgroundColor: colors.quiteTransparentLight,
		borderRadius: 10,
		color: colors.white,
		fontSize: 12,
		fontWeight: "bold",
		margin: 10,
		paddingHorizontal: 15,
		paddingVertical: 5,
	},
	questionContainer: {
		height: 150,
		justifyContent: "center",
	},
	question: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.white,
		textAlign: "center",
	},
	answersLength: {
		marginTop: 5,
		marginBottom: 10,
		color: colors.white,
		opacity: 0.75,
	},
	answer: {
		backgroundColor: colors.barelyTransparentLight,
		borderRadius: 10,
		marginBottom: 5,
		paddingHorizontal: 12,
		paddingVertical: 15,
		width: "100%",
	},
	answerText: {
		fontSize: 16,
		fontWeight: "700",
	},
	selectedAnswer: {
		backgroundColor: colors.appBack,
	},
	bottomBar: {
		paddingTop: 10,
		paddingHorizontal: 10,
		width: "100%",
		backgroundColor: colors.appBack,
	},
});

export default QATaker;
