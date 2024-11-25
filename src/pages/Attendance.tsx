import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ClassSelect from "@/components/ClassSelect";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AttendanceStatus from "@/components/AttendanceStatus";
import { Calendar } from "@/components/ui/calendar";
import SearchBar from "@/components/SearchBar";
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { API_BASE_URL } from "@/config/api";

const ITEMS_PER_PAGE = 25;

const Attendance = () => {
  const [selectedSection, setSelectedSection] = useState("All");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);

  const { data: attendanceData, isLoading } = useQuery({
    queryKey: ['attendance', selectedSection, selectedDate],
    queryFn: async () => {
      const params = new URLSearchParams({
        date: format(selectedDate, 'yyyy-MM-dd'),
        ...(selectedSection !== "All" && { section: selectedSection }),
      });
      const response = await fetch(`${API_BASE_URL}/api/attendance?${params}`);
      if (!response.ok) throw new Error('Failed to fetch attendance');
      return response.json();
    }
  });

  const attendance = attendanceData || [];

  const handleSearch = (filtered: any[]) => {
    setFilteredStudents(filtered);
    setCurrentPage(1);
  };

  // Calculate pagination
  const displayedStudents = filteredStudents.length > 0 ? filteredStudents : attendance;
  const totalPages = Math.ceil(displayedStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStudents = displayedStudents.slice(startIndex, endIndex);

  if (isLoading) return <div>Loading attendance data...</div>;

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-500 mt-1">Track and manage student attendance</p>
        </div>
        <ClassSelect value={selectedSection} onChange={setSelectedSection} />
      </div>

      <div className="grid md:grid-cols-[300px,1fr] gap-6">
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-lg">Select Date</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>
                Attendance for {format(selectedDate, "MMMM d, yyyy")}
              </CardTitle>
              <SearchBar
                data={attendance}
                onSearch={handleSearch}
                searchFields={["name"]}
                placeholder="Search students..."
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        <AttendanceStatus status={student.status} />
                      </TableCell>
                      <TableCell>{student.time}</TableCell>
                      <TableCell>
                        <button className="text-blue-600 hover:text-blue-800">
                          Edit
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;