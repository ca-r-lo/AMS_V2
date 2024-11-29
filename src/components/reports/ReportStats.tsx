import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/api";
import LoadingScreen from "@/components/LoadingScreen";

interface ReportStatsProps {
  selectedMonth: string;
  selectedYear: string;
}

export const ReportStats = ({ selectedMonth, selectedYear }: ReportStatsProps) => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['reportStats', selectedMonth, selectedYear],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/stats?month=${selectedMonth}&year=${selectedYear}`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    }
  });

  if (isLoading) return <LoadingScreen size="sm" />;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Quick Stats for {selectedMonth} {selectedYear}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="p-6 bg-green-50 rounded-lg flex flex-col justify-center min-h-[120px]">
          <div className="text-4xl font-bold text-green-600">{stats?.average_attendance}%</div>
          <p className="text-sm text-gray-600">Average Attendance Rate</p>
        </div>
        <div className="p-6 bg-blue-50 rounded-lg flex flex-col justify-center min-h-[120px]">
          <div className="text-4xl font-bold text-blue-600">{stats?.daily_average}</div>
          <p className="text-sm text-gray-600">Average Daily Attendance</p>
        </div>
        <div className="p-6 bg-purple-50 rounded-lg flex flex-col justify-center min-h-[120px]">
          <div className="text-4xl font-bold text-purple-600">{stats?.chronic_absences}</div>
          <p className="text-sm text-gray-600">Chronic Absences</p>
        </div>
      </CardContent>
    </Card>
  );
};