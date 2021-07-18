import React, { useState, useEffect, useCallback, useRef } from "react";
import { Alert, Image, View } from "react-native";
import Screen from "../../components/Screen";
import NettText from "../../components/Text";
import styles from "./styles";
import QATaker from "./QATaker";
import { getNextItemIndex } from "../../utils";
import QAIndicator from "./QAIndicator";
import { isNull } from "lodash";
import { ScrollView } from "react-native";
import useAuth from "../../hooks/useAuth";

function QuizTakingScreen({ navigation, route }) {
	// Params
	const {
		classroomName,
		quiz: { title, isDeterministic, qas },
	} = route.params;
	const {
		profile: { fullName, picUri },
	} = useAuth().currentUser;

	// States
	const [sessionList, setSessionList] = useState([]);
	const [currentQAIndex, setCurrentQAIndex] = useState(0);
	const [currentQATimer, setCurrentQATimer] = useState(qas[0].timer);
	const indicatorScrollView = useRef();

	const onSessionEnd = useCallback(
		(session) => {
			console.log(JSON.stringify(session));
			// I add the session to the quiz session list
			setSessionList(sessionList.concat(session));
			// I set the current QA to the next QA
			setCurrentQAIndex(getNextItemIndex(currentQAIndex, qas));
		},
		[sessionList, currentQAIndex]
	);

	useEffect(() => {
		if (currentQAIndex !== null) {
			// It means this was triggered by onSessionEnd()
			// I set the current timer to the next QA's timer
			setCurrentQATimer(qas[currentQAIndex].timer);
			indicatorScrollView.current.scrollTo({
				x: 60 * currentQAIndex, // 60 => 50 (Indicator's width) + 10 (marginEnd)
				animated: true,
			});
		} else {
			// No more available QAs, quiz ends
			// displayQuizEnded()
			Alert.alert(
				"🎉🎊  Congratulations",
				"Congratulations, you finished this quiz, now tap the" +
					" 'Ok' button to get back to the previous screen",
				[{ text: "Ok", onPress: () => navigation.goBack() }]
			);
		}
	}, [currentQAIndex]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!currentQATimer || isNull(currentQAIndex)) return;
			setCurrentQATimer(currentQATimer - 1);
		}, 1000);
		return () => clearTimeout(timer);
	}, [currentQATimer]);

	return (
		<Screen style={styles.screen}>
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
					<View>
						<ScrollView horizontal ref={indicatorScrollView}>
							<View style={styles.indicatorsBar}>
								{qas.map(({ position, timer }, index) => {
									const hasBeenDone = index < sessionList.length;
									const isBeingDone = index === currentQAIndex;
									const hasNotBeenDoneYet = !hasBeenDone && !isBeingDone;

									return (
										<QAIndicator
											key={String(index)}
											id={position}
											progress={
												isBeingDone
													? currentQATimer
													: hasNotBeenDoneYet
													? timer
													: 0
											}
											max={timer}
											isCorrect={
												hasBeenDone ? sessionList[index].isCorrect : false
											}
											isDeterministic={isDeterministic}
											style={styles.indicator}
										/>
									);
								})}
							</View>
						</ScrollView>
					</View>

					<QATaker
						qa={qas[currentQAIndex]}
						remainingTime={currentQATimer}
						onTimerEnd={(session) => {
							Alert.alert(
								"⏰ Time over",
								"The time is over! Hurry up, a quiz never pauses!",
								[{ text: "Continue" }]
							);
							onSessionEnd(session);
						}}
						onSubmit={(session) => onSessionEnd(session)}
					/>
				</>
			)}
		</Screen>
	);
}

export default QuizTakingScreen;
