import React, { useCallback, useEffect, useState } from "react";
import { Keyboard, View, ScrollView } from "react-native";
import { bytesToSize, capitalize } from "../../utils";
import { Divider } from "react-native-elements";

import { ListItem } from "../../components/lists";
import { PostBundle } from "../../components/cards/bundles";
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

function PostCreationScreen({
	author: {
		type,
		profile: { fullName: authorName, picUri },
	},
	classroom,
	bundle,
	maxTextLength = 3000,
}) {
	const [text, setText] = useState("");
	const [file, setFile] = useState(bundle);
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
		setFile(bundle);
	}, [bundle]);

	const onPublish = useCallback(() => console.log("Publish")); // TODO

	return (
		<Screen style={styles.screen}>
			<TopBar style={styles.topBar}>
				<ButtonIcon name="arrow-left" size={25} />
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
				<View key="1" style={styles.authorAndClassroomsContainer}>
					<ListItem
						fontSize={15}
						imageIsRounded
						image={picUri ? { uri: picUri } : images.USER_DEFAULT}
						name={authorName}
						description={`${capitalize(type)} in ${classroom.name}`}
					/>
					{/* TODO: Add multiple classrooms */}
				</View>

				<View key="2" style={styles.inputContainer}>
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
				<NettText key="3" style={styles.characterCount}>
					<NettText style={styles.characterCountLabel}>
						{"Remaining characters:  "}
					</NettText>
					<NettText
						style={styles.characterCountValue}
					>{`${text.length} / ${maxTextLength}`}</NettText>
				</NettText>

				{/* If a file has been added, the Bundle is shown here */}
				{file && (
					<View key="4" style={{ marginTop: 10 }}>
						<Divider />
						<PostBundle file={file} />
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
					onPressBundle={() => alert("Bundle")}
					onPressMention={() => alert("Mention")}
					onPressMedia={() => alert("Photo/Video")}
					onPressFile={() => alert("File")}
					onPressTutorial={() => alert("Tutorial")}
					onPressQuiz={() => alert("Quiz")}
				/>
			</View>

			<View style={styles.bottomBar}>
				<NettButton
					disabled={!text.length && !file}
					onPress={onPublish}
					text="Publish"
					type={buttons.PRIMARY}
				/>
			</View>
		</Screen>
	);
}

export default PostCreationScreen;
