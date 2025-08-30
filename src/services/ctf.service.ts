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

  constructor(baseUrl: string = 'http://localhost:8080') {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('accessToken') || 'cd';
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  public async getCtfLevel(
    ctfName: string,
    ctfLevel: string,
  ): Promise<LevelResponse | { error: string }> {
    const uniqueId = `${ctfName}-${ctfLevel}`;
    const url = `${this.baseUrl}/api/v1/ctf/getctfLevel/${uniqueId}`;

    const token = localStorage.getItem('accessToken') || 'cd';
    if (!token) {
      return { error: 'No authentication token found. Please login.' };
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
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
    ctfName: string, // ctfName should not be undefined if it's required
    ctfLevel: number,
    password: string,
  ): Promise<{ success: true; message: string; data: unknown }> {
    const url = `${this.baseUrl}/api/v1/ctf/saveLevelProgress`;

    const token = localStorage.getItem('accessToken');
    if (!token) {
      // Throw an error that can be caught by the UI handler
      throw new ApiError('No authentication token found. Please log in.', 401);
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(), // Assuming this correctly adds the Authorization header
        body: JSON.stringify({
          ctfName,
          levelNo: ctfLevel,
          password,
        }),
      });

      // If the response is not OK (e.g., 400, 403, 500), parse the error body
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          // Fallback if the error response isn't valid JSON
          error: `Server returned an error: ${response.status} ${response.statusText}`,
        }));
        // Throw the structured error with the message from the server
        throw new ApiError(errorData.error || 'An unknown server error occurred.', response.status);
      }

      // If successful, the server sends a success object
      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      // If it's a network error or something else, wrap it in a generic error message
      if (error instanceof Error) {
        throw new Error(`Network request failed: ${error.message}`);
      }
      // Fallback for unknown errors
      throw new Error('An unknown error occurred during the request.');
    }
  }
  public async getAllUserProgress(): Promise<
    { success: true; data: levelPorgressResponse[] } | { success: false; error: string }
  > {
    const url = `${this.baseUrl}/api/v1/ctf/getAllUserProgress/`;

    const token = localStorage.getItem('accessToken') || '';
    if (!token) {
      return {
        success: false,
        error: 'No authentication token found. Please login.',
      };
    }

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
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

      const data: { success: true; data: levelPorgressResponse[] } = await response.json();
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
  public async getCtf(): Promise<ctfResponse | { error: string }> {
    const url = `${this.baseUrl}/api/v1/ctf/getCtf`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application-json',
        },
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
      console.log(data);

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
