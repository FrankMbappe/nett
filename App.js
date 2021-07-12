import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import NavigationTheme from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { StatusBar } from "expo-status-bar";
import colors from "./app/config/colors";

export default function App() {
	return (
		<RootSiblingParent>
			<NavigationContainer theme={NavigationTheme}>
				<AppNavigator />
				{/* <AuthNavigator /> */}
			</NavigationContainer>
			<StatusBar backgroundColor={colors.appPrimaryDark} style="light" />
		</RootSiblingParent>
	);
}
