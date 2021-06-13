import React from "react";

import ShowAllScreen from "../ShowAllScreen/ShowAllScreen";

import { ListItem } from "../../components/lists";
import Icon from "../../components/Icon";

import { classrooms } from "../../config/dummyData";
import colors from "../../config/colors";

function ShowAllClassroomsScreen({ route: { params }, navigation }) {
	return (
		<ShowAllScreen
			items={params.data}
			icon="google-classroom"
			title="Classrooms"
			useBackButton
			onPressBackButton={() => navigation.goBack()}
			renderItem={({ name, participants }) => (
				<ListItem
					usesChevron
					ImageComponent={
						<Icon
							name="school-outline"
							backgroundColor={colors.okLight}
							iconColor={colors.ok}
							size={40}
						/>
					}
					name={name}
					description={`${participants.length} participants`}
					onPress={() => alert(JSON.stringify(participants))}
				/>
			)}
		/>
	);
}

export default ShowAllClassroomsScreen;
