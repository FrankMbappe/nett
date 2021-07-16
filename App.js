import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import NavigationTheme from "./app/navigation/NavigationTheme";
import AppLoading from "expo-app-loading";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { StatusBar } from "expo-status-bar";
import colors from "./app/config/colors";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { Alert, BackHandler } from "react-native";
import { has } from "lodash-es";

export default function App() {
	const [currentUser, setCurrentUser] = useState();
	const [isReady, setIsReady] = useState(false);
	const [hasProfile, setHasProfile] = useState(false);

	const restoreCurrentUser = async () => {
		const currentUser = await authStorage.getCurrentUser();

		if (currentUser) {
			setCurrentUser(currentUser);
			setHasProfile(has(currentUser, "profile"));
		}
	};

	if (!isReady)
		return (
			<AppLoading
				startAsync={restoreCurrentUser}
				onFinish={() => setIsReady(true)}
				onError={() => {
					Alert.alert(
						"Something went wrong while opening Nett, please reload." +
							" If the problem persists, try to reinstall the app.",
						[{ text: "Ok", onPress: () => BackHandler.exitApp() }]
					);
				}}
			/>
		);

	return (
		<RootSiblingParent>
			<AuthContext.Provider value={{ currentUser, setCurrentUser }}>
				<NavigationContainer theme={NavigationTheme}>
					{currentUser ? (
						hasProfile ? (
							<AppNavigator />
						) : (
							<AuthNavigator userIsLoggedIn={true} />
						)
					) : (
						<AuthNavigator userIsLoggedIn={false} />
					)}
				</NavigationContainer>
				<StatusBar backgroundColor={colors.appPrimaryDark} style="light" />
			</AuthContext.Provider>
			<OfflineNotice />
		</RootSiblingParent>
	);
}
