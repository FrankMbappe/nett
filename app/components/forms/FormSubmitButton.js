import React from "react";
import { useFormikContext } from "formik";

import NettButton from "../Button";

function NettFormSubmitButton({ text, style, ...otherProps }) {
	const { handleSubmit } = useFormikContext();
	return (
		<NettButton
			style={[{ width: "100%" }, style]}
			text={text}
			onPress={handleSubmit}
			{...otherProps}
		/>
	);
}

export default NettFormSubmitButton;
