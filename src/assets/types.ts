export interface LevelResponse {
  statusCode: number;
  data: {
    level: LevelData;
    ctfTotalLevels: {
      totalLevels: number;
    };
  };
}
export interface ctfResponse {
  message: string;
  statusCode: number;
  data: LabInter[];
}
export interface ValidateSessionResponse {
  statusCode: 200;
  message: string;
  data: {
    user: UserData;
  };
}
export interface ValidationPayload {
  user: UserData;
}

export interface ApiValidateSessionResponse {
  statusCode: 200;
  message: string;
  data: ValidationPayload;
}
export default interface LabInter {
  ctfName: string;
  totalLevels: number;
  title: string;
  totalPlayers: number;
  subHeader: string;
  difficulty: string;
  topic: string;
  imgSrc: string;
}
// Types
type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';
type Category = 'fileexploration' | 'crypto' | 'web' | 'binary' | 'forensics' | 'network';

interface FileData {
  filename: string;
  content: string;
  permissions: string;
  hidden: boolean;
}

export interface LevelData {
  credentials?: {
    username: string;
    host: string;
    Port: number;
    password: string;
  };
  ctfName: string;
  levelNo: number;
  id: string;
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

export type CreateAccountPayload = Omit<UserData, 'id' | 'createdAt' | 'updatedAt' | 'LastName'> & {
  lastName: string; // Frontend forms usually use camelCase
  password: string;
};

export interface LoginPayload {
  username: string; // Can be username or email
  password: string;
}
export interface levelPorgressResponse {
  id: string;
  ctfName: string;
  username: string;
  ctfClaimeds: [
    {
      ctfProgressId: string;
      id: string;
      levelNo: number;
      password: string;
    },
  ];
}
