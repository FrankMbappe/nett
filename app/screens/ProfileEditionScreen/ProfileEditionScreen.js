import React from "react";
import Screen from "../../components/Screen";
import * as Yup from "yup";

import NettImagePicker from "../../components/ImagePicker";
import {
	NettForm as Form,
	NettFormField as Field,
	NettFormSubmitButton as SubmitButton,
} from "../../components/forms";

import styles from "./styles";
import { View } from "react-native";
import WelcomeTitle from "../../components/welcome/Title";

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required().min(1).label("First name"),
	lastName: Yup.string().required().min(1).label("Last name"),
});

// * The profile passed as an argument will be used when the user closes the
// * app without completing the profile creation process (ProfileCreation)
// * It will be also used as an argument to be edited using this same screen
function ProfileEditionScreen({ profile }) {
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
				<View style={styles.mainContainer}>
					<WelcomeTitle style={styles.titleContainer} useLogo={false}>
						Configure your profile
					</WelcomeTitle>

					{/* // TODO: ImagePicker for 'pic' ?? and its error label */}
					<NettImagePicker
						style={styles.imagePicker}
						size={200}
						onPicChangerPress={() => console.log("Change")}
					/>

					<Field
						autoCapitalize="none"
						autoCorrect={false}
						icon="card-text-outline"
						name="firstName"
						placeholder="First name"
						maxLength={255}
						textContentType="name"
					/>

					<Field
						autoCapitalize="none"
						autoCorrect={false}
						icon="card-text-outline"
						name="lastName"
						placeholder="Last name"
						maxLength={255}
						textContentType="familyName"
					/>

					{/* // TODO: DatePicker for 'birthDay' ?? and its error label */}
				</View>
				<View style={styles.bottomBar}>
					<SubmitButton text="Retry" text="Validate" />
				</View>
			</Form>
		</Screen>
	);
}

export default ProfileEditionScreen;
