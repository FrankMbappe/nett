import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screens } from "../config/navigators";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ShowAllClassroomsScreen from "../screens/ShowAllClassroomsScreen.js/ShowAllClassroomsScreen";
import ShowAllEventsScreen from "../screens/ShowAllEventsScreen/ShowAllEventsScreen";

const Stack = createStackNavigator();
const HomeNavigator = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name={screens.Home} component={HomeScreen} />
		<Stack.Screen
			name={screens.ShowAllClassrooms}
			component={ShowAllClassroomsScreen}
		/>
		<Stack.Screen
			name={screens.ShowAllEvents}
			component={ShowAllEventsScreen}
		/>
	</Stack.Navigator>
);

export default HomeNavigator;
