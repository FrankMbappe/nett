const MAX_FILE_SIZE = 1e8;

enum DbModelEnum {
  User = "User",
  Classroom = "Classroom",
  Post = "Post",
  Comment = "Comment",
  Like = "Like",
  Country = "Country",
  File = "File",
  Qa = "Qa",
  Quiz = "Quiz",
  QaAttempt = "QaAttempt",
  QuizAttempt = "QuizAttempt",
  Tutorial = "Tutorial",
  TutorialStep = "TutorialStep",
  UserProfile = "UserProfile",
}

enum UserCategoryEnum {
  Teacher = "teacher",
  Student = "student",
  Consultant = "consultant",
}
enum UserGenderEnum {
  Female = "female",
  Male = "male",
  Other = "other",
}
enum UserHonorificEnum {
  Dr = "Dr",
  Professor = "Professor",
  Mr = "Mr",
  Mrs = "Mrs",
  Ms = "Ms",
}
enum PostCategoryEnum {
  Normal = "normal",
  Tutorial = "tutorial",
  Quiz = "quiz",
}
enum EventStatusEnum {
  Pending = "pending",
  Opened = "opened",
  Closed = "closed",
}
enum ClassromMemberRoleEnum {
  Student = UserCategoryEnum.Student,
  Consultant = UserCategoryEnum.Consultant,
}

export {
  DbModelEnum,
  UserCategoryEnum,
  UserGenderEnum,
  UserHonorificEnum,
  PostCategoryEnum,
  EventStatusEnum,
  ClassromMemberRoleEnum,
  MAX_FILE_SIZE,
};
