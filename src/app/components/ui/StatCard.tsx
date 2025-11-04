import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

export default function StatCard({ title, value, change, trend, icon }: StatCardProps) {
  const trendColors = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    neutral: "text-gray-600 dark:text-gray-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <p className={`mt-2 text-sm ${trendColors[trend || "neutral"]}`}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

