import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import LoginWithPhoneScreen from "../screens/LoginWithPhoneNumberScreen/LoginWithPhoneScreen";
import PhoneNumberConfirmationScreen from "../screens/PhoneNumberConfirmationScreen/PhoneNumberConfirmation";
import AccountTypeSelectionScreen from "../screens/AccountTypeSelectionScreen/AccountTypeSelectionScreen";
import ProfileEditionScreen from "../screens/ProfileEditionScreen/ProfileEditionScreen";
import { screens } from "./routes";

const Stack = createStackNavigator();
const AuthNavigator = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name={screens.Welcome} component={WelcomeScreen} />
		<Stack.Screen
			name={screens.LoginWithPhoneNumber}
			component={LoginWithPhoneScreen}
		/>
		<Stack.Screen
			name={screens.PhoneNumberConfirmation}
			component={PhoneNumberConfirmationScreen}
		/>
		<Stack.Screen
			name={screens.AccountTypeSelection}
			component={AccountTypeSelectionScreen}
		/>
		<Stack.Screen
			name={screens.ProfileEdition}
			component={ProfileEditionScreen}
		/>
	</Stack.Navigator>
);

export default AuthNavigator;
