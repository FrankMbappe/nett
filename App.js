import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AuthNavigator from "./app/navigation/AuthNavigator";
import HomeScreen from "./app/screens/HomeScreen/HomeScreen";
import NotificationsScreen from "./app/screens/NotificationsScreen/NotificationsScreen";

import { screens } from "./app/config/navigators";
import colors from "./app/config/colors";

const HomeTab = createBottomTabNavigator();
const HomeTabNavigator = () => (
	<HomeTab.Navigator
		tabBarOptions={{
			keyboardHidesTabBar: true,
			activeTintColor: colors.appPrimary,
			inactiveTintColor: colors.mediumLight,
		}}
	>
		<HomeTab.Screen
			name={screens.Home}
			component={HomeScreen}
			options={{
				tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons
						name="home"
						size={size * 1.05}
						color={color}
					/>
				),
			}}
		/>
		<HomeTab.Screen
			name={screens.Notifications}
			component={NotificationsScreen}
			options={{
				tabBarIcon: ({ color, size }) => (
					<MaterialCommunityIcons
						name="bell"
						size={size * 1.05}
						color={color}
					/>
				),
			}}
		/>
	</HomeTab.Navigator>
);

export default function App() {
	return (
		<NavigationContainer>
			<AuthNavigator />
		</NavigationContainer>
	);
}
