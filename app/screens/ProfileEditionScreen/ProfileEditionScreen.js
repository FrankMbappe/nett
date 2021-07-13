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
import Toast from "react-native-root-toast";
import colors from "../../config/colors";
import client from "../../api/client";
import currentUser from "../../config/test";

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required().min(1).label("First name"),
	lastName: Yup.string().required().min(1).label("Last name"),
});

function ProfileEditionScreen({ navigation, route }) {
	// Params
	const { profile } = route.params;

	// States: Data
	const [picUri, setPicUri] = useState(
		profile && currentUser.hostname + profile.picUri
	);
	const [birthDate, setBirthDate] = useState(
		profile ? new Date(profile.birthDate) : new Date()
	);
	const gender = useRef(profile ? profile.gender : genders.male);

	// States: UI
	const [uploadIsVisible, setUploadIsVisible] = useState(false);
	const [progress, setProgress] = useState(0);

	// Effects
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
	const selectImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.5,
			});
			if (!result.cancelled) {
				setPicUri(result.uri);
			}
		} catch (error) {
			Toast.show("An error occured while reading the media", {
				backgroundColor: colors.danger,
			});
		}
	};
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
		if (!result || !result.ok) {
			setUploadIsVisible(false);
			return Toast.show(
				"Something went wrong while updating your profile, please try again...",
				{ backgroundColor: colors.danger }
			);
		}
	};
	const handleDone = () => {
		setUploadIsVisible(false);
		Toast.show("Your profile has been successfully updated!", {
			backgroundColor: colors.ok,
		});
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
					firstName: profile ? profile.firstName : "",
					lastName: profile ? profile.lastName : "",
					email: profile ? profile.email : "",
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
							defaultValue={profile ? profile.firstName : ""}
							textContentType="name"
						/>

						<Field
							autoCorrect={false}
							fontSize={16}
							icon="account-outline"
							name="lastName"
							placeholder="Last name"
							maxLength={255}
							defaultValue={profile ? profile.lastName : ""}
							textContentType="familyName"
						/>

						<DatePicker
							label="Birthdate"
							fontSize={16}
							containerStyle={{ marginBottom: 10 }}
							dateValue={birthDate}
							dateDisplay="spinner"
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
							defaultValue={profile ? profile.email : ""}
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
