import { Badge } from "@/components/ui/badge";

interface AttendanceStatusProps {
  status: string;
}

const AttendanceStatus = ({ status }: AttendanceStatusProps) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'complete':
        return { class: 'bg-green-100 text-green-800', label: 'Complete' };
      case 'pending':
        return { class: 'bg-yellow-100 text-yellow-800', label: 'Pending' };
      case 'absent':
        return { class: 'bg-red-100 text-red-800', label: 'Absent' };
      default:
        return { class: 'bg-gray-100 text-gray-800', label: status };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={config.class}>
      {config.label}
    </Badge>
  );
};

export default AttendanceStatus;