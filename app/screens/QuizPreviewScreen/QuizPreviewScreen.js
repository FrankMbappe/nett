import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import Screen from "../../components/Screen";
import NettButton from "../../components/Button";
import { screens } from "../../navigation/routes";
import TopBar from "../../components/TopBar";
import ButtonIcon from "../../components/ButtonIcon";
import NettText from "../../components/Text";
import { postTypes } from "../../config/enums";
import { capitalize, getEventProps, userFullName } from "../../utils";
import images from "../../config/images";
import { formatRelative, isPast } from "date-fns";
import Label from "../../components/Label";

function QuizPreviewScreen({ navigation, route }) {
	const {
		classroomName,
		quiz: {
			creationDate,
			title,
			author,
			qas,
			description,
			hasTimeInterval,
			dateOpening,
			dateClosing,
		},
	} = route.params;
	const properties = hasTimeInterval && getEventProps(dateOpening, dateClosing);
	const isAvailable = !(
		isPast(new Date(dateOpening)) && isPast(new Date(dateClosing))
	);

	// Action handlers
	const handleBegin = () => {
		navigation.navigate(screens.QuizTaking, {
			classroomName,
			quiz: route.params.quiz,
		});
	};

	return (
		<Screen style={styles.screen}>
			<TopBar style={styles.topBar}>
				<ButtonIcon
					name="arrow-left"
					size={25}
					onPress={() => navigation.goBack()}
				/>
				<NettText style={styles.topBarTitle}>{`In ${classroomName}`}</NettText>
				<ButtonIcon
					name="share-variant"
					size={25}
					onPress={() => console.log("TODO")}
				/>
			</TopBar>

			<View style={styles.mainContainer}>
				<NettText style={styles.quiz}>{capitalize(postTypes.quiz)}</NettText>
				<View style={styles.titleContainer}>
					<NettText style={styles.title}>{title}</NettText>
					<NettText style={styles.topics}>
						{qas.map(({ topic }) => `#${topic} `)}
					</NettText>
					<View style={styles.authorInfoContainer}>
						<View style={styles.authorInfo}>
							<Image
								style={styles.authorPic}
								source={
									author.profile.picUri
										? { uri: author.profile.picUri }
										: images.USER_DEFAULT
								}
							/>
							<NettText style={styles.authorName}>
								{userFullName({ ...author.profile })}
							</NettText>
						</View>
						<NettText style={styles.creationDate}>{`Published ${formatRelative(
							new Date(creationDate),
							new Date()
						)}`}</NettText>
					</View>
				</View>

				<View style={styles.descriptionContainer}>
					<Label style={styles.descriptionLabel} value="Description" />
					<NettText style={styles.description}>{description}</NettText>
				</View>

				<View
					style={[
						styles.distanceToNowContainer,
						{ backgroundColor: properties.backgroundColor },
					]}
				>
					<NettText
						style={[styles.distanceToNow, { color: properties.color }]}
						numberOfLines={1}
					>
						{properties.distanceToNow}
					</NettText>
				</View>
			</View>
			<View style={styles.bottomBar}>
				<NettButton
					style={styles.beginButton}
					disabled={!isAvailable}
					text="Begin"
					onPress={handleBegin}
				/>
			</View>
		</Screen>
	);
}

export default QuizPreviewScreen;
