import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";

import HomeScreen from "../screens/HomeScreen/HomeScreen";
import NotificationsScreen from "../screens/NotificationsScreen/NotificationsScreen";
import colors from "../config/colors";
import { screens } from "./routes";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import AuthContext from "../auth/context";
import images from "../config/images";

const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
	// Context
	const { currentUser } = useContext(AuthContext);

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
						<FastImage
							style={{
								width: size * 1.5,
								height: size * 1.5,
								borderRadius: size * 0.75,
								borderWidth: 2,
								borderColor: color,
							}}
							source={
								currentUser.picUri
									? { uri: currentUser.picUri }
									: images.USER_DEFAULT
							}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export default HomeTabNavigator;
