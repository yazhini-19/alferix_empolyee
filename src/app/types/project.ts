export interface Project {
  id: string;
  name: string;
  description: string;
  status: "planning" | "in-progress" | "completed" | "on-hold";
  startDate: string;
  endDate?: string;
  teamMembers: string[];
  progress: number;
  priority: "low" | "medium" | "high";
}

