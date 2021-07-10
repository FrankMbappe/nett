import React from "react";
import { ImageBundle, VideoBundle } from "./cards/bundles";

function FileRenderer({ file, type }) {
	if (!file || !type) return null;

	// TODO: Other file bundle (e.g, PDF)

	if (String(type).includes("image"))
		return <ImageBundle imageUri={file.uri} />;

	if (String(type).includes("video")) return <VideoBundle duration="10:00" />;

	return null;
}

export default FileRenderer;
