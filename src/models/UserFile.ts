import Base from "./Base";

export default interface UserFile extends Base {
  authorId?: string;
  mimeType: string;
  url: string;
  name: string;
  size: number;
  extension: string;
  publicCloudId: string;
}
