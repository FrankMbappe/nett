import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ClassroomScreen from "../screens/ClassroomScreen/ClassroomScreen";
import { screens } from "./routes";
import PostCreationScreen from "../screens/PostCreationScreen/PostCreationScreen";
import QuizCreationScreen from "../screens/QuizCreationScreen/QuizCreationScreen";
import QACreationScreen from "../screens/QACreationScreen/QACreationScreen";
import QuizTakingScreen from "../screens/QuizTakingScreen/QuizTakingScreen";

const Stack = createStackNavigator();
const ClassroomNavigator = ({ route: { params } }) => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen
			name={screens.Classroom}
			component={ClassroomScreen}
			initialParams={{ classroomId: params.classroomId }}
		/>
		<Stack.Screen name={screens.PostCreation} component={PostCreationScreen} />
		<Stack.Screen name={screens.QuizTaking} component={QuizTakingScreen} />
		<Stack.Screen name={screens.QuizCreation} component={QuizCreationScreen} />
		<Stack.Screen name={screens.QACreation} component={QACreationScreen} />
	</Stack.Navigator>
);

export default ClassroomNavigator;
