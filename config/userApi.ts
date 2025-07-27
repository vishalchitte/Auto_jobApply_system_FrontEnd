const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Interface matching the Spring Boot User entity
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  approved: boolean;
  password?: string;
}

// User login response
export interface UserLoginResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  approved: boolean;
}

// API utility class
export class UserAPI {
  private static baseURL = `${API_BASE_URL}/user`;

  // Login method
  static async login(email: string, password: string): Promise<UserLoginResponse> {
    const url = `${this.baseURL}/login`;
    console.log('Making login request to:', url);
    console.log('Request payload:', { email, password: '***' });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Login failed with error:', errorText);
        throw new Error(errorText || `Login failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login successful, user data:', { ...data, password: undefined });
      return data;
    } catch (error) {
      console.error('Network error during login:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running on http://localhost:8080');
      }
      throw error;
    }
  }
}
