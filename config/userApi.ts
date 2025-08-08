const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface AdminRequest {
  id: number;
  name: string;
  email: string;
  role: string;
  approved: boolean;
}

export interface SystemOverview {
  totalUsers: number;
  totalAdmins: number;
  totalSubAdmins: number;
}

export class SuperAdminAPI {
  private static baseURL = `${API_BASE_URL}/super-admin`;

  // Fetch pending admin requests
  static async getAdminRequests(): Promise<AdminRequest[]> {
    const url = `${this.baseURL}/requests`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch admin requests');
    return response.json();
  }

  // Approve an admin
  static async approveAdmin(adminId: number): Promise<void> {
    const url = `${this.baseURL}/approve/${adminId}`;
    const response = await fetch(url, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to approve admin');
  }

  // Reject an admin
  static async rejectAdmin(adminId: number): Promise<void> {
    const url = `${this.baseURL}/reject/${adminId}`;
    const response = await fetch(url, { method: 'POST' });
    if (!response.ok) throw new Error('Failed to reject admin');
  }

  // Get system overview stats
  static async getSystemOverview(): Promise<SystemOverview> {
    const url = `${this.baseURL}/overview`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch system overview');
    return response.json();
  }
}
