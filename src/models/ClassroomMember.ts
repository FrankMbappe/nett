import { ClassromMemberRoleEnum } from "src/utils/enums";
import { BasicUserProfile } from "./UserProfile";

export type ClassroomMemberRole = `${ClassromMemberRoleEnum}`;

export default interface ClassroomMember extends BasicUserProfile {
  joinedAt: Date;
  userId: string;
  role: ClassroomMemberRole;
}
