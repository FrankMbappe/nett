import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AuthNavigator from "./app/navigation/AuthNavigator";
import HomeScreen from "./app/screens/HomeScreen/HomeScreen";
import NotificationsScreen from "./app/screens/NotificationsScreen/NotificationsScreen";

import { screens } from "./app/navigation/routes";
import colors from "./app/config/colors";
import NavigationTheme from "./app/navigation/NavigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
	return (
		<NavigationContainer theme={NavigationTheme}>
			<AppNavigator />
		</NavigationContainer>
	);
}
