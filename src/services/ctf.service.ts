import type { levelPorgressResponse, LevelResponse } from "../assets/types";

export class LevelService {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:8080") {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    const token = localStorage.getItem("accessToken") || "cd";
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  public async getCtfLevel(
    ctfName: string,
    ctfLevel: string
  ): Promise<LevelResponse | { error: string }> {
    const uniqueId = `${ctfName}-${ctfLevel}`;
    const url = `${this.baseUrl}/api/v1/ctf/getctfLevel/${uniqueId}`;

    const token = localStorage.getItem("accessToken") || "cd";
    if (!token) {
      return { error: "No authentication token found. Please login." };
    }

    try {
      const response = await fetch(url, {
        method: "GET",
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
  public async saveCtfLevel(
    ctfName: string | undefined,
    ctfLevel: number,
    password: string
  ): Promise<LevelResponse | { error: string }> {
    const url = `${this.baseUrl}/api/v1/ctf/saveLevelProgress`;

    const token = localStorage.getItem("accessToken") || "";
    if (!token) {
      return { error: "No authentication token found. Please login." };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({
          ctfName,
          levelNo: ctfLevel,
          password,
        }),
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
      console.log(data);

      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: `Network or fetch error: ${error.message}` };
      }
      return { error: "Unknown error occurred" };
    }
  }
  public async getAllUserProgress(): Promise<
    | { success: true; data: levelPorgressResponse[] }
    | { success: false; error: string }
  > {
    const url = `${this.baseUrl}/api/v1/ctf/getAllUserProgress/`;

    const token = localStorage.getItem("accessToken") || "";
    if (!token) {
      return {
        success: false,
        error: "No authentication token found. Please login.",
      };
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (response.status === 401) {
        return {
          success: false,
          error: "Authentication expired or invalid. Please login again.",
        };
      }

      if (!response.ok) {
        return {
          success: false,
          error: `Server error: ${response.status} ${response.statusText}`,
        };
      }

      const data: { success: true; data: levelPorgressResponse[] } =
        await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          success: false,
          error: `Network or fetch error: ${error.message}`,
        };
      }
      return { success: false, error: "Unknown error occurred" };
    }
  }
}

const LevelServiceInstance = new LevelService();
export default LevelServiceInstance;
