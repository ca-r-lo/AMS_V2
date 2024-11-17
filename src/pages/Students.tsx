import { useState } from "react";
import ClassSelect from "@/components/ClassSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Students = () => {
  const [selectedSection, setSelectedSection] = useState("All");

  // Mock data - in a real app, this would come from an API
  const students = [
    { id: 1, name: "John Doe", section: "CYGNUS", status: "in_school", timeIn: "7:30 AM", timeOut: null },
    { id: 2, name: "Jane Smith", section: "EIM FARADS", status: "left_school", timeIn: "7:25 AM", timeOut: "3:30 PM" },
    { id: 3, name: "Mike Johnson", section: "ARTS AND DESIGN", status: "absent", timeIn: null, timeOut: null },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      in_school: { label: "In School", class: "bg-green-100 text-green-800" },
      left_school: { label: "Left School", class: "bg-yellow-100 text-yellow-800" },
      absent: { label: "Absent", class: "bg-red-100 text-red-800" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  const filteredStudents = selectedSection === "All" 
    ? students 
    : students.filter(student => student.section === selectedSection);

  const stats = {
    total: students.length,
    inSchool: students.filter(s => s.status === "in_school").length,
    leftSchool: students.filter(s => s.status === "left_school").length,
    absent: students.filter(s => s.status === "absent").length,
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
              {filteredStudents.map((student) => (
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Students;