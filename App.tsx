import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import NavigationTheme from "src/navigation/NavigationTheme";
import AppLoading from "expo-app-loading";
import AppNavigator from "src/navigation/AppNavigator";
import AuthNavigator from "src/navigation/AuthNavigator";
import { StatusBar } from "expo-status-bar";
import colors from "src/config/colors";
import OfflineNotice from "src/components/OfflineNotice";
import AuthContext from "src/auth/context";
import authStorage from "src/auth/storage";
import { Alert, BackHandler } from "react-native";
import has from "lodash/has";
import User from "src/models/User";

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>();
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
            "Something went wrong while opening Nett",
            "If the problem persists, try to reinstall the app.",
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
