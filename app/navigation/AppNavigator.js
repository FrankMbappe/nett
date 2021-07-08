import React from "react";
import { navigators, screens } from "./routes";
import { createStackNavigator } from "@react-navigation/stack";
import HomeTabNavigator from "./HomeTabNavigator";
import ShowAllClassroomsScreen from "../screens/ShowAllClassroomsScreen.js/ShowAllClassroomsScreen";
import ShowAllEventsScreen from "../screens/ShowAllEventsScreen/ShowAllEventsScreen";
import ClassroomNavigator from "./ClassroomNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name={navigators.HomeTab} component={HomeTabNavigator} />
		<Stack.Screen
			name={screens.ShowAllClassrooms}
			component={ShowAllClassroomsScreen}
		/>
		<Stack.Screen
			name={screens.ShowAllEvents}
			component={ShowAllEventsScreen}
		/>
		<Stack.Screen name={navigators.Classroom} component={ClassroomNavigator} />
	</Stack.Navigator>
);

export default AppNavigator;
