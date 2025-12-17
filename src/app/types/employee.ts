export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  hireDate: string;
  status: "active" | "inactive" | "on-leave";
  avatar?: string;
  location?: string;
  technicalSkills?: string[];
  availability?: "Available" | "Half Capacity" | "Full Capacity";
  availableFrom?: string;
}

export interface EmployeeFormData {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  hireDate: string;
  status: "active" | "inactive" | "on-leave";
  location?: string;
  technicalSkills?: string[];
  availability?: "Available" | "Half Capacity" | "Full Capacity";
  availableFrom?: string;
}
