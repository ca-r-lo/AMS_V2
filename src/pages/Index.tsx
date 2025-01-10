import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Plus, Trash2 } from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'section' | 'student'>('section');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get user role from localStorage
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user?.role === "admin";

  const { data: sectionsData, refetch: refetchSections, isLoading: isLoadingSections } = useQuery({
    queryKey: ['home-sections'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/home/sections`);
      if (!response.ok) throw new Error('Failed to fetch sections');
      return response.json();
    },
  });

  const { data: studentsData, refetch: refetchStudents, isLoading: isLoadingStudents } = useQuery({
    queryKey: ['home-students'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/home/students`);
      if (!response.ok) throw new Error('Failed to fetch students');
      return response.json();
    },
  });

  const deleteSection = useMutation({
    mutationFn: async (sectionId: number) => {
      const response = await fetch(`${API_BASE_URL}/api/sections/${sectionId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete section');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Section deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['home-sections'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteStudent = useMutation({
    mutationFn: async (studentId: number) => {
      const response = await fetch(`${API_BASE_URL}/api/students/${studentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete student');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Student deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['home-students'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleRefresh = () => {
    refetchSections();
    refetchStudents();
  };

  const sections = sectionsData?.sections || [];
  const students = studentsData?.students || [];
  const currentData = activeTab === 'section' ? sections : students;
  const isLoading = activeTab === 'section' ? isLoadingSections : isLoadingStudents;

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

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
          searchFields={activeTab === 'section' ? ['name', 'gradeLevel', 'shift'] : ['firstName', 'lastName', 'lrn']}
          placeholder={`Search ${activeTab}s...`}
        />
        {isAdmin && (
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
        )}
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
                    <TableHead>Shift</TableHead>
                    {isAdmin && <TableHead>Actions</TableHead>}
                  </>
                ) : (
                  <>
                    <TableHead>Name</TableHead>
                    <TableHead>LRN</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Age</TableHead>
                    {isAdmin && <TableHead>Actions</TableHead>}
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
                      <TableCell className="capitalize">{item.shift}</TableCell>
                      {isAdmin && (
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Section</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this section? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteSection.mutate(item.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      )}
                    </>
                  ) : (
                    <>
                      <TableCell className="font-medium">
                        {`${item.firstName} ${item.middleName} ${item.lastName}`}
                      </TableCell>
                      <TableCell>{item.lrn}</TableCell>
                      <TableCell>{item.section?.name}</TableCell>
                      <TableCell>{item.age}</TableCell>
                      {isAdmin && (
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Student</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this student? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteStudent.mutate(item.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      )}
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