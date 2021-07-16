import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import Screen from "../../components/Screen";
import TopBar from "../../components/TopBar";
import ButtonIcon from "../../components/ButtonIcon";
import NettText from "../../components/Text";
import { postTypes } from "../../config/enums";
import { capitalize, userFullName } from "../../utils";
import images from "../../config/images";
import { formatRelative } from "date-fns";
import Label from "../../components/Label";

function TutorialPreviewScreen({ navigation, route }) {
	const {
		classroomName,
		tutorial: { creationDate, title, author, steps, description },
	} = route.params;

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
				<NettText style={styles.quiz}>
					{capitalize(postTypes.tutorial)}
				</NettText>
				<View style={styles.titleContainer}>
					<NettText style={styles.title}>{title}</NettText>
					<NettText style={styles.topics}>
						{steps.map(({ topic }) => `#${topic} `)}
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
					<Label style={styles.label} value="Description" />
					<NettText style={styles.description}>{description}</NettText>
				</View>

				<View style={styles.stepsContainer}>
					<Label style={styles.label} value="Steps" />
				</View>
			</View>
		</Screen>
	);
}

export default TutorialPreviewScreen;
