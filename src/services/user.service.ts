/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BioUpdateResponse } from '../assets/contstant';
import type {
  CreateAccountPayload,
  UserCreateResponse,
  LoginPayload,
  UserLoginResponse,
  ValidationPayload,
  ImageUploadResponse,
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

  constructor(baseUrl: string = 'https://dockshell-backend-1.onrender.com') {
    this.baseUrl = baseUrl;
  }

  private getHeaders(isFormData: boolean = false, includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
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

  private getPublicHeaders(): HeadersInit {
    return this.getHeaders(false, false);
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
        headers: this.getHeaders(false, true),
      },
    );

    if (response.error) {
      console.log('Session validation failed:', response.error);
    } else {
      console.log('');
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

  public async addImage(imageFile: File): Promise<ServiceResponse<ImageUploadResponse>> {
    const formData = new FormData();
    formData.append('profileImage', imageFile);

    return handleApiRequest(`${this.baseUrl}/api/v1/user/addImage`, {
      method: 'POST',
      headers: this.getHeaders(true, true),
      body: formData,
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
            'ngrok-skip-browser-warning': 'true',
            'User-Agent': 'MyApp/1.0',
          },
        });
      } catch (error) {
        console.error('Logout failed on server:', error);
      }
    }

    localStorage.removeItem('accessToken');
    window.location.reload();
  }

  public async updateBio(bio: string | undefined): Promise<ServiceResponse<BioUpdateResponse>> {
    return handleApiRequest(`${this.baseUrl}/api/v1/user/updateBio`, {
      method: 'PUT',
      headers: this.getHeaders(false, true),
      body: JSON.stringify({ bio }),
    });
  }
  public async getCtfData(): Promise<ServiceResponse<any>> {
    return handleApiRequest(`${this.baseUrl}/api/v1/ctf/getCtf`, {
      method: 'GET',
      headers: this.getHeaders(false, false),
    });
  }
}

const UserServicesInstance = new UserServices();
export default UserServicesInstance;
