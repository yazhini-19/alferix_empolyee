"use client";

import React, { useState, useMemo } from "react";
import Layout from "@/app/components/layout/Layout";
import Card from "@/app/components/ui/Card";
import Table from "@/app/components/ui/Table";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Modal from "@/app/components/ui/Modal";
import { Employee, EmployeeFormData } from "@/app/types/employee";

// Mock data matching the provided design
const initialEmployees: Employee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 234-567-8900",
    department: "Engineering",
    position: "Senior Developer",
    hireDate: "2022-01-15",
    status: "active",
    location: "New York",
    availability: "Available",
    availableFrom: "2023-11-01",
    technicalSkills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"]
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    phone: "+1 234-567-8901",
    department: "Management",
    position: "Project Manager",
    hireDate: "2021-06-20",
    status: "active",
    location: "San Francisco",
    availability: "Available",
    availableFrom: "2023-10-15",
    technicalSkills: ["Agile", "Scrum", "JIRA", "Confluence", "Project Management"]
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    phone: "+1 234-567-8902",
    department: "Design",
    position: "UX Designer",
    hireDate: "2023-03-10",
    status: "active",
    location: "Austin",
    availability: "Half Capacity",
    availableFrom: "2023-12-01",
    technicalSkills: ["Figma", "Adobe XD", "UI/UX Design", "Prototyping", "Sketch"]
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@company.com",
    phone: "+1 234-567-8903",
    department: "Engineering",
    position: "Developer",
    hireDate: "2020-11-05",
    status: "on-leave",
    location: "Boston",
    availability: "Available",
    availableFrom: "2024-01-15",
    technicalSkills: ["JavaScript", "Python", "Docker", "Kubernetes", "AWS"]
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    phone: "+1 234-567-8904",
    department: "Marketing",
    position: "Marketing Manager",
    hireDate: "2019-08-12",
    status: "active",
    location: "Chicago",
    availability: "Available",
    availableFrom: "2023-10-20",
    technicalSkills: ["SEO", "Content Marketing", "Analytics", "Google Ads", "Social Media"]
  },
  {
    id: "6",
    name: "David Park",
    email: "david.park@company.com",
    phone: "+1 234-567-8905",
    department: "Engineering",
    position: "QA Engineer",
    hireDate: "2022-04-18",
    status: "active",
    location: "Seattle",
    availability: "Available",
    availableFrom: "2023-11-10",
    technicalSkills: ["Selenium", "Jest", "Cypress", "Automated Testing", "Python"]
  },
  {
    id: "7",
    name: "Alex Martinez",
    email: "alex.martinez@contractor.com",
    phone: "+1 234-567-8906",
    department: "Engineering",
    position: "Frontend Developer",
    hireDate: "2023-01-22",
    status: "active",
    location: "Denver",
    availability: "Available",
    availableFrom: "2023-09-01",
    technicalSkills: ["React", "Vue.js", "CSS", "HTML5", "Tailwind"]
  },
  {
    id: "8",
    name: "Jordan Lee",
    email: "jordan.lee@contractor.com",
    phone: "+1 234-567-8907",
    department: "Engineering",
    position: "DevOps Engineer",
    hireDate: "2021-11-30",
    status: "active",
    location: "Remote",
    availability: "Available",
    availableFrom: "2023-10-05",
    technicalSkills: ["Kubernetes", "Docker", "CI/CD", "AWS", "Terraform"]
  }
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filter States
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("All Employees");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [technicalSkillFilter, setTechnicalSkillFilter] = useState("");
  const [technicalSkillsInput, setTechnicalSkillsInput] = useState("");

  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    hireDate: "",
    status: "active",
    location: "",
    technicalSkills: [],
    availability: "Available",
    availableFrom: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EmployeeFormData, string>>>({});

  // Reset Filters
  const clearFilters = () => {
    setAvailabilityDate("");
    setAvailabilityStatus("All Employees");
    setSelectedDepartment("All Departments");
    setTechnicalSkillFilter("");
    setSearchTerm("");
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (availabilityDate) count++;
    if (availabilityStatus !== "All Employees") count++;
    if (selectedDepartment !== "All Departments") count++;
    if (technicalSkillFilter) count++;
    return count;
  }, [availabilityDate, availabilityStatus, selectedDepartment, technicalSkillFilter]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      // 1. Search Term (Global)
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // 2. Department
      if (selectedDepartment !== "All Departments" && employee.department !== selectedDepartment) {
        return false;
      }

      // 3. Availability Status
      if (availabilityStatus !== "All Employees" && employee.availability !== availabilityStatus) {
        return false;
      }

      // 4. Availability Date (Show employees available ON or AFTER this date)
      if (availabilityDate && employee.availableFrom) {
         if (employee.availableFrom > availabilityDate) return false;
      }

      // 5. Technical Skill
      if (technicalSkillFilter) {
        const skills = employee.technicalSkills?.map(s => s.toLowerCase()) || [];
        const filterSkill = technicalSkillFilter.toLowerCase();
        // Check if any skill contains the filter text
        const hasSkill = skills.some(skill => skill.includes(filterSkill));
        if (!hasSkill) return false;
      }

      return true;
    });
  }, [employees, searchTerm, selectedDepartment, availabilityStatus, availabilityDate, technicalSkillFilter]);


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
        location: employee.location || "",
        technicalSkills: employee.technicalSkills || [],
        availability: employee.availability || "Available",
        availableFrom: employee.availableFrom || ""
      });
      setTechnicalSkillsInput(employee.technicalSkills?.join(", ") || "");
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
        location: "",
        technicalSkills: [],
        availability: "Available",
        availableFrom: ""
      });
      setTechnicalSkillsInput("");
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
            ? { 
                ...formData, 
                id: editingEmployee.id,
                technicalSkills: technicalSkillsInput.split(",").map(s => s.trim()).filter(Boolean)
              }
            : emp
        )
      );
    } else {
      // Add new employee
      const newEmployee: Employee = {
        ...formData,
        id: Date.now().toString(),
        technicalSkills: technicalSkillsInput.split(",").map(s => s.trim()).filter(Boolean)
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
      header: "Employee",
      accessor: (row: Employee) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium border border-gray-200">
            {row.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{row.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessor: "position" as keyof Employee,
    },
    {
      header: "Department",
      accessor: "department" as keyof Employee,
    },
    {
      header: "Status",
      accessor: (row: Employee) => (
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            row.status === "active"
              ? "bg-[#1e1b4b] text-white" 
              : row.status === "on-leave"
              ? "bg-red-600 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          {row.status}
        </span>
      ), 
    },
    {
        header: "Current Availability",
        accessor: (row: Employee) => (
             <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            row.availability === "Available"
              ? "bg-green-50 text-green-600 border border-green-200" 
              : row.availability === "Half Capacity"
              ? "bg-orange-50 text-orange-600 border border-orange-200"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}
        >
          {row.availability}
        </span>
        )
    },
    {
        header: "Technical Skills",
        accessor: (row: Employee) => (
            <div className="flex flex-wrap gap-2">
                {row.technicalSkills?.slice(0, 3).map(skill => (
                    <span key={skill} className="bg-gray-50 text-gray-700 px-2 py-1 rounded text-xs font-medium border border-gray-200">
                        {skill}
                    </span>
                ))}
                {(row.technicalSkills?.length || 0) > 3 && (
                    <span className="bg-gray-50 text-gray-700 px-2 py-1 rounded text-xs font-medium border border-gray-200">
                        +{row.technicalSkills!.length - 3}
                    </span>
                )}
            </div>
        )
    },
    {
      header: "",
      accessor: (row: Employee) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal(row);
            }}
            className="text-gray-400 hover:text-gray-600"
          >
             <span className="sr-only">Edit</span>
             ...
          </button>
           <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.id);
            }}
            className="text-red-400 hover:text-red-600"
          >
             <span className="sr-only">Delete</span>
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Management</h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Manage your team members and track their performance
            </p>
          </div>
          <Button onClick={() => handleOpenModal()}>
             <span className="flex items-center gap-2">
                 <span className="text-lg">+</span> Add Employee
             </span>
          </Button>
        </div>

        <Card className="p-0 overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700 space-y-4 bg-white dark:bg-gray-800">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Team Members</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{filteredEmployees.length} employees total</p>
                </div>
                <div className="flex items-center gap-3">
                     <div className="relative">
                        <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search employees..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-black"
                        />
                     </div>
                     <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className={`group flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${showFilters || activeFiltersCount > 0 ? 'bg-[#FFF4ED] border-[#FD853A] text-[#FD853A] hover:bg-[#FD853A] hover:text-white' : 'bg-white border-gray-300 text-black hover:bg-[#FD853A] hover:text-white hover:border-[#FD853A]'}`}
                     >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filters
                        {activeFiltersCount > 0 && (
                            <span className={`ml-1 text-xs font-bold px-1.5 py-0.5 rounded-full ${showFilters || activeFiltersCount > 0 ? 'bg-[#FD853A] text-white group-hover:bg-white group-hover:text-[#FD853A]' : 'bg-[#FD853A] text-white group-hover:bg-white group-hover:text-[#FD853A]'}`}>
                                {activeFiltersCount}
                            </span>
                        )}
                     </button>
                </div>
             </div>

             {showFilters && (
                <div className="pt-4 border-t border-gray-100 relative">
                     <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filter Options</label>
                        <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-white hover:bg-[#FD853A] px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 font-medium">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Clear All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-0.5">Availability Date</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input 
                                    type="date" 
                                    value={availabilityDate}
                                    onChange={(e) => setAvailabilityDate(e.target.value)}
                                    className="pl-9 w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-0.5">Availability Status</label>
                             <div className="relative">
                                 <select 
                                    value={availabilityStatus}
                                    onChange={(e) => setAvailabilityStatus(e.target.value)}
                                    className="appearance-none w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium cursor-pointer"
                                 >
                                    <option value="All Employees">All Employees</option>
                                    <option value="Available">Available</option>
                                    <option value="Half Capacity">Half Capacity</option>
                                    <option value="Full Capacity">Full Capacity</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                             </div>
                        </div>
                         <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-0.5">Department</label>
                             <div className="relative">
                                <select 
                                    value={selectedDepartment}
                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                    className="appearance-none w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium cursor-pointer"
                                >
                                    <option value="All Departments">All Departments</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Management">Management</option>
                                </select>
                                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                             </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-0.5">Technical Skill</label>
                            <input 
                                type="text" 
                                value={technicalSkillFilter}
                                onChange={(e) => setTechnicalSkillFilter(e.target.value)}
                                placeholder="e.g., React, Python..."
                                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium placeholder-gray-400"
                            />
                        </div>
                    </div>
                </div>
             )}
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
             <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Availability
              </label>
              <select
                value={formData.availability || "Available"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availability: e.target.value as "Available" | "Half Capacity" | "Full Capacity",
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              >
                <option value="Available">Available</option>
                <option value="Half Capacity">Half Capacity</option>
                <option value="Full Capacity">Full Capacity</option>
              </select>
            </div>
            
            <Input
                label="Available From"
                type="date"
                value={formData.availableFrom || ""}
                onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
            />

            <Input
              label="Location"
              value={formData.location || ""}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            
             <div className="col-span-2">
                <Input
                    label="Technical Skills (comma separated)"
                    value={technicalSkillsInput}
                    onChange={(e) => setTechnicalSkillsInput(e.target.value)}
                    placeholder="React, Node.js, TypeScript"
                />
            </div>
          </div>
        </form>
      </Modal>
    </Layout>
  );
}
