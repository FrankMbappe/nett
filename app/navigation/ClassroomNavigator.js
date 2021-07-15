import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ClassroomScreen from "../screens/ClassroomScreen/ClassroomScreen";
import { screens } from "./routes";
import PostCreationScreen from "../screens/PostCreationScreen/PostCreationScreen";
import QuizCreationScreen from "../screens/QuizCreationScreen/QuizCreationScreen";
import QACreationScreen from "../screens/QACreationScreen/QACreationScreen";
import QuizTakingScreen from "../screens/QuizTakingScreen/QuizTakingScreen";
import TutorialCreationScreen from "../screens/TutorialCreationScreen/TutorialCreationScreen";
import ImagePreviewScreen from "../screens/ImagePreviewScreen/ImagePreviewScreen";

const Stack = createStackNavigator();
const ClassroomNavigator = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name={screens.Classroom} component={ClassroomScreen} />
		<Stack.Screen name={screens.PostCreation} component={PostCreationScreen} />
		<Stack.Screen name={screens.QuizTaking} component={QuizTakingScreen} />
		<Stack.Screen name={screens.QuizCreation} component={QuizCreationScreen} />
		<Stack.Screen name={screens.QACreation} component={QACreationScreen} />
		<Stack.Screen
			name={screens.TutorialCreation}
			component={TutorialCreationScreen}
		/>
		<Stack.Screen name={screens.ImagePreview} component={ImagePreviewScreen} />
	</Stack.Navigator>
);

export default ClassroomNavigator;
