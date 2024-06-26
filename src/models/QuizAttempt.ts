import Base from "./Base";
import QaAttempt from "./QaAttempt";

export default interface QuizAttempt extends Base {
  authorId: string;
  qaAttempts: QaAttempt[];
}
