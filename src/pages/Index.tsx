import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash, Users, School, Clock, CalendarCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 25;

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'sections' | 'students'>('sections');
  const [currentPage, setCurrentPage] = useState(1);

  // Generate more mock data for demonstration
  const sections = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Section ${index + 1}`,
    grade: Math.random() > 0.5 ? "11" : "12",
    strand: ["STEM", "ABM", "HUMSS"][index % 3],
    totalStudents: 25 + Math.floor(Math.random() * 10),
    present: 20 + Math.floor(Math.random() * 5),
    absent: Math.floor(Math.random() * 5),
  }));

  const recentActivity = [
    { id: 1, time: "08:30 AM", action: "Time In", student: "John Doe", section: "CYGNUS" },
    { id: 2, time: "08:35 AM", action: "Time In", student: "Jane Smith", section: "EIM FARADS" },
    { id: 3, time: "09:00 AM", action: "Late", student: "Mike Johnson", section: "ARTS AND DESIGN" },
  ];

  const stats = [
    { id: 1, label: "Total Students", value: "90", icon: Users, color: "text-blue-600" },
    { id: 2, label: "Total Sections", value: "3", icon: School, color: "text-green-600" },
    { id: 3, label: "Present Today", value: "79", icon: Clock, color: "text-yellow-600" },
    { id: 4, label: "Attendance Rate", value: "88%", icon: CalendarCheck, color: "text-purple-600" },
  ];

  const handleAction = (action: string, id: number) => {
    toast({
      title: action,
      description: `${action} action triggered for ID ${id}`,
    });
  };

  // Calculate pagination
  const totalPages = Math.ceil(sections.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSections = sections.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Overview of school attendance system</p>
        </div>
        <div className="space-x-2">
          <Button
            variant={activeTab === 'sections' ? 'default' : 'outline'}
            onClick={() => setActiveTab('sections')}
          >
            Sections
          </Button>
          <Button
            variant={activeTab === 'students' ? 'default' : 'outline'}
            onClick={() => setActiveTab('students')}
          >
            Students
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Section Overview</CardTitle>
          <Button onClick={() => handleAction('Add', 0)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Section
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Section Name</TableHead>
                <TableHead>Grade Level</TableHead>
                <TableHead>Strand</TableHead>
                <TableHead>Total Students</TableHead>
                <TableHead>Present Today</TableHead>
                <TableHead>Absent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSections.map((section) => (
                <TableRow key={section.id}>
                  <TableCell className="font-medium">{section.name}</TableCell>
                  <TableCell>{section.grade}</TableCell>
                  <TableCell>{section.strand}</TableCell>
                  <TableCell>{section.totalStudents}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {section.present}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-red-50 text-red-700">
                      {section.absent}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleAction('Edit', section.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleAction('Delete', section.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </TableCell>
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

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Section</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.time}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      activity.action === "Late" 
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-green-50 text-green-700"
                    }>
                      {activity.action}
                    </Badge>
                  </TableCell>
                  <TableCell>{activity.student}</TableCell>
                  <TableCell>{activity.section}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
