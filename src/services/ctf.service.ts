import type { ctfResponse, levelPorgressResponse, LevelResponse } from '../assets/types';

export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

export class LevelService {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://dockshell-backend-1.onrender.com') {
    this.baseUrl = baseUrl;
  }

  // 🔧 FIXED: Proper headers method with ngrok bypass
  private getHeaders(includeAuth: boolean = true, isFormData: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      // 🚀 ALWAYS include ngrok bypass headers
      'ngrok-skip-browser-warning': 'true',
      'User-Agent': 'MyApp/1.0',
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    if (includeAuth) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  public async getCtfLevel(
    ctfName: string,
    ctfLevel: string,
  ): Promise<LevelResponse | { error: string }> {
    const uniqueId = `${ctfName}-${ctfLevel}`;
    const url = `${this.baseUrl}/api/v1/ctf/getctfLevel/${uniqueId}`;

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return { error: 'No authentication token found. Please login.' };
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(true), // Include auth + ngrok headers
      });

      if (response.status === 401) {
        return {
          error: 'Authentication expired or invalid. Please login again.',
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
      return { error: 'Unknown error occurred' };
    }
  }

  public async submitCtfFlag(
    ctfName: string,
    ctfLevel: number,
    password: string,
  ): Promise<{ success: true; message: string; data: unknown }> {
    const url = `${this.baseUrl}/api/v1/ctf/saveLevelProgress`;

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new ApiError('No authentication token found. Please log in.', 401);
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(true), // Include auth + ngrok headers
        body: JSON.stringify({
          ctfName,
          levelNo: ctfLevel,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: `Server returned an error: ${response.status} ${response.statusText}`,
        }));
        throw new ApiError(errorData.error || 'An unknown server error occurred.', response.status);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new Error(`Network request failed: ${error.message}`);
      }
      throw new Error('An unknown error occurred during the request.');
    }
  }

  public async getAllUserProgress(): Promise<
    | {
        success: true;
        data: {
          allProgress: levelPorgressResponse[];
          skills: {
            skills: {
              id: string;
              catgory: string;
              username: string;
              uniqueId: string;
            }[];
          };
        };
      }
    | { success: false; error: string }
  > {
    const url = `${this.baseUrl}/api/v1/ctf/getAllUserProgress/`;

    const token = localStorage.getItem('accessToken');
    if (!token) {
      return {
        success: false,
        error: 'No authentication token found. Please login.',
      };
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(true), // Include auth + ngrok headers
      });

      if (response.status === 401) {
        return {
          success: false,
          error: 'Authentication expired or invalid. Please login again.',
        };
      }

      if (!response.ok) {
        return {
          success: false,
          error: `Server error: ${response.status} ${response.statusText}`,
        };
      }

      const data: {
        success: true;
        data: {
          allProgress: levelPorgressResponse[];
          skills: {
            skills: {
              id: string;
              catgory: string;
              username: string;
              uniqueId: string;
            }[];
          };
        };
      } = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          success: false,
          error: `Network or fetch error: ${error.message}`,
        };
      }
      return { success: false, error: 'Unknown error occurred' };
    }
  }

  // 🔧 FIXED: getCtf method with proper headers
  public async getCtf(): Promise<ctfResponse | { error: string }> {
    const url = `${this.baseUrl}/api/v1/ctf/getCtf`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(false), // 🚀 Use proper headers with ngrok bypass
      });

      if (response.status === 401) {
        return {
          error: 'Authentication expired or invalid. Please login again.',
        };
      }

      if (!response.ok) {
        return {
          error: `Server error: ${response.status} ${response.statusText}`,
        };
      }

      const data: ctfResponse = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: `Network or fetch error: ${error.message}` };
      }
      return { error: 'Unknown error occurred' };
    }
  }
}

const LevelServiceInstance = new LevelService();
export default LevelServiceInstance;
