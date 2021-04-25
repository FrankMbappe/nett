import React from "react";
import Screen from "../../components/Screen";
import * as Yup from "yup";

import NettImagePicker from "../../components/NettImagePicker";
import {
	NettForm,
	NettFormField,
	NettFormSubmitButton,
} from "../../components/forms";

import styles from "./styles";

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
			<NettForm
				initialValues={{
					pic: null,
					firstName: "",
					lastName: "",
					birthDate: Date.now(),
				}}
				onSubmit={(values) => console.log(values)}
				validationSchema={validationSchema}
			>
				{/* // TODO: ImagePicker for 'pic' ?? and its error label */}
				<NettImagePicker style={styles.imagePicker} />

				<NettFormField
					autoCapitalize="none"
					autoCorrect={false}
					name="firstName"
					placeholder="First name"
					textContentType="name"
				/>

				<NettFormField
					autoCapitalize="none"
					autoCorrect={false}
					name="lastName"
					placeholder="Last name"
					textContentType="familyName"
				/>

				{/* // TODO: DatePicker for 'birthDay' ?? and its error label */}

				<NettFormSubmitButton style={styles.submitButton} text="Validate" />
			</NettForm>
		</Screen>
	);
}

export default ProfileEditionScreen;
