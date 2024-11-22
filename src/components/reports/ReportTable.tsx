import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import AttendanceStatus from "../AttendanceStatus";

const fetchReports = async () => {
  const response = await fetch('http://localhost:5000/api/reports');
  if (!response.ok) throw new Error('Failed to fetch reports');
  return response.json();
};

export const ReportTable = () => {
  const { data: attendanceData, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports
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