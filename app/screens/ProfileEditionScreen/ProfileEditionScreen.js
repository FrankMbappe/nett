import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { capitalize } from "lodash";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";
import usersApi from "../../api/users";

import BinarySelector from "../../components/BinarySelector";
import ProfilePhotoPicker from "../../components/ProfilePhotoPicker";
import {
	NettForm as Form,
	NettFormField as Field,
	NettFormSubmitButton as SubmitButton,
} from "../../components/forms";
import Screen from "../../components/Screen";
import StartTitle from "../../components/start/Title";
import DatePicker from "../../components/DatePicker";
import { genders } from "../../config/enums";
import styles from "./styles";
import images from "../../config/images";
import UploadScreen from "../UploadScreen/UploadScreen";
import { navigators } from "../../navigation/routes";

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required().min(1).label("First name"),
	lastName: Yup.string().required().min(1).label("Last name"),
});

function ProfileEditionScreen({ navigation }) {
	// States: Data
	const [picUri, setPicUri] = useState();
	const [birthDate, setBirthDate] = useState(new Date());
	const gender = useRef(genders.male);

	// States: UI
	const [uploadIsVisible, setUploadIsVisible] = useState(false);
	const [progress, setProgress] = useState(0);

	const requestPermission = async () => {
		const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!granted) alert("You need to enable permission to access the library");
	};
	const selectImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 0.5,
			});
			if (!result.cancelled) {
				setPicUri(result.uri);
			}
		} catch (error) {
			console.log("Error occured while reading an image.");
		}
	};

	useEffect(() => {
		requestPermission();
	}, []);

	const handleSubmit = async (values) => {
		// Starting uploading
		setProgress(0);
		setUploadIsVisible(true);
		const completeValues = {
			...values,
			birthDate: birthDate.toISOString(),
			picUri,
		};
		const result = await usersApi.setProfile(completeValues, (progress) =>
			setProgress(progress)
		);

		// Result handler
		if (!result) {
			setUploadIsVisible(false);
			return alert("Could not update the profile.");
		}
	};

	const handleDone = () => {
		setUploadIsVisible(false);
		navigation.navigate(navigators.App);
	};

	return (
		<Screen style={styles.screen}>
			{/* Upload screen */}
			<UploadScreen
				progress={progress}
				visible={uploadIsVisible}
				onDone={handleDone}
			/>

			{/* Body */}
			<Form
				initialValues={{
					picUri: null,
					firstName: "",
					lastName: "",
					email: "",
					birthDate: new Date(),
				}}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				<StartTitle style={styles.titleContainer} useLogo={false}>
					Configure your profile
				</StartTitle>

				<ScrollView
					contentContainerStyle={{ alignItems: "center" }}
					style={styles.mainContainer}
				>
					{/* // TODO: ImagePicker for 'pic' ?? and its error label */}
					<ProfilePhotoPicker
						style={styles.profilePhotoPicker}
						size={200}
						picSource={picUri != null ? { uri: picUri } : images.USER_DEFAULT}
						onPicChangerPress={selectImage}
					/>

					<View style={{ width: "85%" }}>
						<Field
							autoCorrect={false}
							fontSize={16}
							icon="account-outline"
							name="firstName"
							placeholder="First name"
							maxLength={255}
							textContentType="name"
						/>

						<Field
							autoCorrect={false}
							fontSize={16}
							icon="account-outline"
							name="lastName"
							placeholder="Last name"
							maxLength={255}
							textContentType="familyName"
						/>

						<DatePicker
							label="Birthdate"
							fontSize={16}
							containerStyle={{ marginBottom: 10 }}
							dateValue={birthDate}
							onChangeDate={(date) => setBirthDate(date)}
						/>

						<Field
							autoCapitalize="none"
							autoCorrect={false}
							fontSize={16}
							icon="at"
							name="email"
							placeholder="E-mail address"
							maxLength={255}
							textContentType="emailAddress"
						/>

						<BinarySelector
							left={capitalize(genders.male)}
							right={capitalize(genders.female)}
							style={styles.genderSelector}
							onSelectionChange={(selection) => (gender.current = selection)}
						/>
					</View>
				</ScrollView>

				<View style={styles.bottomBar}>
					<SubmitButton text="Validate" />
				</View>
			</Form>
		</Screen>
	);
}

export default ProfileEditionScreen;
