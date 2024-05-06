import { PostCategoryEnum } from "src/utils/enums";
import Base from "./Base";
import UserFile from "./UserFile";
import Topic from "./Topic";
import { BasicUserProfile } from "./UserProfile";

export type PostCategory = `${PostCategoryEnum}`;
export type PostAuthor = BasicUserProfile;

export default interface Post extends Base {
  classroomId: string;
  authorId: string;
  author: PostAuthor;
  category: PostCategory;
  text?: string;
  file?: UserFile;
  likesCount: number;
  commentsCount: number;
  topics: Topic[];
  viewerIds: string[];
}
