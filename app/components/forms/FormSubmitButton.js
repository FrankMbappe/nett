import React from "react";
import { useFormikContext } from "formik";

import NettButton from "../Button";

function NettFormSubmitButton({ text, style }) {
	const { handleSubmit } = useFormikContext();
	return (
		<NettButton
			style={[{ width: "100%" }, style]}
			text={text}
			onPress={handleSubmit}
		/>
	);
}

export default NettFormSubmitButton;
