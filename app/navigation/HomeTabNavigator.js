import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen/HomeScreen";
import NotificationsScreen from "../screens/NotificationsScreen/NotificationsScreen";
import colors from "../config/colors";
import { screens } from "./routes";

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => (
	<Tab.Navigator
		tabBarOptions={{
			keyboardHidesTabBar: true,
			activeTintColor: colors.appPrimary,
			inactiveTintColor: colors.mediumLight,
		}}
	>
		<Tab.Screen
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

export default HomeTabNavigator;
