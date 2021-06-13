import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountTypeSelectionScreen from "./app/screens/AccountTypeSelectionScreen/AccountTypeSelectionScreen";
import HomeScreen from "./app/screens/HomeScreen/HomeScreen";
import LoginWithPhoneScreen from "./app/screens/LoginWithPhoneNumberScreen/LoginWithPhoneScreen";
import NotificationsScreen from "./app/screens/NotificationsScreen/NotificationsScreen";
import PhoneNumberConfirmation from "./app/screens/PhoneNumberConfirmationScreen/PhoneNumberConfirmation";
import ProfileEditionScreen from "./app/screens/ProfileEditionScreen/ProfileEditionScreen";

import colors from "./app/config/colors";
import { screens, tabNavigators } from "./app/config/navigators";
import WelcomeScreen from "./app/screens/WelcomeScreen/WelcomeScreen";

const StartupStack = createStackNavigator();
const StartupStackNavigator = () => (
	<StartupStack.Navigator screenOptions={{ headerShown: false }}>
		<StartupStack.Screen
			name={screens.LoginWithPhoneNumber}
			component={LoginWithPhoneScreen}
		/>
		<StartupStack.Screen
			name={screens.PhoneNumberConfirmation}
			component={PhoneNumberConfirmation}
		/>
		<StartupStack.Screen
			name={screens.AccountTypeSelection}
			component={AccountTypeSelectionScreen}
		/>
		<StartupStack.Screen
			name={screens.ProfileEdition}
			component={ProfileEditionScreen}
		/>
		<StartupStack.Screen
			name={tabNavigators.Home}
			component={HomeTabNavigator}
		/>
	</StartupStack.Navigator>
);

const HomeTab = createBottomTabNavigator();
const HomeTabNavigator = () => (
	<HomeTab.Navigator
		tabBarOptions={{
			keyboardHidesTabBar: true,
			activeTintColor: colors.appPrimary,
			inactiveTintColor: colors.mediumLight,
		}}
	>
		<HomeTab.Screen
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
		<HomeTab.Screen
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
	</HomeTab.Navigator>
);

export default function App() {
	// return <LoginWithPhoneScreen />;
	// return <PhoneNumberConfirmation phone={"+237656895348"} />;
	// return <AccountTypeSelection />;
	// return <UserChatListScreen />;
	// return categoryPickerExample();
	// return <ProfileEditionScreen />;
	// return birthDatePicker();
	// return <HomeScreen />;
	// return showAllScreemExample;
	// return <PostCreationScreen author={me} classroom={classrooms[0]} />;
	//
	// return (
	// 	<QuizTakingScreen
	// 		author={me}
	// 		classroomName={classrooms[0].name}
	// 		{...quizzes[0]}
	// 	/>
	// );
	//
	// return <QACreationScreen />;
	// return <QuizCreationScreen />;
	// return <ClassroomScreen classroom={classrooms[0]} />;
	// return (
	// 	<NavigationContainer>
	// 		<StartupStackNavigator />
	// 	</NavigationContainer>
	// );
	return <WelcomeScreen />;
}
