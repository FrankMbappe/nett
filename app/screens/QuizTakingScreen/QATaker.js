import { isEqual } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import NettButton from "../../components/Button";
import NettText from "../../components/Text";
import colors from "../../config/colors";
import { toggleAddRemove } from "../../utils";

function getQuestionFontSize({ length }) {
	if (length <= 50) return 18;
	if (length > 50 && length <= 75) return 16;
	return 14;
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
				<NettText style={styles.topic}>{topic}</NettText>
				<NettText
					style={[styles.question, { fontSize: getQuestionFontSize(question) }]}
				>
					{question}
				</NettText>
				<FlatList
					style={styles.answersFlatList}
					data={answers}
					keyExtractor={({ id }) => String(id)}
					renderItem={({ item: { id, value } }) => (
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
					)}
				/>
			</View>
			<View style={styles.bottomBar}>
				<NettButton text="Submit" onPress={() => onSubmit(session.current)} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	mainContainer: {
		flex: 1,
		backgroundColor: "salmon",
		alignItems: "center",
		padding: 5,
		justifyContent: "space-around",
	},
	bottomBar: {
		padding: 10,
		width: "100%",
		backgroundColor: colors.appBack,
	},
	topic: {
		padding: 5,
		fontSize: 12,
		fontWeight: "bold",
		color: colors.white,
		backgroundColor: colors.quiteTransparentLight,
		alignSelf: "center",
		borderRadius: 10,
	},
	question: {
		fontSize: 16,
		fontWeight: "bold",
		color: colors.white,
		marginTop: 10,
		textAlign: "center",
	},
	answersFlatList: {
		marginTop: 10,
	},
	answer: {
		paddingVertical: 15,
		paddingHorizontal: 12,
		backgroundColor: colors.quiteTransparentLight,
		marginBottom: 5,
		borderRadius: 10,
	},
	answerText: {
		fontSize: 13,
		flex: 1,
		fontWeight: "700",
	},
	selectedAnswer: {
		backgroundColor: colors.appBack,
	},
});

export default QATaker;
