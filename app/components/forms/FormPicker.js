import React from "react";
import { useFormikContext } from "formik";
import NettPicker from "../Picker";

function NettFormPicker({ items, name, placeholder, ...otherProps }) {
	const { setFieldValue, values, errors, touched } = useFormikContext();

	return (
		<>
			<NettPicker
				items={items}
				placeholder={placeholder}
				selectedItem={values[name]}
				onSelectItem={(item) => setFieldValue(name, item)}
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

export default NettFormPicker;
