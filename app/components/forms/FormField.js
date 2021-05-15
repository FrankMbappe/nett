import React from "react";
import { useFormikContext } from "formik";

import NettFormErrorLabel from "./FormErrorLabel";
import NettTextInput from "../TextInput";
import { View } from "react-native";

function NettFormField({ name, ...otherProps }) {
	const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

	return (
		<View style={[otherProps.fieldStyle, { marginBottom: 10 }]}>
			<NettTextInput
				onBlur={() => setFieldTouched(name)}
				onChangeText={handleChange(name)}
				{...otherProps}
			/>
			<NettFormErrorLabel
				style={{ marginTop: 10 }}
				error={errors[name]}
				visible={touched[name]}
			/>
		</View>
	);
}

export default NettFormField;
