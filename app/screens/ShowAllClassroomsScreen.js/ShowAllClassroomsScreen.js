import React from "react";

import { ListItem } from "../../components/lists";
import { screens } from "../../navigation/routes";
import ShowAllScreen from "../ShowAllScreen/ShowAllScreen";
import Icon from "../../components/Icon";
import colors from "../../config/colors";

function ShowAllClassroomsScreen({ route, navigation }) {
	// Getting params
	const { data } = route.params;

	return (
		<ShowAllScreen
			items={data}
			icon="google-classroom"
			title="Classrooms"
			useBackButton
			onPressBackButton={() => navigation.goBack()}
			renderItem={({ _id, name, participations }) => (
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
					description={`${participations.length} participants`}
					onPress={() =>
						navigation.navigate(screens.Classroom, { classroomId: _id })
					}
				/>
			)}
		/>
	);
}

export default ShowAllClassroomsScreen;
