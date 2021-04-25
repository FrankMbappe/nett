import React from "react";
import { useFormikContext } from "formik";

import NettFormErrorLabel from "./NettFormErrorLabel";
import NettTextInput from "../NettTextInput";

function NettFormField({ name, ...otherProps }) {
	const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

	return (
		<>
			<NettTextInput
				containerStyle={{ marginVertical: 10 }}
				onBlur={() => setFieldTouched(name)}
				onChangeText={handleChange(name)}
				{...otherProps}
			/>
			<NettFormErrorLabel
				style={{ marginBottom: 15 }}
				error={errors[name]}
				visible={touched[name]}
			/>
		</>
	);
}

export default NettFormField;
