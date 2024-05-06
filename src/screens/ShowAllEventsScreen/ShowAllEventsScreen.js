import React from "react";

import ShowAllScreen from "../ShowAllScreen/ShowAllScreen";
import { ListItem } from "../../components/lists";
import Icon from "../../components/Icon";
import { capitalize, getEventProps } from "../../utils";

function ShowAllEventsScreen({ route: { params }, navigation }) {
	return (
		<ShowAllScreen
			items={params.data}
			icon="clock-outline"
			title="Events"
			useBackButton
			onPressBackButton={() => navigation.goBack()}
			renderItem={({ type, classroom, name, dateOpening, dateClosing }) => {
				const { backgroundColor, color, distanceToNow } = getEventProps(
					dateOpening,
					dateClosing
				);
				return (
					<ListItem
						usesChevron
						ImageComponent={
							<Icon
								name="clock-outline"
								backgroundColor={backgroundColor}
								iconColor={color}
								size={40}
							/>
						}
						name={`${capitalize(type)} in ${classroom}: ${name}`}
						description={distanceToNow}
						onPress={() => alert(classroom)}
						descriptionNumberOfLines={0}
						nameNumberOfLines={0}
					/>
				);
			}}
		/>
	);
}

export default ShowAllEventsScreen;
