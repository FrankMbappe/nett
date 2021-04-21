import React from "react";
import { View, StyleSheet } from "react-native";
import OptionCard from "../OptionCard";

function OptionCardSelector({ style, options }) {
	return (
		<View style={[styles.selector, style]}>
			{options.map(({ icon, name, description }, key) => (
				<OptionCard icon={icon} name={name} description={description} />
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	selector: {},
});

export default OptionCardSelector;
