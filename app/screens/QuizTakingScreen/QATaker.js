import { isEqual } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import NettButton from "../../components/Button";
import NettText from "../../components/Text";
import { toggleAddRemove } from "../../utils";

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

			<NettButton text="Submit" onPress={() => onSubmit(session.current)} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default QATaker;
