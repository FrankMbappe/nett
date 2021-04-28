import React from "react";
import { Text, View } from "react-native";
import * as Yup from "yup";

import {
	NettForm as Form,
	NettFormField as Field,
	NettFormSubmitButton as SubmitButton,
} from "../../components/forms";
import WelcomeTitle from "../../components/welcome/Title";
import TinyTextDescription from "../../components/TinyTextDescription";
import Screen from "../../components/Screen";

import styles from "./styles";
import { regexps } from "../../config/enums";

const validationSchema = Yup.object().shape({
	phone: Yup.string()
		.label("Phone number")
		.min(9)
		.matches(
			regexps.CMR_PHONE_NUMBER,
			"This doesn't look like a valid cameroonian phone number."
		)
		.required(),
});

// --- SCREEN --- //
function LoginWithPhoneScreen(props) {
	return (
		<Screen style={styles.screen}>
			<Form
				initialValues={{
					phone: "",
				}}
				onSubmit={(values) => console.log(values)}
				validationSchema={validationSchema}
			>
				{/* --- Main container --- */}
				<View style={styles.mainContainer}>
					{/* Title */}
					<WelcomeTitle style={styles.titleContainer}>
						Enter your phone number
					</WelcomeTitle>

					{/* Input */}
					<View style={styles.inputContainer}>
						<Text style={styles.countryIndicator}>+237</Text>
						<View style={styles.inputSubContainer}>
							<Field
								style={styles.input}
								name="phone"
								placeholder={"Your phone number"}
								keyboardType={"phone-pad"}
								maxLength={9}
								textContentType="telephoneNumber"
							/>
						</View>
					</View>

					{/* Description */}
					<TinyTextDescription style={styles.inputDescription}>
						Phone numbers are used to register and log into Nett accounts. After
						entering yours, we will send you a confirmation message to verify
						it.
					</TinyTextDescription>
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
