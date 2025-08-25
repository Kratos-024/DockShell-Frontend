export interface LevelResponse {
  statusCode: number;
  data: LevelData;
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
