import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import LoginWithPhoneScreen from "../screens/LoginWithPhoneNumberScreen/LoginWithPhoneScreen";
import PhoneNumberConfirmationScreen from "../screens/PhoneNumberConfirmationScreen/PhoneNumberConfirmation";
import AccountTypeSelectionScreen from "../screens/AccountTypeSelectionScreen/AccountTypeSelectionScreen";
import ProfileEditionScreen from "../screens/ProfileEditionScreen/ProfileEditionScreen";
import { navigators, screens } from "./routes";
import AppNavigator from "./AppNavigator";

const Stack = createStackNavigator();

const AuthNavigator = ({ userHasProfile = false }) => (
	<Stack.Navigator
		initialRouteName={userHasProfile ? screens.ProfileEdition : screens.Welcome}
		screenOptions={{ headerShown: false }}
	>
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
		<Stack.Screen name={navigators.App} component={AppNavigator} />
	</Stack.Navigator>
);

export default AuthNavigator;
