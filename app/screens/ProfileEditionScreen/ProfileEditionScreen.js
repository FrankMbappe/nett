import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { capitalize } from "lodash";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";

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

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required().min(1).label("First name"),
	lastName: Yup.string().required().min(1).label("Last name"),
});

// * The profile passed as an argument will be used when the user closes the
// * app without completing the profile creation process (ProfileCreation)
// * It will be also used as an argument to be edited using this same screen

function ProfileEditionScreen({ profile }) {
	const [picUri, setPicUri] = useState();
	const gender = useRef(genders.male);

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

	return (
		<Screen style={styles.screen}>
			<Form
				initialValues={{
					pic: null,
					firstName: "",
					lastName: "",
					birthDate: Date.now(),
				}}
				onSubmit={(values) => console.log(values)}
				validationSchema={validationSchema}
			>
				<ScrollView
					contentContainerStyle={{ alignItems: "center" }}
					style={styles.mainContainer}
				>
					<StartTitle style={styles.titleContainer} useLogo={false}>
						Configure your profile
					</StartTitle>

					{/* // TODO: ImagePicker for 'pic' ?? and its error label */}
					<ProfilePhotoPicker
						style={styles.profilePhotoPicker}
						size={200}
						picSource={picUri != null ? { uri: picUri } : images.USER_DEFAULT}
						onPicChangerPress={selectImage}
					/>

					<View style={{ width: "85%" }}>
						<Field
							autoCapitalize="none"
							autoCorrect={false}
							fontSize={16}
							icon="card-text-outline"
							name="firstName"
							placeholder="First name"
							maxLength={255}
							textContentType="name"
						/>

						<Field
							autoCapitalize="none"
							autoCorrect={false}
							fontSize={16}
							icon="card-text-outline"
							name="lastName"
							placeholder="Last name"
							maxLength={255}
							textContentType="familyName"
						/>

						{/* // TODO: DatePicker for 'birthDay' ?? and its error label */}
						<DatePicker label="Birthdate" fontSize={16} />

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
