import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const sectionSchema = z.object({
  name: z.string().min(1, "Section name is required"),
  gradeLevel: z.string().min(1, "Grade level is required"),
});

type SectionFormProps = {
  onSubmit: (data: z.infer<typeof sectionSchema>) => Promise<void>;
};

const SectionForm = ({ onSubmit }: SectionFormProps) => {
  const form = useForm({
    resolver: zodResolver(sectionSchema),
    defaultValues: { name: '', gradeLevel: '' }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gradeLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade Level</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register Section</Button>
      </form>
    </Form>
  );
};

export default SectionForm;