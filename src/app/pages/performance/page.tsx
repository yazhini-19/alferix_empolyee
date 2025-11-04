"use client";

import React from "react";
import Layout from "@/app/components/layout/Layout";
import Card from "@/app/components/ui/Card";
import Table from "@/app/components/ui/Table";
import { Performance } from "@/app/types/performance";

// Mock data
const mockPerformance: Performance[] = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "John Doe",
    period: "Q4 2024",
    rating: 4.8,
    goals: ["Complete project X", "Improve code quality", "Mentor junior developers"],
    achievements: ["Led team to successful project delivery", "Reduced bugs by 30%"],
    feedback: "Excellent performance. Strong leadership skills demonstrated.",
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "Jane Smith",
    period: "Q4 2024",
    rating: 4.5,
    goals: ["Increase brand awareness", "Launch new campaign", "Grow social media presence"],
    achievements: ["Campaign reached 1M impressions", "Social media followers increased by 25%"],
    feedback: "Great work on the marketing campaign. Keep up the momentum.",
  },
  {
    id: "3",
    employeeId: "3",
    employeeName: "Bob Johnson",
    period: "Q4 2024",
    rating: 4.2,
    goals: ["Exceed sales targets", "Acquire new clients", "Improve customer relations"],
    achievements: ["Exceeded target by 15%", "Acquired 10 new clients"],
    feedback: "Strong sales performance. Continue building client relationships.",
  },
  {
    id: "4",
    employeeId: "4",
    employeeName: "Alice Williams",
    period: "Q4 2024",
    rating: 4.6,
    goals: ["Improve hiring process", "Enhance employee satisfaction", "Streamline HR operations"],
    achievements: ["Reduced time-to-hire by 20%", "Employee satisfaction score improved"],
    feedback: "Outstanding HR management. Great improvements in processes.",
  },
];

export default function PerformancePage() {
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600 dark:text-green-400";
    if (rating >= 3.5) return "text-blue-600 dark:text-blue-400";
    if (rating >= 2.5) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const columns = [
    {
      header: "Employee",
      accessor: (row: Performance) => (
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{row.employeeName}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{row.period}</p>
        </div>
      ),
    },
    {
      header: "Rating",
      accessor: (row: Performance) => (
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-bold ${getRatingColor(row.rating)}`}>
            {row.rating}
          </span>
          <span className="text-gray-400">/ 5.0</span>
        </div>
      ),
    },
    {
      header: "Goals",
      accessor: (row: Performance) => (
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
          {row.goals.slice(0, 2).map((goal, idx) => (
            <li key={idx}>{goal}</li>
          ))}
          {row.goals.length > 2 && (
            <li className="text-gray-400">+{row.goals.length - 2} more</li>
          )}
        </ul>
      ),
    },
    {
      header: "Achievements",
      accessor: (row: Performance) => (
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
          {row.achievements.slice(0, 2).map((achievement, idx) => (
            <li key={idx}>{achievement}</li>
          ))}
        </ul>
      ),
    },
    {
      header: "Feedback",
      accessor: (row: Performance) => (
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
          {row.feedback}
        </p>
      ),
    },
  ];

  const averageRating =
    mockPerformance.reduce((sum, p) => sum + p.rating, 0) / mockPerformance.length;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Performance Reviews
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track and manage employee performance metrics
          </p>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Average Rating
              </p>
              <p className="mt-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
                {averageRating.toFixed(1)}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">out of 5.0</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Reviews Completed
              </p>
              <p className="mt-2 text-4xl font-bold text-green-600 dark:text-green-400">
                {mockPerformance.length}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">employees reviewed</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                High Performers
              </p>
              <p className="mt-2 text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                {mockPerformance.filter((p) => p.rating >= 4.5).length}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                rating ≥ 4.5
              </p>
            </div>
          </Card>
        </div>

        {/* Performance Table */}
        <Card title="Performance Reviews">
          <Table data={mockPerformance} columns={columns} />
        </Card>

        {/* Rating Distribution */}
        <Card title="Rating Distribution">
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = mockPerformance.filter(
                (p) => Math.floor(p.rating) === rating
              ).length;
              const percentage = (count / mockPerformance.length) * 100;
              return (
                <div key={rating} className="flex items-center gap-4">
                  <div className="w-12 text-right">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {rating}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                      <div
                        className="bg-blue-600 h-6 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-16 text-left">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {count} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </Layout>
  );
}

