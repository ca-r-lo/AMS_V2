import { useState } from "react";
import ClassSelect from "@/components/ClassSelect";
import { Button } from "@/components/ui/button";

const Reports = () => {
  const [selectedSection, setSelectedSection] = useState("CYGNUS");
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">School Year 2024-2025 Records</h1>
        <ClassSelect value={selectedSection} onChange={setSelectedSection} />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Select Month</h2>
          <div className="space-y-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          <div className="space-y-4">
            <p>Selected Date: {selectedDate || "None"}</p>
            <Button className="bg-green-500 hover:bg-green-600">
              Export
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        {/* Similar table structure as Dashboard */}
      </div>
    </div>
  );
};

export default Reports;