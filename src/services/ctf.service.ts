import type { LevelResponse } from "../assets/types";

export class LevelService {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:8000") {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    const token = localStorage.getItem("accessToken");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  public async getLevel(
    ctfName: string,
    ctfLevel: string
  ): Promise<LevelResponse | { error: string }> {
    const uniqueId = `${ctfName}${ctfLevel}`;
    const url = `${this.baseUrl}/getEachLevel/getctfLevel/${uniqueId}`;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      return { error: "No authentication token found. Please login." };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: this.getHeaders(),
      });

      if (response.status === 401) {
        return {
          error: "Authentication expired or invalid. Please login again.",
        };
      }

      if (!response.ok) {
        return {
          error: `Server error: ${response.status} ${response.statusText}`,
        };
      }

      const data: LevelResponse = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: `Network or fetch error: ${error.message}` };
      }
      return { error: "Unknown error occurred" };
    }
  }
}

const LevelServiceInstance = new LevelService();
export default LevelServiceInstance;
