import React, { useEffect, useState } from "react";
import { Keyboard, View, ScrollView } from "react-native";
import { bytesToSize, capitalize, userFullName } from "../../utils";
import { Divider } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { getInfoAsync } from "expo-file-system";
import classroomsApi from "../../api/classrooms";

import { ListItem } from "../../components/lists";
import BundleAdder from "../../components/BundleAdder";
import ButtonIcon from "../../components/ButtonIcon";
import NettButton from "../../components/Button";
import NettText from "../../components/Text";
import NettTextInput from "../../components/TextInput";
import Screen from "../../components/Screen";
import TopBar from "../../components/TopBar";

import { buttons } from "../../config/enums";
import images from "../../config/images";
import styles from "./styles";
import { screens } from "../../navigation/routes";
import currentUser from "../../config/test";
import Toast from "react-native-root-toast";
import colors from "../../config/colors";
import FileRenderer from "../../components/FileRenderer";
import UploadScreen from "../UploadScreen/UploadScreen";
import { extname } from "path";

const maxTextLength = 3000;

function PostCreationScreen({ route, navigation }) {
	// Get params
	const { classroomId, classroomName } = route.params;
	const { _type, profile } = currentUser;
	const authorName = userFullName({ ...profile });

	// States: Data
	const [text, setText] = useState("");
	const [file, setFile] = useState();

	// States: UI
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);
	const [uploadIsVisible, setUploadIsVisible] = useState(false);
	const [progress, setProgress] = useState(0);

	// Effects
	useEffect(() => {
		const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardVisible(true);
		});
		const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardVisible(false);
		});

		return () => {
			keyboardDidShow.remove();
			keyboardDidHide.remove();
		};
	}, []);
	useEffect(() => {
		requestPermission();
	}, []);

	// Action handlers
	const requestPermission = async () => {
		const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!granted)
			Toast.show("You need to enable permission to access the library", {
				backgroundColor: colors.warning,
			});
	};
	const selectMedia = async (mediaType) => {
		try {
			// TODO: Propose the user to choose either library or camera
			// If camera, launchCameraAsync(). Else, launchImageLibraryAsync()
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: mediaType,
				allowsEditing: true,
				videoMaxDuration: 180, // 3 minutes
				aspect: [4, 3],
				quality: 0.5,
			});
			if (!result.cancelled) {
				const size = (await getInfoAsync(result.uri)).size;
				setFile({ ...result, size });
			}
		} catch (error) {
			Toast.show("An error occured while reading the media", {
				backgroundColor: colors.danger,
			});
		}
	};
	const selectDocument = async () => {
		try {
			// Accepts every type of file '*/*'
			const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
			if (result.type === "success") {
				const fileResult = {
					uri: result.uri,
					name: result.name,
					size: result.size,
					extension: extname(result.uri).substr(1),
					type: "file",
				};
				setFile(fileResult);
			}
		} catch (error) {
			Toast.show("An error occured while reading your file", {
				backgroundColor: colors.danger,
			});
		}
	};
	const handleDeleteFile = () => {
		setFile(null);
	};
	const handleSubmit = async () => {
		// Starting uploading
		setProgress(0);
		setUploadIsVisible(true);
		const values = { classroomId, text, file };
		const result = await classroomsApi.addPost(values, (progress) =>
			setProgress(progress)
		);

		// Result handler
		if (!result || !result.ok) {
			setUploadIsVisible(false);
			return Toast.show(
				"Something went wrong while adding your post, please try again",
				{ backgroundColor: colors.danger }
			);
		}
	};
	const handleDone = () => {
		setUploadIsVisible(false);
		Toast.show("Refresh the page to see your new post!", {
			backgroundColor: colors.ok,
		});
		navigation.goBack();
	};

	const onPressImage = () => selectMedia(ImagePicker.MediaTypeOptions.Images);
	const onPressVideo = () => selectMedia(ImagePicker.MediaTypeOptions.Videos);
	const onPressFile = () => selectDocument();
	const onPressTutorial = () =>
		navigation.navigate(screens.TutorialCreation, { classroomId });
	const onPressQuiz = () =>
		navigation.navigate(screens.QuizCreation, { classroomId });

	return (
		<Screen style={styles.screen}>
			{/* Upload screen */}
			<UploadScreen
				progress={progress}
				visible={uploadIsVisible}
				onDone={handleDone}
			/>

			{/* Body */}
			<TopBar style={styles.topBar}>
				<ButtonIcon
					name="arrow-left"
					size={25}
					onPress={() => navigation.goBack()}
				/>
				<NettText style={styles.topBarTitle}>{"New post"}</NettText>
				<NettButton
					text={"Save".toUpperCase()}
					type={buttons.TERTIARY}
					fontSize={14}
					style={styles.saveButton}
				/>
			</TopBar>

			{/* The Content of the ScrollView takes all the available space if
				there's no PostBundle shown */}
			<ScrollView
				contentContainerStyle={!file && { flex: 1 }}
				style={styles.mainContainer}
			>
				<View key="currentUserInfo" style={styles.authorAndClassroomsContainer}>
					<ListItem
						fontSize={15}
						imageIsRounded
						image={
							profile.picUri ? { uri: profile.picUri } : images.USER_DEFAULT
						}
						name={authorName}
						description={`${capitalize(_type)} in ${classroomName}`}
					/>
					{/* TODO: Add multiple classrooms */}
				</View>

				<View key="textInput" style={styles.inputContainer}>
					<NettTextInput
						autoFocus={true}
						containerStyle={[styles.input, !file && { flex: 1 }]}
						fontSize={19}
						multiline
						maxLength={maxTextLength}
						onChangeText={(text) => setText(text)}
						placeholder="Type something..."
						value={text}
					/>
				</View>

				<NettText key="inputCharacterCount" style={styles.characterCount}>
					<NettText style={styles.characterCountLabel}>
						{"Remaining characters:  "}
					</NettText>
					<NettText
						style={styles.characterCountValue}
					>{`${text.length} / ${maxTextLength}`}</NettText>
				</NettText>

				{/* If a file has been added, the Bundle is shown here */}
				{file && (
					<View key="addedFile" style={{ marginTop: 10 }}>
						<Divider />
						<FileRenderer
							file={file}
							type={file && file.type}
							showDelete
							onDelete={handleDeleteFile}
							canBeDownloaded={false}
						/>
						<NettText style={styles.fileLabel}>
							{`${file.type} - ${bytesToSize(file.size)}`}
						</NettText>
					</View>
				)}
			</ScrollView>

			{/* Adding a photo, video, file, etc. to the post */}
			<View style={styles.bundleAdderContainer}>
				<Divider />
				<BundleAdder
					containerStyle={styles.bundleContainer}
					isExpanded={!isKeyboardVisible && !file}
					onPressImage={onPressImage}
					onPressVideo={onPressVideo}
					onPressFile={onPressFile}
					onPressTutorial={onPressTutorial}
					onPressQuiz={onPressQuiz}
				/>
			</View>

			<View style={styles.bottomBar}>
				<NettButton
					disabled={!text.length && !file}
					onPress={handleSubmit}
					text="Publish"
					type={buttons.PRIMARY}
				/>
			</View>
		</Screen>
	);
}

export default PostCreationScreen;
