import React, { useRef } from "react";
import Screen from "../../components/Screen";
import * as Yup from "yup";

import NettImagePicker from "../../components/ImagePicker";
import {
	NettForm as Form,
	NettFormField as Field,
	NettFormSubmitButton as SubmitButton,
} from "../../components/forms";

import styles from "./styles";
import { ScrollView, View } from "react-native";
import StartTitle from "../../components/start/Title";
import DatePicker from "../../components/DatePicker";
import BinarySelector from "../../components/BinarySelector";
import { genders } from "../../config/enums";
import { capitalize } from "lodash";

const validationSchema = Yup.object().shape({
	firstName: Yup.string().required().min(1).label("First name"),
	lastName: Yup.string().required().min(1).label("Last name"),
});

// * The profile passed as an argument will be used when the user closes the
// * app without completing the profile creation process (ProfileCreation)
// * It will be also used as an argument to be edited using this same screen
function ProfileEditionScreen({ profile }) {
	const gender = useRef(genders.male);

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
					<NettImagePicker
						style={styles.imagePicker}
						size={200}
						onPicChangerPress={() => console.log("Change")}
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
						<DatePicker fontSize={16} />

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
