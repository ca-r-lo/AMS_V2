import { useState } from "react";
import ClassSelect from "@/components/ClassSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/SearchBar";
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
const generateMockStudents = () => {
  return Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Student ${index + 1}`,
    section: ["CYGNUS", "EIM FARADS", "ARTS AND DESIGN"][index % 3],
    status: ["in_school", "left_school", "absent"][Math.floor((index * 7) % 3)],
    timeIn: index % 3 === 2 ? null : `7:${(25 + (index * 3) % 30).toString().padStart(2, '0')} AM`,
    timeOut: index % 3 === 1 ? "3:30 PM" : null,
  }));
};

const mockStudents = generateMockStudents();

const Students = () => {
  const [selectedSection, setSelectedSection] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredStudents, setFilteredStudents] = useState<any[]>(mockStudents);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      in_school: { label: "In School", class: "bg-green-100 text-green-800" },
      left_school: { label: "Left School", class: "bg-yellow-100 text-yellow-800" },
      absent: { label: "Absent", class: "bg-red-100 text-red-800" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  const handleSearch = (filtered: any[]) => {
    setFilteredStudents(filtered);
    setCurrentPage(1);
  };

  const displayedStudents = selectedSection === "All" 
    ? filteredStudents
    : filteredStudents.filter(student => student.section === selectedSection);

  // Calculate pagination
  const totalPages = Math.ceil(displayedStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentStudents = displayedStudents.slice(startIndex, endIndex);

  const stats = {
    total: mockStudents.length,
    inSchool: mockStudents.filter(s => s.status === "in_school").length,
    leftSchool: mockStudents.filter(s => s.status === "left_school").length,
    absent: mockStudents.filter(s => s.status === "absent").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Students Overview</h1>
          <p className="text-gray-500">Current status of all students</p>
        </div>
        <ClassSelect value={selectedSection} onChange={setSelectedSection} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">In School</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.inSchool}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Left School</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.leftSchool}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <SearchBar
          data={mockStudents}
          onSearch={handleSearch}
          searchFields={["name", "section"]}
          placeholder="Search students..."
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Status List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time In</TableHead>
                <TableHead>Time Out</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell>{student.timeIn || "-"}</TableCell>
                  <TableCell>{student.timeOut || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

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
  );
};

export default Students;
