import React, { useState } from "react";
import { View } from "react-native";
import usersApi from "../../api/users";

import ListItemSelector from "../../components/start/ListItemSelector";
import NettButton from "../../components/Button";
import Screen from "../../components/Screen";
import StartTitle from "../../components/start/Title";
import { buttons } from "../../config/enums";
import images from "../../config/images";
import styles from "./styles";
import { screens } from "../../navigation/routes";
import Toast from "react-native-root-toast";
import { capitalize } from "lodash-es";
import colors from "../../config/colors";
import useAuth from "../../hooks/useAuth";

// --- CONSTANTS --- //
const OPTIONS = [
  {
    key: "teacher",
    image: images.TEACHER_ACCOUNT,
    name: "Teacher",
    description: "Create classrooms and lecture your courses to students.",
  },
  {
    key: "student",
    image: images.STUDENT_ACCOUNT,
    name: "Student",
    description: "Join classrooms and attend courses made by your teachers.",
  },
  {
    key: "consultant",
    image: images.CONSULT_ACCOUNT,
    name: "Consultant",
    description: "Share your knowledge with the world via classrooms.",
  },
];

// --- SCREEN --- //
function AccountTypeSelectionScreen({ navigation }) {
  // Context
  const authContext = useAuth();

  // States
  const [selectedType, setSelectedType] = useState();

  // Action handlers
  const handleSubmit = async () => {
    if (!selectedType.key) return;

    // I attempt to set the account type
    const result = await usersApi.setUserCategory(selectedType.key);

    if (!result)
      return Toast.show(
        "Something went wrong while updating the account type, please try again..",
        { backgroundColor: colors.danger }
      );

    // Success
    const { authToken } = result.data;
    console.log(authToken);
    // The current user is updated using the JWT token
    authContext.logIn(authToken);

    Toast.show(
      `The account type has been succesfully set to ${
        (capitalize(selectedType.key), { backgroundColor: colors.ok })
      }`
    );
    navigation.navigate(screens.ProfileEdition);
  };

  return (
    <Screen style={styles.screen}>
      {/* --- Main Box --- */}
      <View style={styles.mainContainer}>
        {/* Title */}
        <StartTitle style={styles.titleContainer}>
          Which kind of account would you like to create ?
        </StartTitle>

        {/* Account type selection */}
        <ListItemSelector
          onSelectOption={(option) => setSelectedType(option)}
          options={OPTIONS}
          selectedOption={selectedType}
          selectedStyle={{
            backgroundColor: "#ffeae8",
            borderColor: "#f5c8c4",
          }}
          style={styles.typeSelector}
        />
      </View>

      {/* --- Bottom bar --- */}
      <View style={styles.bottomBar}>
        <NettButton
          disabled={!selectedType}
          onPress={handleSubmit}
          text="Next"
          type={buttons.PRIMARY}
        />
      </View>
    </Screen>
  );
}

export default AccountTypeSelectionScreen;
