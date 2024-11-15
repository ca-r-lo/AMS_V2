import { Home, LayoutDashboard, Users, ClipboardCheck, FileBarChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const currentTime = new Date().toLocaleString();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Students", path: "/students" },
    { icon: ClipboardCheck, label: "Attendance", path: "/attendance" },
    { icon: FileBarChart, label: "Reports", path: "/reports" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#1A1F2C] text-white">
        <div className="p-4">
          <img src="/logo.png" alt="School Logo" className="w-24 h-24 mx-auto mb-6" />
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm ${
                  isActive
                    ? "bg-white/10 border-l-4 border-white"
                    : "hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-64 p-4 bg-[#1A1F2C]">
          <div className="text-sm text-gray-400">{currentTime}</div>
          <button
            onClick={() => console.log("Logout clicked")}
            className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;