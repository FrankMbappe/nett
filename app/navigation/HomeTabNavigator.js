import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";

import HomeScreen from "../screens/HomeScreen/HomeScreen";
import NotificationsScreen from "../screens/NotificationsScreen/NotificationsScreen";
import colors from "../config/colors";
import { screens } from "./routes";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import images from "../config/images";
import useAuth from "../hooks/useAuth";

const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
	// Context
	const { currentUser } = useAuth();

	return (
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
			<Tab.Screen
				name={screens.Profile}
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Image
							style={{
								width: size * 1.05,
								height: size * 1.05,
								borderRadius: size * 0.525,
								borderWidth: 2,
								borderColor: color,
							}}
							uri={currentUser.picUri ?? images.USER_DEFAULT}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export default HomeTabNavigator;
