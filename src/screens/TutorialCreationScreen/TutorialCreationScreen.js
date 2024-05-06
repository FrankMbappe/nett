import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import classroomsApi from "../../api/classrooms";

import ButtonIcon from "../../components/ButtonIcon";
import NettButton from "../../components/Button";
import NettText from "../../components/Text";
import Screen from "../../components/Screen";
import TopBar from "../../components/TopBar";
import Label from "../../components/Label";

import { buttons } from "../../config/enums";
import styles from "./styles";
import NettTextInput from "../../components/TextInput";
import { capitalize, formatWordCount } from "../../utils";
import FloatingButton from "../../components/FloatingButton";
import TutorialStepModal from "./TutorialStepModal";
import Toast from "react-native-root-toast";
import colors from "../../config/colors";
import TutorialStepCard from "../../components/cards/TutorialStepCard";
import UploadScreen from "../UploadScreen/UploadScreen";

function TutorialCreationScreen({ navigation, route }) {
	// Params
	const { classroomId } = route.params;

	// States
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [stepList, setStepList] = useState([]);
	const [stepModalIsVisible, setStepModalIsVisible] = useState(false);
	const [uploadIsVisible, setUploadIsVisible] = useState(false);
	const [progress, setProgress] = useState(0);

	// Refs
	const videoFile = useRef();

	// Effects
	useEffect(() => {
		requestPermission();
		alert(JSON.stringify(stepList));
	}, []);

	// Action handlers
	const handleSubmit = async () => {
		// Input validation
		if (title.length <= 1 || stepList.length <= 1)
			return Toast.show(
				"A tutorial must have a title, and have at least 2 steps",
				{
					backgroundColor: colors.warning,
				}
			);

		// I define the shape of a tutorial
		const tutorial = {
			title,
			description: description.length > 0 ? description : undefined,
			steps: stepList,
		};

		//* I call the API
		// Starting uploading
		setProgress(0);
		setUploadIsVisible(true);
		const result = await classroomsApi.addTutorial(
			classroomId,
			tutorial,
			(progress) => setProgress(progress)
		);
		console.log(result);

		// Failure
		if (!result || !result.ok) {
			setUploadIsVisible(false);
			return Toast.show(
				"Something went wrong while adding your post, please try again",
				{ backgroundColor: colors.danger }
			);
		}
	};
	const handleAddStep = () => {
		// Pick video and open modal with that video
		selectMedia();
	};
	const handleRemoveStep = (stepIndex) => {
		// I simply remove the step from the list
		setStepList((prevValue) =>
			prevValue.filter((_, index) => stepIndex !== index)
		);
	};
	const handleCloseStepModal = () => {
		setStepModalIsVisible(false);
		videoFile.current = null;
	};
	const handleSubmitStepModal = ({ videoFile, title, description }) => {
		if (!videoFile)
			return Toast.show("A step must have a video.", {
				backgroundColor: colors.warning,
			});

		// I define the shape of the step
		const step = {
			position: stepList.length,
			video: videoFile,
			title,
			description: description.length > 0 ? description : undefined,
		};

		// Then I add it to the step list
		setStepList((prevValue) => prevValue.concat(step));

		// Finally I close the modal
		setStepModalIsVisible(false);
	};
	const requestPermission = async () => {
		const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!granted)
			Toast.show("You need to enable permission to access the library", {
				backgroundColor: colors.warning,
			});
	};
	const selectMedia = async () => {
		try {
			// I get a video from the media library
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Videos,
				allowsEditing: true,
				videoMaxDuration: 180, // 3 minutes
				aspect: [4, 3],
				videoQuality: 0.5,
			});

			// If I get a valid result
			if (!result.cancelled) {
				// Video file is updated, as it is a step modal parameter
				videoFile.current = result;

				// The step modal is shown
				setStepModalIsVisible(true);
			}
		} catch (error) {
			Toast.show("An error occured while reading your video", {
				backgroundColor: colors.danger,
			});
		}
	};
	const saveTutorial = async (tutorial) => {};
	const handleDone = () => {
		// Everything went fine
		setUploadIsVisible(false);
		Toast.show("Refresh the page to see your new post!", {
			backgroundColor: colors.ok,
		});
		navigation.goBack();
	};

	return (
		<Screen style={styles.screen}>
			{/* Upload screen */}
			<UploadScreen
				progress={progress}
				visible={uploadIsVisible}
				onDone={handleDone}
			/>

			<TopBar style={styles.topBar}>
				<ButtonIcon name="arrow-left" size={25} />
				<NettText style={styles.topBarTitle}>{"New tutorial"}</NettText>
			</TopBar>

			<ScrollView style={styles.mainContainer}>
				<>
					<Label value="Title" />
					<NettTextInput
						containerStyle={styles.titleInput}
						placeholder="How do you want to name it?"
						onChangeText={(text) => setTitle(text)}
						value={title}
					/>
				</>

				<>
					<Label value="Description" />
					<NettTextInput
						containerStyle={styles.descriptionInput}
						placeholder="What is your tutorial all about?"
						onChangeText={(text) => setDescription(text)}
						value={description}
						multiline
					/>
				</>

				<Divider style={styles.divider} />

				<>
					<Label
						value={`${capitalize(
							formatWordCount(stepList.length, "Step")
						)} added`}
					/>
					{stepList != null && stepList.length <= 0 && (
						<NettText style={styles.stepTip}>
							{"🎥  Tap the '+' floating button to add a new step."}
						</NettText>
					)}
					<View style={styles.stepListContainer}>
						{stepList.map((step, index) => (
							<TutorialStepCard
								key={String(index)}
								step={step}
								onPressRemove={() => handleRemoveStep(index)}
							/>
						))}
					</View>
				</>
			</ScrollView>

			<FloatingButton
				icon="plus"
				style={styles.addStepButton}
				onPress={handleAddStep}
			/>

			<View style={styles.bottomBar}>
				<NettButton
					disabled={stepList.length <= 1 || title.length <= 1}
					onPress={handleSubmit}
					text="Publish"
					type={buttons.PRIMARY}
				/>
			</View>

			{/* Additional infos modal */}
			<TutorialStepModal
				videoFile={videoFile.current}
				isVisible={stepModalIsVisible}
				onTapOutside={handleCloseStepModal}
				onSubmit={handleSubmitStepModal}
			/>
		</Screen>
	);
}

export default TutorialCreationScreen;
