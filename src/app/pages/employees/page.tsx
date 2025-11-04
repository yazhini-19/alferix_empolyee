"use client";

import React, { useState } from "react";
import Layout from "@/app/components/layout/Layout";
import Card from "@/app/components/ui/Card";
import Table from "@/app/components/ui/Table";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Modal from "@/app/components/ui/Modal";
import { Employee, EmployeeFormData } from "@/app/types/employee";

// Mock data - in a real app, this would come from an API
const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234-567-8900",
    department: "Engineering",
    position: "Senior Developer",
    hireDate: "2022-01-15",
    status: "active",
    salary: 95000,
    location: "New York",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234-567-8901",
    department: "Marketing",
    position: "Marketing Manager",
    hireDate: "2021-06-20",
    status: "active",
    salary: 85000,
    location: "San Francisco",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "+1 234-567-8902",
    department: "Sales",
    position: "Sales Representative",
    hireDate: "2023-03-10",
    status: "active",
    salary: 60000,
    location: "Chicago",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    phone: "+1 234-567-8903",
    department: "HR",
    position: "HR Manager",
    hireDate: "2020-11-05",
    status: "active",
    salary: 80000,
    location: "Boston",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: "+1 234-567-8904",
    department: "Engineering",
    position: "Junior Developer",
    hireDate: "2023-08-12",
    status: "on-leave",
    salary: 55000,
    location: "Seattle",
  },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    hireDate: "",
    status: "active",
    salary: 0,
    location: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EmployeeFormData, string>>>({});

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        position: employee.position,
        hireDate: employee.hireDate,
        status: employee.status,
        salary: employee.salary || 0,
        location: employee.location || "",
      });
    } else {
      setEditingEmployee(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        hireDate: "",
        status: "active",
        salary: 0,
        location: "",
      });
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EmployeeFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.hireDate) newErrors.hireDate = "Hire date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingEmployee) {
      // Update existing employee
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id
            ? { ...formData, id: editingEmployee.id }
            : emp
        )
      );
    } else {
      // Add new employee
      const newEmployee: Employee = {
        ...formData,
        id: Date.now().toString(),
      };
      setEmployees([...employees, newEmployee]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const columns = [
    {
      header: "Name",
      accessor: (row: Employee) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{row.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Department",
      accessor: "department" as keyof Employee,
    },
    {
      header: "Position",
      accessor: "position" as keyof Employee,
    },
    {
      header: "Phone",
      accessor: "phone" as keyof Employee,
    },
    {
      header: "Status",
      accessor: (row: Employee) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            row.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
              : row.status === "on-leave"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (row: Employee) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal(row);
            }}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.id);
            }}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employees</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage your organization's employees
            </p>
          </div>
          <Button onClick={() => handleOpenModal()}>Add Employee</Button>
        </div>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <Input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredEmployees.length} employee(s) found
            </div>
          </div>
          <Table data={filteredEmployees} columns={columns} />
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingEmployee ? "Edit Employee" : "Add New Employee"}
        footer={
          <>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingEmployee ? "Update" : "Create"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              required
            />
            <Input
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={errors.phone}
              required
            />
            <Input
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              error={errors.department}
              required
            />
            <Input
              label="Position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              error={errors.position}
              required
            />
            <Input
              label="Hire Date"
              type="date"
              value={formData.hireDate}
              onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
              error={errors.hireDate}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "active" | "inactive" | "on-leave",
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on-leave">On Leave</option>
              </select>
            </div>
            <Input
              label="Location"
              value={formData.location || ""}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <Input
              label="Salary"
              type="number"
              value={formData.salary || ""}
              onChange={(e) =>
                setFormData({ ...formData, salary: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
        </form>
      </Modal>
    </Layout>
  );
}

