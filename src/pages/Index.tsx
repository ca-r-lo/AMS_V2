import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'sections' | 'students'>('sections');

  const sections = [
    { id: 1, name: "Section A", grade: "11", strand: "STEM" },
    { id: 2, name: "Section B", grade: "11", strand: "ABM" },
    { id: 3, name: "Section C", grade: "12", strand: "HUMSS" },
  ];

  const students = [
    { id: 1, name: "John Doe", lrn: "123456789012", section: "Section A", grade: "11" },
    { id: 2, name: "Jane Smith", lrn: "123456789013", section: "Section B", grade: "11" },
    { id: 3, name: "Bob Johnson", lrn: "123456789014", section: "Section C", grade: "12" },
  ];

  const handleAdd = () => {
    toast({
      title: "Add New",
      description: `Add new ${activeTab === 'sections' ? 'section' : 'student'} functionality will be implemented here.`,
    });
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Edit",
      description: `Edit ${activeTab === 'sections' ? 'section' : 'student'} with ID ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete",
      description: `Delete ${activeTab === 'sections' ? 'section' : 'student'} with ID ${id}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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

      <div className="flex justify-end">
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New {activeTab === 'sections' ? 'Section' : 'Student'}
        </Button>
      </div>

      {activeTab === 'sections' ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Section Name</TableHead>
              <TableHead>Grade Level</TableHead>
              <TableHead>Strand</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sections.map((section) => (
              <TableRow key={section.id}>
                <TableCell>{section.name}</TableCell>
                <TableCell>{section.grade}</TableCell>
                <TableCell>{section.strand}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(section.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(section.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>LRN</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.lrn}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(student.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(student.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Index;