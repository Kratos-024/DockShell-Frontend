// Assuming you have a types file at ../assets/types.ts
import type {
  CreateAccountPayload,
  UserCreateResponse,
  ServiceError,
  LoginPayload,
  UserLoginResponse,
  ValidateSessionResponse,
} from "../assets/types";

export class UserServices {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:8080") {
    this.baseUrl = baseUrl;
  }
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("accessToken");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }
  private getPublicHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
    };
  }

  public async createAccount(
    userData: CreateAccountPayload
  ): Promise<UserCreateResponse | ServiceError> {
    const url = `${this.baseUrl}/api/v1/user/createAccount`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: this.getPublicHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          (typeof data.error === "object"
            ? JSON.stringify(data.error)
            : data.error) ||
          `Server error: ${response.status} ${response.statusText}`;
        return { error: errorMessage };
      }

      if (data.data?.token) {
        localStorage.setItem("accessToken", data.data.token);
      }

      return data as UserCreateResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: `Network or fetch error: ${error.message}` };
      }
      return { error: "An unknown error occurred" };
    }
  }
  public async validateSession(): Promise<
    ValidateSessionResponse | ServiceError
  > {
    const url = `${this.baseUrl}/api/v1/user/validate`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("accessToken");
        }
        return {
          error:
            data.error || `Session validation failed: ${response.statusText}`,
        };
      }

      return data as ValidateSessionResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: `Network or fetch error: ${error.message}` };
      }
      return { error: "An unknown error occurred during session validation" };
    }
  }
  public async loginUser(
    credentials: LoginPayload
  ): Promise<UserLoginResponse | ServiceError> {
    const url = `${this.baseUrl}/api/v1/user/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: this.getPublicHeaders(),
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.error ||
          `Server error: ${response.status} ${response.statusText}`;
        return { error: errorMessage };
      }

      if (data.data?.token) {
        localStorage.setItem("accessToken", data.data.token);
      }

      return data as UserLoginResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: `Network or fetch error: ${error.message}` };
      }
      return { error: "An unknown error occurred" };
    }
  }

  public logoutUser(): void {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Optional: Call a backend endpoint to invalidate the token in the DB
      // e.g., fetch(`${this.baseUrl}/api/v1/user/logout`, { method: 'POST', headers: this.getAuthHeaders() });
    }
    localStorage.removeItem("accessToken");
    console.log("User logged out and token removed.");
  }
}

const UserServicesInstance = new UserServices();
export default UserServicesInstance;
