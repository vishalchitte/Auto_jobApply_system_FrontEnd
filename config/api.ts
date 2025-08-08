// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// User interface matching your Spring Boot User entity
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  approved: boolean;
  password?: string;
}

// Admin login response interface
export interface AdminLoginResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  adminId?: number; // Add this line
}

// API utility class for admin operations
export class AdminAPI {
  private static baseURL = `${API_BASE_URL}/admin`;

  // Admin login
  static async login(email: string, password: string): Promise<AdminLoginResponse> {
    const response = await fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Login failed');
    }

    return response.json();
  }

  // Get unapproved users
  static async getUnapprovedUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseURL}/unapproved-users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch unapproved users');
    }

    return response.json();
  }

  // Approve user
  static async approveUser(id: number): Promise<string> {
    const response = await fetch(`${this.baseURL}/approve/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to approve user');
    }

    return response.text();
  }

  // Get all normal users (CANDIDATE role)
  static async getAllNormalUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseURL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  }

  // Delete user
  static async deleteUser(id: number): Promise<string> {
    const response = await fetch(`${this.baseURL}/delete-user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to delete user');
    }

    return response.text();
  }
}
