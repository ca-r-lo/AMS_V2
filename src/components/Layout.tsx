import { Home, LayoutDashboard, Users, ClipboardCheck, FileBarChart, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Students", path: "/students" },
    { icon: ClipboardCheck, label: "Attendance", path: "/attendance" },
    { icon: FileBarChart, label: "Reports", path: "/reports" },
  ];

  const NavLinks = () => (
    <>
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
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Icon className="w-4 h-4 mr-1.5" />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-8">
              <img src="/logo.png" alt="School Logo" className="h-6 w-6" />
              <div className="hidden md:flex items-center gap-1">
                <NavLinks />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-sm font-medium text-gray-600">
                <span className="mr-2">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <span>
                  {currentTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                  })}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-red-500/10 text-red-600 text-sm font-medium rounded-md hover:bg-red-500/20 transition-colors"
              >
                Logout
              </button>
              
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="md:hidden p-2">
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col gap-4 mt-6">
                    <NavLinks />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;