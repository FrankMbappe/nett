import React, { useState, useEffect } from "react";
import { Image, View } from "react-native";

import Screen from "../../components/Screen";
import NettText from "../../components/Text";

import styles from "./styles";
import QATaker from "./QATaker";
import { getNextItemIndex } from "../../utils";
import QAIndicator from "./QAIndicator";

function QuizTakingScreen({
	author: {
		profile: { fullName, picUri },
	},
	classroomName,
	title,
	qas = [],
}) {
	const [sessionList, setSessionList] = useState([]);
	const [currentQAIndex, setCurrentQAIndex] = useState(0);
	const [currentQATimer, setCurrentQATimer] = useState(qas[0].timer);

	const onQAEnd = (session) => {
		console.log(JSON.stringify(session));
		// I add the session to the quiz session list
		setSessionList(sessionList.concat(session));
		// I set the current QA to the next QA
		setCurrentQAIndex(getNextItemIndex(currentQAIndex, qas));
	};

	useEffect(() => {
		if (currentQAIndex === null) {
			// displayQuizEnded()
			alert("Quiz ended!");
		}
	}, [currentQAIndex]);

	return (
		<Screen>
			<View style={styles.header}>
				<View style={styles.authorAndClassroomContainer}>
					<Image style={styles.picAuthor} source={{ uri: picUri }} />
					<NettText style={styles.authorAndClassroom} numberOfLines={2}>
						{`${fullName} in ${classroomName}`}
					</NettText>
				</View>
				<NettText style={styles.title}>{title}</NettText>
			</View>
			{currentQAIndex != null && (
				<>
					<QAIndicator
						id={qas[currentQAIndex].id}
						progress={currentQATimer}
						max={qas[currentQAIndex].timer}
						isCorrect={false}
					/>
					<QATaker
						qa={qas[currentQAIndex]}
						onTimerValueChanges={(_, value) => {
							setCurrentQATimer(value);
						}}
						onTimerEnd={(session) => {
							alert("Time over!");
							onQAEnd(session);
						}}
						onQASubmit={(session) => onQAEnd(session)}
					/>
				</>
			)}
		</Screen>
	);
}

export default QuizTakingScreen;
