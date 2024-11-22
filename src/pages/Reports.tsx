import { useState } from "react";
import ClassSelect from "@/components/ClassSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Download, FileSpreadsheet, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ReportStats } from "@/components/reports/ReportStats";
import { ReportTable } from "@/components/reports/ReportTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Reports = () => {
  const { toast } = useToast();
  const [selectedSection, setSelectedSection] = useState("All");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "MMMM"));
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from(
    { length: 10 },
    (_, i) => (new Date().getFullYear() - 5 + i).toString()
  );

  const handleExport = (type: 'excel' | 'pdf' | 'print') => {
    toast({
      title: `Exporting ${selectedMonth} ${selectedYear} Report`,
      description: `Generating ${type.toUpperCase()} report for ${selectedMonth} ${selectedYear}...`,
    });
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Reports</h1>
          <p className="text-gray-500 mt-1">Generate and download attendance reports</p>
        </div>
        <ClassSelect value={selectedSection} onChange={setSelectedSection} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-lg">Select Date Range</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Export Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Month
                </label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Year
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              className="w-full flex items-center gap-2" 
              variant="outline"
              onClick={() => handleExport('excel')}
            >
              <FileSpreadsheet className="w-4 h-4" />
              Export to Excel
            </Button>
            <Button 
              className="w-full flex items-center gap-2" 
              variant="outline"
              onClick={() => handleExport('pdf')}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button 
              className="w-full flex items-center gap-2" 
              variant="outline"
              onClick={() => handleExport('print')}
            >
              <Printer className="w-4 h-4" />
              Print Report
            </Button>
          </CardContent>
        </Card>

        <ReportStats />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Attendance Summary for {format(selectedDate, "MMMM yyyy")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <ReportTable />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;