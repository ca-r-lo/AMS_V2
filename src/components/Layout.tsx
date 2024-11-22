import { Home, LayoutDashboard, Users, ClipboardCheck, FileBarChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Students", path: "/students" },
    { icon: ClipboardCheck, label: "Attendance", path: "/attendance" },
    { icon: FileBarChart, label: "Reports", path: "/reports" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Modern Minimal Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-8">
              <img src="/logo.png" alt="School Logo" className="h-6 w-6" />
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-1.5" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => console.log("Logout clicked")}
              className="px-3 py-1.5 bg-red-500/10 text-red-600 text-sm font-medium rounded-md hover:bg-red-500/20 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;