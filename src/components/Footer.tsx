const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-6 w-6" />
          <span className="text-sm text-gray-600">
            © {currentYear} Ubelo. All rights reserved.
          </span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a 
            href="/dashboard" 
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            Dashboard
          </a>
          <a 
            href="/students" 
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            Students
          </a>
          <a 
            href="/reports" 
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            Reports
          </a>
          <a 
            href="mailto:support@ubelo.com" 
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            support@ubelo.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;