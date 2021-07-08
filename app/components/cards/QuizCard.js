import React from "react";
import { View, StyleSheet } from "react-native";
import { formatWordCount } from "../../utils";

import NettText from "../Text";
import TextIcon from "../TextIcon";
import colors from "../../config/colors";

function QACard({
	// Data
	qa: { id, topic, question, answers, rightAnswers, timer },

	// UI
	onPress,
}) {
	return (
		<View style={styles.container} onPress={onPress}>
			<View style={styles.header}>
				<NettText style={styles.id}>{`#${id}`}</NettText>
				<NettText style={styles.topic} numberOfLines={1}>
					{topic}
				</NettText>
			</View>
			<NettText style={styles.question}>{question}</NettText>
			<View style={styles.footer}>
				<TextIcon
					color={colors.optimal}
					style={[styles.colorfulText, styles.answersCount]}
					text={formatWordCount(answers.length, "answer")}
				/>
				<TextIcon
					icon="check"
					color={colors.ok}
					style={styles.colorfulText}
					spacing={0}
					containerStyle={styles.rightAnswersCountContainer}
					text={rightAnswers.length}
				/>
				<View style={{ flex: 1 }} />
				<TextIcon
					icon="timer-outline"
					color={colors.warning}
					style={styles.colorfulText}
					spacing={0}
					containerStyle={styles.timerContainer}
					text={timer ? `${timer}s` : "No timer"}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.appBack,
		margin: 5,
		padding: 10,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7,
	},
	header: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	id: {
		fontSize: 12,
		fontWeight: "bold",
		flex: 1,
	},
	topic: {
		color: colors.medium,
	},
	question: {
		fontSize: 20,
		fontWeight: "bold",
		padding: 5,
	},
	footer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	colorfulText: {
		paddingVertical: 5,
		paddingHorizontal: 8,
		fontWeight: "bold",
		fontSize: 15,
		borderRadius: 5,
	},
	answersCount: {
		backgroundColor: colors.optimalLight,
	},
	rightAnswersCountContainer: {
		backgroundColor: colors.okLight,
		borderRadius: 5,
		marginStart: 5,
	},
	timerContainer: {
		backgroundColor: colors.warningLight,
		borderRadius: 5,
		paddingHorizontal: 5,
	},
});

export default QACard;
