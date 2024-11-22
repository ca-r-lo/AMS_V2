const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-[#1A1F2C] to-[#2A2F3C] text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">About Us</h3>
            <p className="text-gray-300 leading-relaxed">
              Empowering education through innovative attendance tracking solutions. Building the future of classroom management.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/students" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  Students
                </a>
              </li>
              <li>
                <a href="/reports" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  Reports
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-300">support@ubelo.com</p>
              <p className="text-gray-300">+1 (555) 123-4567</p>
            </div>
            <div className="pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">&copy; {currentYear} Ubelo. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;