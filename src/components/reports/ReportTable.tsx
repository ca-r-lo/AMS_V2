import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import AttendanceStatus from "../AttendanceStatus";
import { API_BASE_URL } from "@/config/api";

export const ReportTable = () => {
  const { data: attendanceData, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/reports`);
      if (!response.ok) throw new Error('Failed to fetch reports');
      return response.json();
    }
  });

  if (isLoading) return <div>Loading reports...</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Present</TableHead>
          <TableHead className="text-right">Absent</TableHead>
          <TableHead className="text-right">Late</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendanceData?.map((row: any) => (
          <TableRow key={row.id}>
            <TableCell>{row.date}</TableCell>
            <TableCell className="text-right text-green-600">{row.present}</TableCell>
            <TableCell className="text-right text-red-600">{row.absent}</TableCell>
            <TableCell className="text-right text-yellow-600">{row.late}</TableCell>
            <TableCell className="text-right font-medium">{row.total}</TableCell>
            <TableCell className="text-right">
              <AttendanceStatus status={row.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};