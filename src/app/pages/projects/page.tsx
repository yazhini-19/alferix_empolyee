"use client";

import React, { useState } from "react";
import Layout from "@/app/components/layout/Layout";
import Card from "@/app/components/ui/Card";
import { Project, TeamMember } from "@/app/types/project";
import Link from "next/link";
import ProjectDetailsModal from "./ProjectDetailsModal";

import { mockProjects } from "@/app/data/mockProjects";


export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "in-progress":
        return "bg-indigo-900 text-white border-indigo-900";
      case "planning":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "on-hold":
        return "bg-red-700 text-white border-red-700";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: Project["status"]) => {
      switch (status) {
        case "in-progress": return "In Progress";
        case "on-hold": return "On Hold";
        case "planning": return "Planning";
        case "completed": return "Completed";
        default: return status;
      }
  }

  const getPriorityColor = (priority: Project["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-600 border-red-100";
      case "medium":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "low":
        return "bg-green-50 text-green-600 border-green-100";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

    const getPriorityLabel = (priority: Project["priority"]) => {
      switch (priority) {
        case "high": return "High";
        case "medium": return "Medium";
        case "low": return "Low";
        default: return priority;
      }
  }


  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Project Management</h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Track and manage all projects, assign teams, and monitor progress
            </p>
          </div>
          <button className="px-4 py-2 bg-indigo-900 text-white rounded-lg text-sm font-medium hover:bg-indigo-800 transition-colors flex items-center gap-2">
            <span>+</span> New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <div key={project.id} onClick={() => handleProjectClick(project)} className="cursor-pointer group">
            <Card className="h-full group-hover:shadow-md transition-all border group-hover:border-indigo-200">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {project.name}
                    </h3>
                    <div className="flex gap-2">
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-md border ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-md border ${getPriorityColor(project.priority)}`}>
                        {getPriorityLabel(project.priority)}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 min-h-[40px]">
                    {project.description}
                </p>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 dark:bg-gray-700">
                        <div
                            className="bg-indigo-900 h-1.5 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                        />
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Duration: {project.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>PM: {project.projectManager}</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Team:</span>
                        <div className="flex -space-x-1">
                            {project.teamMembers.slice(0, 3).map((member, i) => (
                                <div key={i} className="w-6 h-6 rounded-full bg-gray-100 border border-white flex items-center justify-center text-[10px] font-medium text-gray-600">
                                    {member.initials}
                                </div>
                            ))}
                             {project.teamMembers.length > 3 && (
                                <div className="w-6 h-6 rounded-full bg-gray-100 border border-white flex items-center justify-center text-[10px] font-medium text-gray-600">
                                    +{project.teamMembers.length - 3}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="text-sm">
                        {project.status === 'completed' ? (
                             <span className="text-gray-500">Completed</span>
                        ) : project.overdue ? (
                            <span className="text-red-500 font-medium">Overdue</span>
                        ) : (
                            <span className="text-green-500 font-medium">Active</span>
                        )}
                    </div>
                </div>

              </div>
            </Card>
            </div>
          ))}
        </div>

        <ProjectDetailsModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        />
      </div>
    </Layout>
  );
}
