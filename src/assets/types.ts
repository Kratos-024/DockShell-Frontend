export interface LevelResponse {
  statusCode: number;
  data: LevelData;
}
export interface ValidateSessionResponse {
  statusCode: 200;
  message: string;
  data: {
    user: UserData;
  };
}
export default interface LabInter {
  title: string;
  imgSrc: string;
  difficulty: "Easy" | "Medium" | "Hard";
  subHeader: string;
  solved: number;
  topic: string;
}
// Types
type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";
type Category =
  | "fileexploration"
  | "crypto"
  | "web"
  | "binary"
  | "forensics"
  | "network";

interface FileData {
  filename: string;
  content: string;
  permissions: string;
  hidden: boolean;
}

export interface LevelData {
  uniqueId: string;
  goal: string;
  description: string;
  commands: string[];
  hints?: string[];
  links?: string[];
  files?: FileData[];
  expectedOutput?: string;
  difficulty: Difficulty;
  category: Category;
  estimatedTime: number;
  createdAt: Date;
}

export interface UserData {
  id: string;
  firstName: string;
  LastName: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserLoginData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface UserCreateResponse {
  statusCode: 201;
  message: string;
  data: UserData;
}

export interface UserLoginResponse {
  statusCode: 200;
  message: string;
  data: {
    user: UserLoginData;
    token: string;
  };
}

export interface ServiceError {
  error: string;
}

export type CreateAccountPayload = Omit<
  UserData,
  "id" | "createdAt" | "updatedAt" | "LastName"
> & {
  lastName: string; // Frontend forms usually use camelCase
  password: string;
};

export interface LoginPayload {
  username: string; // Can be username or email
  password: string;
}
