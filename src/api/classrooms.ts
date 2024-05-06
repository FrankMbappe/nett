import apiClient from "./client";
import { lookup } from "react-native-mime-types";
import { basename } from "path";
import { postTypes } from "../config/enums";
import Classroom from "src/models/Classroom";

const endpoint = "/classrooms";

// Getting all classrooms
const getClassrooms = () => apiClient.get(endpoint);

// Getting a specific classroom by its ID
const getClassroom = (classroomId: string) =>
  apiClient.get<Classroom>(`${endpoint}/${classroomId}`);

// Adding a post to a classroom
const addPost = (
  {
    classroomId,
    file,
    text,
  }: {
    classroomId: string;
    file: {
      createdAt: Date;
      publicCloudId: string;
      url: string;
      mimeType: string;
      name: string;
      extension: string;
      size: number;
    };
    text: string;
  },
  onUploadProgress: (progress: number) => void
) => {
  const data = new FormData();
  data.append("_type", "normal"); // Post types (Tutorial, Quiz, Normal)
  if (text && text.length > 0) data.append("text", text);
  if (file) {
    const mimetype = lookup(file.url);

    if (mimetype)
      data.append("_file", {
        name: basename(file.url),
        type: mimetype,
        url: file.url,
      });
  }

  return apiClient.post(`${endpoint}/${classroomId}/posts`, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

// Adding a comment to a post in a classroom
const addComment = ({
  classroomId,
  postId,
  text,
}: {
  classroomId: string;
  postId: string;
  text: string;
}) => {
  const data = { text };
  return apiClient.post(
    `${endpoint}/${classroomId}/posts/${postId}/comments`,
    data
  );
};

// Adding a quiz to a classroom
const addQuiz = (
  {
    classroomId,
    title,
    description,
    dateOpening,
    dateClosing,
    hasTimeInterval,
    qas,
    isDeterministic,
  },
  onUploadProgress
) => {
  const data = {
    _type: postTypes.quiz,
    title,
    description: description ?? undefined,
    qas,
    hasTimeInterval,
    dateOpening: dateOpening ?? undefined,
    dateClosing: dateClosing ?? undefined,
    isDeterministic,
  };

  return apiClient.post(`${endpoint}/${classroomId}/quizzes`, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

// Adding a Tutorial to a classroom
const addTutorial = (
  classroomId,
  { title, description, steps },
  onUploadProgress
) => {
  const data = new FormData();

  data.append("_type", postTypes.tutorial);
  data.append("title", title);
  steps.forEach((step) => {
    // Steps and their videos are now two different fields
    // Step
    data.append("steps", {
      position: step.position,
      title: step.title,
      description: step.description ?? undefined,
    });
    // Its video
    data.append("videos", {
      name: basename(step.video.uri),
      type: lookup(step.video.uri), // mimetype
      uri: step.video.uri,
    });
  });
  if (description) data.append("description", description);

  return apiClient.post(`${endpoint}/${classroomId}/tutorials`, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  getClassrooms,
  getClassroom,
  addPost,
  addComment,
  addQuiz,
  addTutorial,
};
