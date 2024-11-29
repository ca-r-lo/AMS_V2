import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SearchBar from "@/components/SearchBar";
import RegisterForm from "@/components/RegisterForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'section' | 'student'>('section');
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const { data: sectionsData, refetch: refetchSections } = useQuery({
    queryKey: ['home-sections'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/home/sections`);
      if (!response.ok) throw new Error('Failed to fetch sections');
      return response.json();
    },
  });

  const { data: studentsData, refetch: refetchStudents } = useQuery({
    queryKey: ['home-students'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/home/students`);
      if (!response.ok) throw new Error('Failed to fetch students');
      return response.json();
    },
  });

  const handleRefresh = () => {
    refetchSections();
    refetchStudents();
  };

  const sections = sectionsData?.sections || [];
  const students = studentsData?.students || [];
  const currentData = activeTab === 'section' ? sections : students;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">School Management System</h1>
          <p className="text-gray-500">Manage sections and students</p>
        </div>
        <div className="space-x-2">
          <Button
            variant={activeTab === 'section' ? 'default' : 'outline'}
            onClick={() => setActiveTab('section')}
          >
            Sections
          </Button>
          <Button
            variant={activeTab === 'student' ? 'default' : 'outline'}
            onClick={() => setActiveTab('student')}
          >
            Students
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <SearchBar
          data={currentData}
          onSearch={setFilteredData}
          searchFields={activeTab === 'section' ? ['name', 'gradeLevel'] : ['firstName', 'lastName', 'lrn']}
          placeholder={`Search ${activeTab}s...`}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New {activeTab === 'section' ? 'Section' : 'Student'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New {activeTab === 'section' ? 'Section' : 'Student'}</DialogTitle>
            </DialogHeader>
            <RegisterForm 
              type={activeTab} 
              sections={sections}
              onSuccess={handleRefresh}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{activeTab === 'section' ? 'Sections' : 'Students'} List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {activeTab === 'section' ? (
                  <>
                    <TableHead>Section Name</TableHead>
                    <TableHead>Grade Level</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead>Name</TableHead>
                    <TableHead>LRN</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Age</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(filteredData.length > 0 ? filteredData : currentData).map((item: any) => (
                <TableRow key={item.id}>
                  {activeTab === 'section' ? (
                    <>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.gradeLevel}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="font-medium">
                        {`${item.firstName} ${item.middleName} ${item.lastName}`}
                      </TableCell>
                      <TableCell>{item.lrn}</TableCell>
                      <TableCell>{item.section?.name || 'N/A'}</TableCell>
                      <TableCell>{item.age}</TableCell>
                    </>
                  )}
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