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
import ProfileEditionScreen from "./app/screens/ProfileEditionScreen/ProfileEditionScreen";
import authStorage from "./app/auth/storage";

export default function App() {
	const [currentUser, setCurrentUser] = useState();
	const [isReady, setIsReady] = useState(false);
	const [hasProfile, setHasProfile] = useState(false);

	const restoreCurrentUser = async () => {
		const currentUser = await authStorage.getCurrentUser();

		if (currentUser) {
			setCurrentUser(currentUser);
			setHasProfile(currentUser.profile !== null);
		}
	};

	if (!isReady)
		return (
			<AppLoading
				startAsync={restoreCurrentUser}
				onFinish={() => setIsReady(true)}
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
							<ProfileEditionScreen />
						)
					) : (
						<AuthNavigator />
					)}
				</NavigationContainer>
				<StatusBar backgroundColor={colors.appPrimaryDark} style="light" />
			</AuthContext.Provider>
			<OfflineNotice />
		</RootSiblingParent>
	);
}
