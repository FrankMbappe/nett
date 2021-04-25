import React, { useState } from "react";
import LoginWithPhoneScreen from "./app/screens/LoginWithPhoneNumberScreen/LoginWithPhoneScreen";
import PhoneNumberConfirmation from "./app/screens/PhoneNumberConfirmationScreen/PhoneNumberConfirmation";
import AccountTypeSelection from "./app/screens/AccountTypeSelectionScreen/AccountTypeSelectionScreen";
import UserChatListScreen from "./app/screens/UserChatListScreen/UserChatListScreen";
import Screen from "./app/components/Screen";
import NettPicker from "./app/components/NettPicker";
import NettTextInput from "./app/components/NettTextInput";
import ProfileEditionScreen from "./app/screens/ProfileEditionScreen/ProfileEditionScreen";

const categories = [
	{ label: "Furniture", value: 1 },
	{ label: "Clothing", value: 2 },
	{ label: "Cameras", value: 3 },
];
const categoryPickerExample = () => {
	const [category, setCategory] = useState(categories[0].label);

	return (
		<Screen>
			<NettPicker
				items={categories}
				selectedItem={category}
				onSelectItem={(item) => setCategory(item.label)}
				icon={"apps"}
				fontSize={15}
				placeholder={"Category"}
			/>
			<NettTextInput
				icon={"email"}
				placeholder={"E-mail address"}
				fontSize={15}
			/>
		</Screen>
	);
};

export default function App() {
	// return <LoginWithPhoneScreen />;
	// return <PhoneNumberConfirmation phone={"+237656895348"} />;
	// return <AccountTypeSelection />;
	// return <UserChatListScreen />;
	// return categoryPickerExample();
	return <ProfileEditionScreen />;
}
