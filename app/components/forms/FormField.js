import React from "react";
import { useFormikContext } from "formik";

import NettFormErrorLabel from "./FormErrorLabel";
import NettTextInput from "../TextInput";

function NettFormField({ name, ...otherProps }) {
	const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

	return (
		<>
			<NettTextInput
				containerStyle={{ marginBottom: 10 }}
				onBlur={() => setFieldTouched(name)}
				onChangeText={handleChange(name)}
				{...otherProps}
			/>
			<NettFormErrorLabel
				style={{ marginBottom: 10 }}
				error={errors[name]}
				visible={touched[name]}
			/>
		</>
	);
}

export default NettFormField;
