import React from "react";
import FileBundle from "./FileBundle";
import ImageBundle from "./ImageBundle";
import VideoBundle from "./VideoBundle";

function PostBundle({ file, downloadProgress = 1 }) {
	if (!file) return null;
	switch (file.type.toLowerCase()) {
		case "image":
			return <ImageBundle imageUri={file.uri} />;
		case "video":
			return <VideoBundle duration="10:00" />;
		default:
			return <FileBundle file={file} downloadProgress={downloadProgress} />;
	}
}

export default PostBundle;
