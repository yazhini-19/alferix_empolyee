"use client";

import React from "react";
import Layout from "@/app/components/layout/Layout";
import Card from "@/app/components/ui/Card";
import Table from "@/app/components/ui/Table";
import { Project } from "@/app/types/project";

// Mock data
const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete redesign of company website with modern UI/UX",
    status: "in-progress",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    teamMembers: ["John Doe", "Jane Smith"],
    progress: 65,
    priority: "high",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Development of new mobile application for iOS and Android",
    status: "in-progress",
    startDate: "2024-02-01",
    endDate: "2024-08-15",
    teamMembers: ["John Doe", "Bob Johnson"],
    progress: 40,
    priority: "high",
  },
  {
    id: "3",
    name: "Marketing Campaign Q2",
    description: "Launch new marketing campaign for Q2 product releases",
    status: "planning",
    startDate: "2024-04-01",
    teamMembers: ["Jane Smith", "Alice Williams"],
    progress: 15,
    priority: "medium",
  },
  {
    id: "4",
    name: "HR System Upgrade",
    description: "Upgrade existing HR management system to latest version",
    status: "completed",
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    teamMembers: ["Alice Williams"],
    progress: 100,
    priority: "medium",
  },
  {
    id: "5",
    name: "Sales Training Program",
    description: "Develop and implement comprehensive sales training program",
    status: "on-hold",
    startDate: "2024-03-01",
    teamMembers: ["Bob Johnson"],
    progress: 25,
    priority: "low",
  },
  {
    id: "6",
    name: "Data Analytics Platform",
    description: "Build internal data analytics and reporting platform",
    status: "in-progress",
    startDate: "2024-01-20",
    endDate: "2024-07-31",
    teamMembers: ["John Doe", "Alice Williams"],
    progress: 55,
    priority: "high",
  },
];

export default function ProjectsPage() {
  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "on-hold":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: Project["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns = [
    {
      header: "Project Name",
      accessor: (row: Project) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{row.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md truncate">
            {row.description}
          </p>
        </div>
      ),
      className: "max-w-md",
    },
    {
      header: "Status",
      accessor: (row: Project) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(row.status)}`}>
          {row.status.replace("-", " ")}
        </span>
      ),
    },
    {
      header: "Priority",
      accessor: (row: Project) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(row.priority)}`}>
          {row.priority}
        </span>
      ),
    },
    {
      header: "Progress",
      accessor: (row: Project) => (
        <div className="w-32">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${row.progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
              {row.progress}%
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Team",
      accessor: (row: Project) => (
        <div className="flex -space-x-2">
          {row.teamMembers.slice(0, 3).map((member, idx) => (
            <div
              key={idx}
              className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-gray-800"
              title={member}
            >
              {member.charAt(0)}
            </div>
          ))}
          {row.teamMembers.length > 3 && (
            <div
              className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-gray-800"
              title={`+${row.teamMembers.length - 3} more`}
            >
              +{row.teamMembers.length - 3}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Timeline",
      accessor: (row: Project) => (
        <div className="text-sm">
          <p className="text-gray-900 dark:text-white">
            {new Date(row.startDate).toLocaleDateString()}
          </p>
          {row.endDate && (
            <p className="text-gray-500 dark:text-gray-400">
              → {new Date(row.endDate).toLocaleDateString()}
            </p>
          )}
        </div>
      ),
    },
  ];

  const stats = {
    total: mockProjects.length,
    inProgress: mockProjects.filter((p) => p.status === "in-progress").length,
    completed: mockProjects.filter((p) => p.status === "completed").length,
    onHold: mockProjects.filter((p) => p.status === "on-hold").length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage and track all organizational projects
            </p>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Projects</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                In Progress
              </p>
              <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.inProgress}
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.completed}
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">On Hold</p>
              <p className="mt-2 text-3xl font-bold text-gray-600 dark:text-gray-400">
                {stats.onHold}
              </p>
            </div>
          </Card>
        </div>

        {/* Projects Table */}
        <Card title="All Projects">
          <Table data={mockProjects} columns={columns} />
        </Card>
      </div>
    </Layout>
  );
}

