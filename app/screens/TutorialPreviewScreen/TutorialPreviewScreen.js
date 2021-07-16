import React from "react";
import { View, Image, FlatList } from "react-native";
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
import { ScrollView } from "react-native";
import { VideoBundle } from "../../components/cards/bundles";
import { isUndefined } from "lodash-es";

function TutorialPreviewScreen({ navigation, route }) {
	const {
		classroomName,
		tutorial: { creationDate, title, author, steps, description },
	} = route.params;

	console.log(steps);

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

			<ScrollView style={{ flex: 1 }}>
				<View style={styles.mainContainer}>
					<NettText style={styles.tutorial}>
						{capitalize(postTypes.tutorial)}
					</NettText>
					<View style={styles.titleContainer}>
						<NettText style={styles.title}>{title}</NettText>
						<NettText style={styles.topics}>{"#Tutorial"}</NettText>
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
							<NettText
								style={styles.creationDate}
							>{`Published ${formatRelative(
								new Date(creationDate),
								new Date()
							)}`}</NettText>
						</View>
					</View>

					{!isUndefined(description) && (
						<View style={styles.descriptionContainer}>
							<Label style={styles.label} value="Description" />
							<NettText style={styles.description}>{description}</NettText>
						</View>
					)}

					<View style={styles.stepsContainer}>
						<Label style={styles.label} value="Steps" />
						<FlatList
							style={{ flexGrow: 0 }}
							data={steps}
							showsHorizontalScrollIndicator={false}
							keyExtractor={({ _id }) => String(_id)}
							renderItem={({ videoUri }) => <VideoBundle uri={videoUri} />}
							horizontal
						/>
					</View>
				</View>
			</ScrollView>
		</Screen>
	);
}

export default TutorialPreviewScreen;
