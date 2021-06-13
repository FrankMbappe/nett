import React from "react";

import ShowAllScreen from "../ShowAllScreen/ShowAllScreen";

import { ListItem } from "../../components/lists";
import Icon from "../../components/Icon";

import { notifications, users } from "../../config/dummyData";
import colors from "../../config/colors";
import { formatDistanceToNowStrict } from "date-fns";

function NotificationsScreen(props) {
	return (
		<ShowAllScreen
			items={notifications}
			icon="bell-outline"
			fontSize={19}
			title="Notifications"
			renderItem={({ pushed, authorId, content }) => (
				<ListItem
					image={{ uri: users.find((x) => x.id === authorId).profile.picUri }}
					imageIsRounded
					name={content}
					description={formatDistanceToNowStrict(new Date(pushed), {
						addSuffix: true,
					})}
					onPress={() => alert(authorId)}
					nameNumberOfLines={5}
					descriptionNumberOfLines={3}
				/>
			)}
		/>
	);
}

export default NotificationsScreen;
