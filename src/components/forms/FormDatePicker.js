import React from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import DatePicker from "../DatePicker";
import NettFormErrorLabel from "./FormErrorLabel";

function FormDatePicker({ name, dateValue, fontSize, containerStyle }) {
	const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

	return (
		<View style={[styles.container, containerStyle]}>
			<DatePicker
				label={name}
				fontSize={fontSize}
				dateValue={dateValue}
				onPress={() => setFieldTouched(name)}
				onChangeDate={(date) => handleChange(date)}
			/>
			<NettFormErrorLabel
				style={{ marginTop: 10 }}
				error={errors[name]}
				visible={touched[name]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default FormDatePicker;
