import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "../../components/Icon";
import NettText from "../../components/Text";
import colors from "../../config/colors";
import { timerStatus as t } from "../../config/enums";

/* 
    let indicators = (isDeterministic = false) = [
        { id: 1, progress: 59, deterministic: isDeterministic, correct: false },
        { id: 2, progress: 0, deterministic: isDeterministic, correct: null } 
    ]

    PROGRESS
    ---
    100 = Not yet started
    0 = Ended (No time left)
    0 < value < 100 = Started 
*/

function getState(progress, max) {
	if (progress === null) return t.noTimer;
	if (progress === max) return t.standBy;
	if (progress > 0 && progress < max) return t.active;
	return t.ended;
}

function getBackColor(progress) {
	if (progress <= 5) return colors.danger;
	if (progress <= 15) return colors.warning;
	return colors.ok;
}

function getResultIcon(isCorrect) {
	if (isCorrect)
		return (
			<Icon
				name="check"
				iconColor={colors.ok}
				size={45}
				backgroundColor={colors.appBack}
			/>
		);
	else
		return (
			<Icon
				name="close"
				iconColor={colors.danger}
				size={45}
				backgroundColor={colors.appBack}
			/>
		);
}

function QAIndicator({
	id,
	max,
	progress = -1,
	isCorrect = false,
	isDeterministic = false,
}) {
	const [state, setState] = useState(getState(progress, max));

	useEffect(() => {
		setState(getState(progress, max));
	}, [progress]);

	return (
		<View
			style={[
				styles(state).container,
				{
					backgroundColor:
						state === t.active ? getBackColor(progress) : colors.appBack,
				},
			]}
		>
			{state === t.active ? (
				<NettText style={styles(state).text}>{progress}</NettText>
			) : state === t.ended && isDeterministic ? (
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
			backgroundColor: state !== t.active ? colors.appBack : colors.ok,
			borderWidth: 2,
			borderColor: colors.light,
			justifyContent: "center",
			alignItems: "center",
			opacity: state !== t.ended ? 1 : 0.25,
		},
		text: {
			fontSize: 18,
			fontWeight: "bold",
			color: state != t.active ? colors.appFront : colors.white,
		},
	});

export default QAIndicator;
