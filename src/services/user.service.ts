import type {
  CreateAccountPayload,
  UserCreateResponse,
  LoginPayload,
  UserLoginResponse,
  ValidationPayload,
} from '../assets/types';
interface ServiceSuccess<T> {
  data: T;
  message: string;
  error?: never;
}

interface ServiceError {
  data?: never;
  message?: never;
  error: string;
}

type ServiceResponse<T> = ServiceSuccess<T> | ServiceError;

async function handleApiRequest<T>(url: string, options: RequestInit): Promise<ServiceResponse<T>> {
  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage =
        responseData.message ||
        responseData.error ||
        `Request failed with status ${response.status}`;
      return { error: errorMessage };
    }

    if (responseData.data?.token) {
      localStorage.setItem('accessToken', responseData.data.token);
    }

    return {
      data: responseData.data,
      message: responseData.message,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: `Network error: ${error.message}` };
    }
    return { error: 'An unknown error occurred.' };
  }
}
export class UserServices {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:8080') {
    this.baseUrl = baseUrl;
  }
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }
  private getPublicHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
    };
  }

  public async createAccount(
    userData: CreateAccountPayload,
  ): Promise<ServiceResponse<UserCreateResponse>> {
    return handleApiRequest(`${this.baseUrl}/api/v1/user/createAccount`, {
      method: 'POST',
      headers: this.getPublicHeaders(),
      body: JSON.stringify(userData),
    });
  }

  public async validateSession(): Promise<ServiceResponse<ValidationPayload>> {
    const response = await handleApiRequest<ValidationPayload>(
      `${this.baseUrl}/api/v1/user/validate`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      },
    );

    if (response.error) {
      localStorage.removeItem('accessToken');
    }

    return response;
  }
  public async loginUser(credentials: LoginPayload): Promise<ServiceResponse<UserLoginResponse>> {
    return handleApiRequest(`${this.baseUrl}/api/v1/user/login`, {
      method: 'POST',
      headers: this.getPublicHeaders(),
      body: JSON.stringify(credentials),
    });
  }

  public async logoutUser(): Promise<void> {
    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        await fetch(`${this.baseUrl}/api/v1/user/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout failed on server:', error);
      }
    }

    localStorage.removeItem('accessToken');
    window.location.reload();
  }
}

const UserServicesInstance = new UserServices();
export default UserServicesInstance;
