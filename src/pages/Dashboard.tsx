import { useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import ClassSelect from "@/components/ClassSelect";
import { getApiUrl } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "@/components/LoadingScreen";

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState("All");
  
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await fetch(getApiUrl('/api/dashboard'));
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      return response.json();
    }
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const stats = dashboardData?.stats || [];
  const recentActivity = dashboardData?.recent_activity || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center gap-4">
          <ClassSelect value={selectedSection} onChange={setSelectedSection} />
          <div className="flex items-center space-x-2 text-gray-500">
            <Clock className="w-5 h-5" />
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="stat-card"
          >
            <h3 className="stat-label">{stat.label}</h3>
            <p className="stat-value">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="table-container">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header px-6 py-3">Time</th>
                <th className="table-header px-6 py-3">Log</th>
                <th className="table-header px-6 py-3">LRN</th>
                <th className="table-header px-6 py-3">Name</th>
                <th className="table-header px-6 py-3">Section</th>
                <th className="table-header px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivity.map((entry, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="table-cell">{entry.time}</td>
                  <td className="table-cell">{entry.log}</td>
                  <td className="table-cell font-mono">{entry.lrn}</td>
                  <td className="table-cell font-medium">{entry.name}</td>
                  <td className="table-cell">{entry.section}</td>
                  <td className="table-cell">
                    <span className="status-badge status-left">
                      {entry.log}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;