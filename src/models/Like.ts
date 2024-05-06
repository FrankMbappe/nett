import Base from "./Base";
import { BasicUserProfile } from "./UserProfile";

export type LikeAuthor = BasicUserProfile;

export default interface Like extends Base {
  authorId: string;
  postId: string;
  commentId: string;
  author: LikeAuthor;
}
