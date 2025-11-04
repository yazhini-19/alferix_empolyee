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
  salary?: number;
  location?: string;
}

export interface EmployeeFormData {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  hireDate: string;
  status: "active" | "inactive" | "on-leave";
  salary?: number;
  location?: string;
}

