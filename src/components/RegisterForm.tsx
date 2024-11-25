import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL } from "@/config/api";
import SectionForm from "./forms/SectionForm";
import StudentForm from "./forms/StudentForm";

const RegisterForm = ({ 
  type,
  sections,
  onSuccess 
}: { 
  type: 'section' | 'student';
  sections?: { id: number; name: string }[];
  onSuccess: () => void;
}) => {
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/${type}s`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Registration failed');

      const result = await response.json();
      toast({
        title: "Success",
        description: result.message,
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (type === 'section') {
    return <SectionForm onSubmit={handleSubmit} />;
  }

  return <StudentForm sections={sections || []} onSubmit={handleSubmit} />;
};

export default RegisterForm;