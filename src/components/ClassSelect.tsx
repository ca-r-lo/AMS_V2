import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sections = [
  "All",
  "CYGNUS",
  "EIM FARADS",
  "ARTS AND DESIGN",
];

const ClassSelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select section" />
      </SelectTrigger>
      <SelectContent>
        {sections.map((section) => (
          <SelectItem key={section} value={section}>
            {section}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ClassSelect;