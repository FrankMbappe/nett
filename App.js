import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTheme from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import ProfileEditionScreen from "./app/screens/ProfileEditionScreen/ProfileEditionScreen";

export default function App() {
	return (
		// <NavigationContainer theme={NavigationTheme}>
		// 	<AppNavigator />
		// 	{/* <AuthNavigator /> */}
		// </NavigationContainer>
		<ProfileEditionScreen />
	);
}
