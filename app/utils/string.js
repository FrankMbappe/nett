function capitalize(stringValue) {
	if (!stringValue || !stringValue instanceof String) return;
	return stringValue[0].toUpperCase().concat(stringValue.substr(1));
}

export { capitalize };
