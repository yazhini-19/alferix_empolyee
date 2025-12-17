"use client";

import React, { useState } from "react";
import Layout from "@/app/components/layout/Layout";
import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";
import { mockProjects } from "@/app/data/mockProjects";
import { notFound, useParams, useRouter } from "next/navigation";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }
  
  // Calculate Team Capacity
  const totalMembers = project.teamMembers.length;
  // Assuming full capacity is 8 hours, half is 4 hours
  const totalHoursPerDay = project.teamMembers.reduce((acc, member) => {
      const hours = member.hoursPerDay || (member.capacity === 'Full' ? 8 : 4);
      return acc + hours;
  }, 0);
  
  const fullCapacityCount = project.teamMembers.filter(m => m.capacity === 'Full' || m.hoursPerDay === 8).length;
  const halfCapacityCount = project.teamMembers.filter(m => m.capacity === 'Half' || m.hoursPerDay === 4).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress": return "bg-indigo-900 text-white border-indigo-900";
      case "completed": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-50 text-red-600 border-red-100";
      case "medium": return "bg-orange-50 text-orange-600 border-orange-100";
       case "low": return "bg-green-50 text-green-600 border-green-100";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
             </button>
             <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Project Details</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                Comprehensive overview and team management
                </p>
             </div>
          </div>
          <Button className="bg-orange-500 text-white hover:bg-orange-600 border-none">
            Edit Project
          </Button>
        </div>

        {/* Project Summary Card */}
        <Card className="border-t-4 border-t-indigo-600">
            <div className="space-y-6">
                <div>
                     <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.name}</h2>
                     <div className="flex gap-2">
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-md border ${getStatusColor(project.status)}`}>
                        {project.status === "in-progress" ? "In Progress" : project.status}
                      </span>
                      <span className={`px-2.5 py-0.5 text-xs font-medium rounded-md border ${getPriorityColor(project.priority)}`}>
                        {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                      </span>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Description</h3>
                    <p className="text-gray-600 text-sm">{project.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-gray-100">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                             <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Start Date</span>
                        </div>
                        <p className="text-sm text-gray-900 pl-6">{new Date(project.startDate).toLocaleDateString()}</p>
                    </div>
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                             <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">End Date</span>
                        </div>
                        <p className="text-sm text-gray-900 pl-6">{project.endDate ? new Date(project.endDate).toLocaleDateString() : '-'}</p>
                    </div>
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                             <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Duration</span>
                        </div>
                        <p className="text-sm text-gray-900 pl-6">{project.duration}</p>
                    </div>
                </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                    <div>
                         <div className="flex items-center gap-2 mb-1">
                             <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Project Manager</span>
                        </div>
                        <div className="flex items-center gap-2 pl-6 mt-2">
                             <div className="w-6 h-6 bg-indigo-900 rounded-full flex items-center justify-center text-[10px] text-white font-medium">
                                 {project.projectManager.split(' ').map(n=>n[0]).join('')}
                             </div>
                             <span className="text-sm text-gray-600">{project.projectManager}</span>
                        </div>
                    </div>
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                             <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-700">Budget</span>
                        </div>
                        <p className="text-sm text-gray-900 pl-6">{project.budget || 'N/A'}</p>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                     <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-indigo-50 rounded-full h-3">
                        <div
                            className="bg-indigo-900 h-3 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </Card>

        {/* Team Capacity Overview */}
        <Card className="border-t-4 border-t-orange-500">
             <div className="space-y-4">
                 <div>
                    <h2 className="text-lg font-semibold text-gray-900">Team Capacity Overview</h2>
                    <p className="text-sm text-gray-500">Total team allocation and capacity breakdown</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Team Size</p>
                        <p className="text-2xl font-bold text-gray-900">{totalMembers}</p>
                        <p className="text-xs text-gray-400">members</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Total Hours/Day</p>
                        <p className="text-2xl font-bold text-blue-600">{totalHoursPerDay}h</p>
                        <p className="text-xs text-gray-400">Combined capacity</p>
                    </div>
                     <div>
                        <p className="text-xs text-gray-500 mb-1">Full Capacity</p>
                        <p className="text-2xl font-bold text-gray-900">{fullCapacityCount}</p>
                        <p className="text-xs text-gray-400">8 hours/day each</p>
                    </div>
                     <div>
                        <p className="text-xs text-gray-500 mb-1">Half Capacity</p>
                        <p className="text-2xl font-bold text-gray-900">{halfCapacityCount}</p>
                        <p className="text-xs text-gray-400">4 hours/day each</p>
                    </div>
                </div>
             </div>
        </Card>
        
        {/* Team Members List */}
        <Card>
             <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
                    <p className="text-sm text-gray-500">Manage team assignments and capacity allocations</p>
                </div>
                <Button className="bg-indigo-900 text-white hover:bg-indigo-800 flex items-center gap-2">
                    <span>+</span> Add Team Member
                </Button>
            </div>

            <div className="space-y-4">
                {project.teamMembers.map((member) => (
                    <div key={member.id} className="p-4 border border-gray-100 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-indigo-900 rounded-full flex items-center justify-center text-white font-medium">
                                {member.initials}
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">{member.name}</h3>
                                <p className="text-xs text-gray-500">{member.role} • {member.department || 'Engineering'}</p>
                            </div>
                        </div>

                         <div className="flex flex-wrap gap-2 max-w-sm">
                            {member.skills?.map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-medium rounded border border-gray-200">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <select 
                                    className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8"
                                    defaultValue={member.capacity === 'Full' ? 'full' : 'half'}
                                >
                                    <option value="full">Full Capacity (8h/day)</option>
                                    <option value="half">Half Capacity (4h/day)</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                    </svg>
                                </div>
                            </div>
                            <button className="text-red-400 hover:text-red-600 p-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
      </div>
    </Layout>
  );
}
