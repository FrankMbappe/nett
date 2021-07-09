import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import NavigationTheme from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
	return (
		<RootSiblingParent>
			<NavigationContainer theme={NavigationTheme}>
				{/* <AppNavigator /> */}
				<AuthNavigator />
			</NavigationContainer>
		</RootSiblingParent>
	);
}
