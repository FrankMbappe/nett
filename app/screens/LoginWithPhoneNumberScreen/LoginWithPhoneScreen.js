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
import ActivityIndicator from "../../components/ActivityIndicator";
import Toast from "react-native-root-toast";
import { escapeRegExp, sortBy } from "lodash-es";
import ApiError from "../../components/ApiError";
import colors from "../../config/colors";

const validationSchema = Yup.object().shape({
	phone: Yup.string().label("Phone number").required(),
});

function LoginWithPhoneScreen({ navigation }) {
	// API
	const {
		data: countries,
		error,
		isLoading,
		request: loadCountries,
	} = useApi(countriesApi.getCountries);

	// States
	const [countryList, setCountryList] = useState([]);
	const [dialCode, setDialCode] = useState("+237");
	const [search, setSearch] = useState("");
	const [showLoader, setShowLoader] = useState(false);

	// Effects
	useEffect(() => {
		loadCountries();
	}, []);
	useEffect(() => {
		setCountryList((_) => {
			const results = countries.filter(({ flag, name, dialCode }) => {
				const pattern = new RegExp(`^.*${escapeRegExp(search)}.*$`, "i");
				return pattern.test(`${flag} ${name} ${dialCode}`);
			});
			return sortBy(results, "name");
		});
	}, [countries, search]);

	// Action handlers
	const handleShowCountries = () => {
		setSearch(""); // I reset the search input
	};
	const handleSubmit = async ({ phone }) => {
		// Here, I attempt to send confirmation code
		setShowLoader(true);
		const fullPhoneNumber = dialCode + phone;
		const result = await authApi.sendConfirmationCode(fullPhoneNumber);

		// Failure
		if (!result) {
			setShowLoader(false);
			return Toast.show(
				"Please retry, something went wrong while verifying your phone number.",
				{ duration: Toast.durations.LONG, backgroundColor: colors.danger }
			);
		}

		// Success
		setShowLoader(false);
		alert(JSON.stringify(result));
		Toast.show("You will soon receive a 4-digit confirmation code...", {
			duration: Toast.durations.LONG,
			backgroundColor: colors.optimal,
		});
		navigation.navigate(screens.PhoneNumberConfirmation, {
			phone: fullPhoneNumber,
		});
	};

	return (
		<Screen style={styles.screen}>
			{/* When an error occurs */}
			<ApiError show={error && !isLoading} onPressRetry={loadCountries} />

			{!error && !isLoading && (
				<Form
					initialValues={{
						phone: "",
					}}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					{/* --- Main container --- */}
					<View
						style={[styles.mainContainer, { opacity: showLoader ? 0.25 : 1 }]}
					>
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
								listItems={countryList}
								listItemKey={"code"}
								selectedListItem={dialCode}
								onSelectListItem={({ dialCode }) => setDialCode(dialCode)}
								showListItemValue={({ flag, name, dialCode }) =>
									`${flag}  ${name} (${dialCode})`
								}
								onChangeSearchText={(text) => setSearch(text)}
								onShowListItems={handleShowCountries}
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

			{/* Loader */}
			<ActivityIndicator visible={isLoading || showLoader} />
		</Screen>
	);
}

export default LoginWithPhoneScreen;
