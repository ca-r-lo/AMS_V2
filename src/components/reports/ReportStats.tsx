import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/api";

export const ReportStats = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['reportStats'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    }
  });

  if (isLoading) return <div>Loading stats...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats?.average_attendance}%</div>
            <p className="text-sm text-gray-500">Average Attendance Rate</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats?.daily_average}</div>
            <p className="text-sm text-gray-500">Average Daily Attendance</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stats?.chronic_absences}</div>
            <p className="text-sm text-gray-500">Chronic Absences</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};