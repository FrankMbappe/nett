import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as Yup from "yup";
import countriesApi from "../../api/countries";

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

// --- SCREEN --- //
function LoginWithPhoneScreen({ navigation }) {
	const [dialCode, setDialCode] = useState("+237");
	const [searchText, setSearchText] = useState("");

	const {
		data: countries,
		error,
		isLoading,
		request: loadCountries,
	} = useApi(countriesApi.getCountries);

	useEffect(() => {
		loadCountries(searchText);
	}, [searchText]);

	return (
		<Screen style={styles.screen}>
			{error && (
				<>
					<NettText style={{ padding: 15, fontSize: 18 }}>
						Couldn't retrieve the countries
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
