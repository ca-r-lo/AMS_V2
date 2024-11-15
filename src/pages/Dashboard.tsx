import { useState } from "react";
import ClassSelect from "@/components/ClassSelect";

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState("All");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Students Overview - Current Status</h1>
        <ClassSelect value={selectedSection} onChange={setSelectedSection} />
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Male</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3">Name</th>
                <th className="pb-3">LRN</th>
                <th className="pb-3">Section</th>
                <th className="pb-3">Strand</th>
                <th className="pb-3">Track</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Table content will be populated with actual data */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;