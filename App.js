import React, { useEffect, useState } from "react";
import LoginWithPhoneScreen from "./app/screens/LoginWithPhoneNumberScreen/LoginWithPhoneScreen";
import PhoneNumberConfirmation from "./app/screens/PhoneNumberConfirmationScreen/PhoneNumberConfirmation";
import AccountTypeSelection from "./app/screens/AccountTypeSelectionScreen/AccountTypeSelectionScreen";
import UserChatListScreen from "./app/screens/UserChatListScreen/UserChatListScreen";
import Screen from "./app/components/Screen";
import NettPicker from "./app/components/Picker";
import NettTextInput from "./app/components/TextInput";
import ProfileEditionScreen from "./app/screens/ProfileEditionScreen/ProfileEditionScreen";
import { Dimensions, FlatList, ScrollView, View } from "react-native";
import NettText from "./app/components/Text";
import HomeScreen from "./app/screens/HomeScreen/HomeScreen";
import countryCodes from "./app/config/countryCodes";
import { ListItemSeparator } from "./app/components/lists";

//#region Testing Picker with dummy data

// const categories = [
// 	{ label: "Furniture", value: 1 },
// 	{ label: "Clothing", value: 2 },
// 	{ label: "Cameras", value: 3 },
// ];

// const categoryPickerExample = () => {
// 	const [category, setCategory] = useState(categories[0].label);
// 	const [codes, setCodes] = useState(countryCodes);
// 	const [search, setSearch] = useState("");

// 	return (
// 		<Screen>
// 			<NettPicker
// 				items={categories}
// 				selectedItem={category}
// 				onSelectItem={(item) => setCategory(item.label)}
// 				icon={"apps"}
// 				fontSize={15}
// 				placeholder={"Category"}
// 			/>
// 			<FlatList
// 				style={{
// 					flex: 1,
// 				}}
// 				ListHeaderComponent={
// 					<NettTextInput
// 						icon="magnify"
// 						fontSize={15}
// 						placeholder="Search..."
// 						onChangeText={(s) => {
// 							setSearch(s);
// 							setCodes(
// 								countryCodes
// 									.slice()
// 									.sort((x, y) => x.name.localeCompare(y.name))
// 									.filter((x) => x.name.toLowerCase().includes(s.toLowerCase()))
// 							);
// 						}}
// 					/>
// 				}
// 				data={codes}
// 				keyExtractor={(item) => item.code}
// 				ItemSeparatorComponent={ListItemSeparator}
// 				renderItem={({ item }) => (
// 					<View
// 						style={{
// 							flexDirection: "row",
// 							padding: 10,
// 						}}
// 					>
// 						<NettText
// 							style={{ flex: 1 }}
// 						>{`${item.flag}  ${item.name}`}</NettText>
// 						<NettText>{`${item.dial_code}`}</NettText>
// 					</View>
// 				)}
// 			/>
// 		</Screen>
// 	);
// };

//#endregion

//#region  Testing DatePicker with dummy data
// let days = [];
// let years = [];

// for (let i = 1; i <= 31; i++) {
// 	days.push(i.toString().padStart(2, "0"));
// }
// for (let i = 1900; i <= new Date().getFullYear(); i++) {
// 	years.push(i.toString());
// }

// const width = Dimensions.get("window").width;
// const interval = width - 128;

// // Birth date picker
// const birthDatePicker = () => {
// 	const [currentIndex, setCurrentIndex] = useState(0);

// 	return (
// 		<Screen>
// 			<FlatList
// 				data={days}
// 				contentContainerStyle={{
// 					backgroundColor: "white",
// 					alignItems: "center",
// 				}}
// 				decelerationRate={"fast"}
// 				// snapToInterval={265}
// 				snapToInterval={interval}
// 				onScroll={(event) => {
// 					const contentOffsetX = event.nativeEvent.contentOffset.x;
// 					setCurrentIndex(Math.floor(contentOffsetX / (interval - 1)));
// 				}}
// 				snapToAlignment={"center"}
// 				horizontal
// 				keyExtractor={(item) => days.indexOf(item).toString()}
// 				renderItem={(item) => (
// 					<NettText
// 						style={{
// 							fontSize: 100,
// 							paddingHorizontal: 75,
// 							borderWidth: 1,
// 							borderColor: "white",
// 							color: item.index === currentIndex ? "black" : "grey",
// 							marginStart: item.index === 0 ? 55 : 0,
// 							marginEnd: item.index === days.length - 1 ? 55 : 0,
// 						}}
// 					>
// 						{item.item}
// 					</NettText>
// 				)}
// 			/>
// 			<FlatList
// 				data={moment.months()}
// 				horizontal
// 				keyExtractor={(item) => moment.months().indexOf(item).toString()}
// 				renderItem={(item) => (
// 					<NettText style={{ fontSize: 60, marginEnd: 25 }}>
// 						{item.item}
// 					</NettText>
// 				)}
// 			/>
// 			<FlatList
// 				data={years}
// 				horizontal
// 				keyExtractor={(item) => years.indexOf(item).toString()}
// 				renderItem={(item) => (
// 					<NettText style={{ fontSize: 90, marginEnd: 25 }}>
// 						{item.item}
// 					</NettText>
// 				)}
// 			/>
// 		</Screen>
// 	);
// };
//#endregion

export default function App() {
	// return <LoginWithPhoneScreen />;
	// return <PhoneNumberConfirmation phone={"+237656895348"} />;
	// return <AccountTypeSelection />;
	// return <UserChatListScreen />;
	// return categoryPickerExample();
	// return <ProfileEditionScreen />;
	return <HomeScreen />;
	// return birthDatePicker();
}
