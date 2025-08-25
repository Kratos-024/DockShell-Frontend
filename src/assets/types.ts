export interface LevelResponse {
  levelName: string;
  description: string;
  commands: string[];
  hints: string[];
}
export default interface LabInter {
  imgSrc: string;
  difficulty: "Easy" | "Medium" | "Hard";
  header: string;
  subHeader: string;
  solved: number;
  topic: string;
}
