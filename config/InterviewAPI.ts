// API base URL from environment or fallback to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Interface for Interview Schedule DTO from backend
export interface InterviewSchedule {
  id: number;
  companyName: string;
  hrContact: string;
  round: string;
  status: string;
  interviewDateTime: string;
  userName: string;
  userEmail: string;
}

export class InterviewAPI {
  private static baseURL = `${API_BASE_URL}/api/interviews`;

  /**
   * Get all schedules for a specific admin
   * @param adminId ID of the admin
   */
  static async getSchedulesByAdmin(adminId: number): Promise<InterviewSchedule[]> {
    const response = await fetch(`${this.baseURL}/admin/${adminId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error("Failed to fetch schedules for admin");
    return response.json();
  }

  /**
   * Get all schedules for a specific user
   * @param userId ID of the user
   */
  static async getSchedulesByUser(userId: number): Promise<InterviewSchedule[]> {
    const response = await fetch(`${this.baseURL}/user/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error("Failed to fetch schedules for user");
    return response.json();
  }
}
