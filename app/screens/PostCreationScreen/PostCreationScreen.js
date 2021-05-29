import React, { useCallback, useState } from "react";
import { View } from "react-native";
import BundleAdder from "../../components/BundleAdder";
import NettButton from "../../components/Button";
import ButtonIcon from "../../components/ButtonIcon";
import { ListItem } from "../../components/lists";
import Screen from "../../components/Screen";
import NettText from "../../components/Text";
import NettTextInput from "../../components/TextInput";
import TopBar from "../../components/TopBar";
import { buttons } from "../../config/enums";
import images from "../../config/images";
import styles from "./styles";

function PostCreationScreen({
	author: {
		profile: { fullName: authorName, picUri },
		classrooms,
	},
	classroom,
	maxTextLength = 3000,
}) {
	const [selectedClassroms, setSelectedClassroms] = useState([classroom]);
	const [text, setText] = useState("");
	const [bundle, setBundle] = useState();

	const onPublish = useCallback(() => console.log("Publish"));

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
			<View style={styles.mainContainer}>
				<View style={styles.authorAndClassroomsContainer}>
					<ListItem
						fontSize={15}
						imageIsRounded
						image={images.USER_DEFAULT}
						// image={picUri ? { uri: picUri } : images.USER_DEFAULT}
						name={authorName}
						description={"Will be sent to ".concat(
							selectedClassroms.length > 1
								? `${selectedClassroms.length} classrooms`
								: selectedClassroms[0].name
						)}
					/>
					{/* <NettButton
						fontSize={12}
						icon="pen"
						text="Modify"
						type={buttons.TERTIARY}
					/> */}
				</View>
				<View style={styles.inputContainer}>
					<NettTextInput
						autoFocus={true}
						containerStyle={styles.input}
						fontSize={19}
						multiline
						maxLength={maxTextLength}
						onChangeText={(text) => setText(text)}
						placeholder="Type something..."
						value={text}
					/>
					<NettText style={styles.characterCount}>
						<NettText style={styles.characterCountLabel}>
							{"Remaining characters:  "}
						</NettText>
						<NettText
							style={styles.characterCountValue}
						>{`${text.length} / ${maxTextLength}`}</NettText>
					</NettText>
				</View>
				<BundleAdder
					containerStyle={styles.bundleContainer}
					isExpanded={!bundle}
				/>
			</View>
			<View style={styles.bottomBar}>
				<NettButton
					disabled={!text.length && !bundle}
					onPress={onPublish}
					text="Publish"
					type={buttons.PRIMARY}
				/>
			</View>
		</Screen>
	);
}

export default PostCreationScreen;
