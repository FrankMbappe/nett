import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as Yup from "yup";
import countriesApi from "../../api/countries";
import authApi from "../../api/auth";

import useApi from "../../hooks/useApi";
import {
	NettForm as Form,
	NettFormField as Field,
	NettFormSubmitButton as SubmitButton,
} from "../../components/forms";
import NettText from "../../components/Text";
import Screen from "../../components/Screen";
import StartTitle from "../../components/start/Title";

import styles from "./styles";
import NettPicker from "../../components/Picker";
import { screens } from "../../navigation/routes";
import NettButton from "../../components/Button";
import ActivityIndicator from "../../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
	phone: Yup.string().label("Phone number").required(),
});

function LoginWithPhoneScreen({ navigation }) {
	const [dialCode, setDialCode] = useState("+237");
	const [searchText, setSearchText] = useState("");

	const {
		data: countries,
		error,
		isLoading,
		request: loadCountries,
	} = useApi(countriesApi.getCountries);

	// const verifyPhoneNumberApi = useApi(authApi.register);

	useEffect(() => {
		loadCountries(searchText);
	}, [searchText]);

	return (
		<Screen style={styles.screen}>
			{error && !isLoading && (
				<>
					<NettText style={{ padding: 15, fontSize: 18 }}>
						Couldn't connect to the server
					</NettText>
					<NettButton text="Retry" onPress={loadCountries} />
				</>
			)}

			{/* Loader */}
			<ActivityIndicator visible={isLoading} />

			{!error && !isLoading && (
				<Form
					initialValues={{
						phone: "",
					}}
					onSubmit={({ phone }) => {
						const fullPhoneNumber = dialCode + phone;

						// Here, I attempt to verify the phone number
						// const result = await verifyPhoneNumberApi.request(fullPhoneNumber);
						// if (result != null) {
						// 	alert(JSON.stringify(result));
						navigation.navigate(screens.PhoneNumberConfirmation, {
							phone: fullPhoneNumber,
						});
						// } else {
						// 	alert(
						// 		"An error occurred while verifying your phone number. Please retry"
						// 	);
						// }
					}}
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
								// Picker
								hasSearchBar
								containerStyle={styles.dialCodeContainer}
								style={styles.dialCodeText}
								placeholder={dialCode}
								// List
								listItems={countries}
								listItemKey={"code"}
								selectedListItem={dialCode}
								onSelectListItem={({ dialCode }) => setDialCode(dialCode)}
								showListItemValue={({ flag, name, dialCode }) =>
									`${flag}  ${name} (${dialCode})`
								}
								onChangeSearchText={(text) => setSearchText(text)}
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
							Phone numbers are used to register and log into Nett accounts.
							After entering yours, we will send you a confirmation message to
							verify it.
						</NettText>
					</View>

					{/* --- Bottom bar --- */}
					<View style={styles.bottomBar}>
						<SubmitButton style={styles.submitButton} text="Next" />
					</View>
				</Form>
			)}
		</Screen>
	);
}

export default LoginWithPhoneScreen;
