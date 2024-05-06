import Base from "./Base";
import { BasicUserProfile } from "./UserProfile";

export type CommentAuthor = BasicUserProfile;

export default interface Comment extends Base {
  authorId: string;
  author: CommentAuthor;
  postId: string;
  text: string;
  likesCount: number;
}
