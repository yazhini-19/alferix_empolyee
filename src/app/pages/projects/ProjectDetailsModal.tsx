import React from "react";
import Modal from "@/app/components/ui/Modal";
import Button from "@/app/components/ui/Button";
import { Project } from "@/app/types/project";
import Link from "next/link";

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailsModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailsModalProps) {
  if (!project) return null;

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "in-progress":
        return "bg-indigo-900 text-white";
      case "completed":
        return "bg-gray-200 text-gray-800";
      case "planning":
        return "bg-gray-100 text-gray-800";
      case "on-hold":
        return "bg-red-700 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: Project["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-600 border border-red-100";
      case "medium":
        return "bg-orange-50 text-orange-600 border border-orange-100";
      case "low":
        return "bg-green-50 text-green-600 border border-green-100";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.name}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Link href={`/pages/projects/${project.id}`}>
            <Button className="bg-indigo-900 text-white hover:bg-indigo-800">
              View Details
            </Button>
          </Link>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">
            Project details and team information
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            Description
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
        </div>

        <div className="flex gap-12">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Status
            </h4>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                project.status
              )}`}
            >
              {project.status === "in-progress"
                ? "In Progress"
                : project.status.replace("-", " ")}
            </span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Priority
            </h4>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                project.priority
              )}`}
            >
              {project.priority.charAt(0).toUpperCase() +
                project.priority.slice(1)}
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Progress
            </h4>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {project.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-indigo-900 h-2 rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">
              Start Date
            </h4>
            <p className="text-sm text-gray-900 dark:text-gray-100">
              {new Date(project.startDate).toLocaleDateString()}
            </p>
          </div>
          {project.endDate && (
            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">
                End Date
              </h4>
              <p className="text-sm text-gray-900 dark:text-gray-100">
                {new Date(project.endDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        <div>
           <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            Project Manager
          </h4>
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                {project.projectManager.split(' ').map(n => n[0]).join('')}
             </div>
             <span className="text-sm text-gray-600 dark:text-gray-400">
                {project.projectManager}
             </span>
          </div>
        </div>


        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
            Team Members ({project.teamMembers.length})
          </h4>
          <div className="space-y-2">
            {project.teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white dark:bg-gray-600 rounded flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                    {member.initials}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {member.name}
                  </span>
                </div>
                {member.role && (
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                        {member.role}
                    </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
