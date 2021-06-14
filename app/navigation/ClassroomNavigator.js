import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ClassroomScreen from "../screens/ClassroomScreen/ClassroomScreen";
import { screens } from "../config/navigators";

const Stack = createStackNavigator();
const ClassroomNavigator = ({ route: { params } }) => (
	<Stack.Navigator screenOptions={{ headerShown: false }} mode="modal">
		<Stack.Screen
			name={screens.Classroom}
			component={ClassroomScreen}
			initialParams={{ id: params.id }}
		/>
	</Stack.Navigator>
);

export default ClassroomNavigator;
