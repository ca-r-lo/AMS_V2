import { useState } from "react";
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

const ITEMS_PER_PAGE = 25;

// Move mock data outside component to prevent regeneration on re-renders
const generateMockAttendance = () => {
  return Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Student ${index + 1}`,
    status: ["present", "absent", "late"][Math.floor((index * 13) % 3)],
    time: index % 3 === 0 ? "-" : `${8 + Math.floor((index * 7) % 2)}:${Math.floor((index * 11) % 60).toString().padStart(2, '0')} AM`,
  }));
};

const mockAttendance = generateMockAttendance();

const Attendance = () => {
  const [selectedSection, setSelectedSection] = useState("All");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredStudents, setFilteredStudents] = useState<any[]>(mockAttendance);

  const handleSearch = (filtered: any[]) => {
    setFilteredStudents(filtered);
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

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
                data={mockAttendance}
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
                  
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
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
