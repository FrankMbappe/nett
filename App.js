import React from "react";
import LoginWithPhoneScreen from "./app/screens/LoginWithPhoneNumberScreen/LoginWithPhoneScreen";
import PhoneNumberConfirmation from "./app/screens/PhoneNumberConfirmationScreen/PhoneNumberConfirmation";
import AccountTypeSelection from "./app/screens/AccountTypeSelectionScreen/AccountTypeSelectionScreen";
import UserChatListScreen from "./app/screens/UserChatListScreen/UserChatListScreen";

export default function App() {
	// return <LoginWithPhoneScreen />;
	// return <PhoneNumberConfirmation phone={"+237656895348"} />;
	return <AccountTypeSelection />;
	// return <UserChatListScreen />;
}
