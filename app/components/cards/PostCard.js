import React from "react";
import { postTypes } from "../../config/enums";
import NormalPostCard from "./NormalPostCard";
import QuizPostCard from "./QuizPostCard";
import TutorialPostCard from "./TutorialPostCard";

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
	if (post._type === postTypes.quiz)
		return (
			<QuizPostCard
				quiz={post}
				currentUserId={currentUserId}
				style={style}
				onPress={onPress}
			/>
		);

	if (post._type === postTypes.tutorial)
		return (
			<TutorialPostCard
				tutorial={post}
				currentUserId={currentUserId}
				style={style}
				onPress={onPress}
			/>
		);

	return null;
}

export default PostCard;
