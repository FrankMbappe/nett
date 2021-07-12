import React from "react";
import { postTypes } from "../../config/enums";
import NormalPostCard from "./NormalPostCard";

function PostCard({
	// Data
	currentUserId,
	post,

	// UI
	style,
	onPress,
	...otherProps
}) {
	if (!post && !post._type) return null;

	if (post._type === postTypes.normal)
		return (
			<NormalPostCard
				post={post}
				currentUserId={currentUserId}
				onLike={otherProps.onLike}
				onShare={otherProps.onShare}
				onPublishComment={otherProps.onPublishComment}
				style={style}
				onPress={onPress}
			/>
		);
}

export default PostCard;
