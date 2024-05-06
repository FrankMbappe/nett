import apiClient from "./client";
import { basename } from "path";
import { lookup } from "react-native-mime-types";
import User from "src/models/User";
import UserProfile from "src/models/UserProfile";

const endpoint = "/users";

async function setProfile(
  input: Required<
    Pick<
      UserProfile,
      "picUrl" | "firstName" | "lastName" | "email" | "birthDate"
    >
  >,
  onUploadProgress: (progress: number) => void
) {
  let mimetype = !!input.picUrl ? lookup(input.picUrl) : "";

  const result = await apiClient.post(
    `${endpoint}/me/profile`,
    {
      ...input,
      ...(!!mimetype && {
        picUrl: {
          name: basename(input.picUrl),
          type: mimetype,
          url: input.picUrl,
        },
      }),
    },
    {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    }
  );

  return result;
}

async function setUserCategory(category: User["category"]) {
  return await apiClient.put(`${endpoint}/category`, category);
}

export default {
  setProfile,
  setUserCategory,
};
