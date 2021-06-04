import { isEqual } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import NettButton from "../../components/Button";
import NettText from "../../components/Text";
import { toggleAddRemove } from "../../utils";
import QAIndicator from "./QAIndicator";

function QATaker({
	qa: { id, topic, question, answers, rightAnswers, timer },
	remainingTime,
	onTimerValueChanges,
	onTimerEnd,
	onQASubmit,
}) {
	const [providedAnswers, setProvidedAnswers] = useState([]);
	const [timerLeft, setTimerLeft] = useState(timer);

	const session = useRef({
		// Generate ID for the new session and add it as an id. id: randomUUID();
		qaId: id,
		remainingTime: timer,
		isCorrect: false,
	});

	/* -- Whenever the timer value changes -- */
	useEffect(() => {
		const timer = setTimeout(() => {
			if (!timerLeft) {
				onTimerEnd(session.current);
				return;
			}
			session.current.remainingTime = timerLeft;
			onTimerValueChanges(session.current, timerLeft);
			setTimerLeft((prevTimerLeft) => prevTimerLeft - 1);
		}, 1000);
		return () => clearTimeout(timer);
	}, [timerLeft]);

	// useEffect(() => {
	// 	if (!remainingTime) onTimerEnd(session.current);
	// 	onTimerValueChanges(session.current);
	// 	session.current.remainingTime = remainingTime;
	// }, [remainingTime])

	/* -- Whenever another QA comes on -- */
	useEffect(() => {
		// I clear the provided answers array
		setProvidedAnswers([]);
		// I set the timer left to the QA timer's value
		setTimerLeft(timer);
		// I mutate the current session object accordingly
		session.current = {
			qaId: id,
			remainingTime: timerLeft,
			isCorrect: false,
		};
	}, [id]);

	/* -- Whenever the provided answers' array changes -- */
	useEffect(() => {
		session.current.isCorrect = isEqual(rightAnswers, providedAnswers);
	}, [providedAnswers]);

	return (
		<View style={styles.container}>
			<QAIndicator
				id={id}
				progress={timerLeft}
				max={timer}
				isCorrect={session.current.isCorrect}
			/>
			<NettText>{providedAnswers.length}</NettText>
			<NettText>{topic}</NettText>
			<NettText>{question}</NettText>

			{answers.map(({ id, value }) => (
				<NettText
					key={id}
					style={{ padding: 10 }}
					onPress={() =>
						setProvidedAnswers(toggleAddRemove(id, providedAnswers))
					}
				>
					{value}
				</NettText>
			))}

			<NettButton text="Submit" onPress={() => onQASubmit(session.current)} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default QATaker;
