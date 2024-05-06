import React from "react";
import { View } from "react-native";

import styles from "./styles";
import Screen from "../../components/Screen";
import { Image } from "react-native-expo-image-cache";
import StartTitle from "../../components/start/Title";
import NettButton from "../../components/Button";

import { screens } from "../../navigation/routes";

function ImagePreviewScreen({ navigation, route }) {
	const { uri } = route.params;
	return (
		<Screen style={styles.screen}>
			<Image style={styles.image} uri={uri} tint="dark" />
		</Screen>
	);
}

export default ImagePreviewScreen;
