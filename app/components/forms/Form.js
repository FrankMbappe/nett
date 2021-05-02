import React from "react";
import { Formik } from "formik";

function NettForm({ initialValues, onSubmit, validationSchema, children }) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{() => <>{children}</>}
		</Formik>
	);
}

export default NettForm;
