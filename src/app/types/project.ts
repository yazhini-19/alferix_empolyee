export interface Project {
  id: string;
  name: string;
  description: string;
  status: "planning" | "in-progress" | "completed" | "on-hold";
  startDate: string;
  endDate?: string;
  priority: "low" | "medium" | "high";
  projectManager: string;
  duration?: string;
  overdue?: boolean;
  budget?: string;
  teamMembers: TeamMember[];
  progress: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  department?: string;
  skills?: string[];
  capacity?: "Full" | "Half";
  hoursPerDay?: number;
}

