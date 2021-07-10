import { startsWith } from "lodash";
import React from "react";
import currentUser from "../config/test";
import { ImageBundle, VideoBundle } from "./cards/bundles";

function FileRenderer({ file }) {
	if (!file) return null;

	if (startsWith(file.mimetype, "image"))
		return <ImageBundle imageUri={currentUser.hostname + file.uri} />;

	if (startsWith(file.mimetype, "video"))
		return <VideoBundle duration="10:00" />;

	return null;
}

export default FileRenderer;
