import React from "react";
import {
	Button,
	Image,
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

function LoginWithPhoneScreen(props) {
	return (
		<SafeAreaView style={styles.container}>
			{/* --- Main Box --- */}
			<View style={styles.mainBox}>
				{/* Title */}
				<View style={styles.titleContainer}>
					<Image
						source={require("../assets/icon.png")}
						style={{ width: 75, height: 75 }}
					/>
					<Text style={styles.textTitle}>Enter your phone number</Text>
				</View>

				{/* Input */}
				<View style={styles.inputContainer}>
					<Text style={styles.importantText}>+237</Text>
					<TextInput
						style={styles.textInput}
						placeholder={"Your phone number"}
					/>
				</View>

				{/* Description */}
				<Text style={styles.tinyDescription}>
					Phone numbers are used to register and log into Nett accounts. After
					entering yours, we will send you a confirmation message to verify it.
				</Text>
			</View>

			{/* --- Bottom bar --- */}
			<View style={styles.bottomBar}>
				<Button title={"CANCEL"} />
				<Button title={"NEXT"} />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 5,
		paddingVertical: 10,
	},
	mainBox: {
		alignItems: "center",
		justifyContent: "center",
		width: "85%",
		borderColor: "blue",
		borderWidth: 0,
		bottom: "10%",
	},
	titleContainer: { alignItems: "center", width: "50%" },
	inputContainer: {
		borderColor: "red",
		borderWidth: 0,
		width: "100%",
		flexDirection: "row",
		marginTop: "10%",
	},
	importantText: {
		fontWeight: "bold",
		fontSize: 22,
		padding: 10,
	},
	textInput: {
		backgroundColor: "#eee",
		flex: 1,
		paddingStart: 15,
		paddingEnd: 15,
		fontSize: 20,
	},
	tinyDescription: {
		color: "grey",
		marginTop: "7%",
		textAlign: "center",
	},
	bottomBar: {
		position: "absolute",
		bottom: 0,
		padding: 25,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		borderColor: "green",
		borderWidth: 0,
	},
	textTitle: {
		fontFamily: "Roboto",
		fontWeight: "bold",
		fontSize: 24,
		textAlign: "center",
		paddingTop: "15%",
	},
});

export default LoginWithPhoneScreen;
