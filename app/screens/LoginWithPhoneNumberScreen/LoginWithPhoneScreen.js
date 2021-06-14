import React, { useState } from "react";
import { View } from "react-native";
import * as Yup from "yup";

import {
	NettForm as Form,
	NettFormField as Field,
	NettFormSubmitButton as SubmitButton,
} from "../../components/forms";
import NettText from "../../components/Text";
import Screen from "../../components/Screen";
import StartTitle from "../../components/start/Title";

import styles from "./styles";
import { countries } from "../../config/enums";
import NettPicker from "../../components/Picker";
import { screens } from "../../navigation/routes";

const validationSchema = Yup.object().shape({
	phone: Yup.string().label("Phone number").required(),
});

const initialDialCode = countries.find((x) => x.key === "CM");

// --- SCREEN --- //
function LoginWithPhoneScreen({ navigation }) {
	const [dialCode, setDialCode] = useState(initialDialCode.value);

	return (
		<Screen style={styles.screen}>
			<Form
				initialValues={{
					phone: "",
				}}
				// onSubmit={({ phone }) => console.log(dialCode + phone)}
				onSubmit={({ phone }) =>
					navigation.navigate(screens.PhoneNumberConfirmation, {
						phone: dialCode + phone,
					})
				}
				validationSchema={validationSchema}
			>
				{/* --- Main container --- */}
				<View style={styles.mainContainer}>
					{/* Title */}
					<StartTitle style={styles.titleContainer}>
						Enter your phone number
					</StartTitle>

					{/* Input */}
					<View style={styles.inputContainer}>
						{/* Dial code picker */}
						<NettPicker
							containerStyle={styles.dialCodeContainer}
							flatListKey={"key"}
							hasSearchBar
							items={countries}
							onSelectItem={(item) => setDialCode(item.value)}
							placeholder={initialDialCode.value}
							selectedItem={dialCode}
							style={styles.dialCodeText}
						/>

						{/* Phone number input */}
						<Field
							fieldStyle={styles.phoneInput}
							name="phone"
							placeholder={"Phone number"}
							keyboardType={"phone-pad"}
							textContentType="telephoneNumber"
						/>
					</View>

					{/* Description */}
					<NettText style={styles.inputDescription}>
						Phone numbers are used to register and log into Nett accounts. After
						entering yours, we will send you a confirmation message to verify
						it.
					</NettText>
				</View>

				{/* --- Bottom bar --- */}
				<View style={styles.bottomBar}>
					<SubmitButton style={styles.submitButton} text="Next" />
				</View>
			</Form>
		</Screen>
	);
}

export default LoginWithPhoneScreen;
