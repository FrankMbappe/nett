import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NotificationsScreen from "../screens/NotificationsScreen/NotificationsScreen";
import colors from "../config/colors";
import { screens } from "./routes";
import HomeNavigator from "./HomeNavigator";

const Tab = createBottomTabNavigator();
const AppNavigator = () => (
	<Tab.Navigator
		tabBarOptions={{
			keyboardHidesTabBar: true,
			activeTintColor: colors.appPrimary,
			inactiveTintColor: colors.mediumLight,
		}}
	>
		<Tab.Screen
			name={screens.Home}
			component={HomeNavigator}
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
		<Tab.Screen
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
	</Tab.Navigator>
);

export default AppNavigator;
