import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "../../components/Icon";
import NettText from "../../components/Text";
import colors from "../../config/colors";

/* 
    let indicators = (isDeterministic = false) = [
        { id: 1, progress: 59, deterministic: isDeterministic, correct: false },
        { id: 2, progress: 0, deterministic: isDeterministic, correct: null } 
    ]

    PROGRESS
    ---
    0 = Not yet started
    100 = Ended
    0 < value < 100 = Started 
*/

function getState(progress, max) {
	if (progress <= 0) return "standby";
	if (progress > 0 && progress < max) return "active";
	else return "ended";
}

function getResultIcon(isCorrect) {
	if (isCorrect) return <Icon name="check" iconColor={colors.ok} size={45} />;
	else return <Icon name="close" iconColor={colors.danger} size={45} />;
}

function QAIndicator({
	id,
	max = -1,
	progress = -1,
	isCorrect = false,
	isDeterministic = false,
}) {
	const [state, setState] = useState(getState(progress, max));

	useEffect(() => {
		setState(getState(progress, max));
	}, [progress]);

	return (
		<View style={styles(state).container}>
			{state === "active" ? (
				<NettText style={styles(state).text}>{progress}</NettText>
			) : isDeterministic ? (
				getResultIcon(isCorrect)
			) : (
				<NettText style={styles(state).text}>{id}</NettText>
			)}
		</View>
	);
}

const styles = (state) =>
	StyleSheet.create({
		container: {
			height: 50,
			width: 50,
			borderRadius: 25,
			backgroundColor: state !== "active" ? colors.appBack : colors.okLight,
			borderWidth: 2,
			borderColor: colors.medium,
			justifyContent: "center",
			alignItems: "center",
			opacity: state !== "ended" ? 1 : 0.25,
		},
		text: {
			fontSize: 18,
			fontWeight: "bold",
		},
	});

export default QAIndicator;
