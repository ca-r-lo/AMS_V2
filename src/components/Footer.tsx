const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#1A1F2C] text-white py-8 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              Empowering education through innovative attendance tracking solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="/students" className="hover:text-white transition-colors">Students</a></li>
              <li><a href="/reports" className="hover:text-white transition-colors">Reports</a></li>
            </ul>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">support@ubelo.com</p>
            <p className="text-sm text-gray-500 mt-4">&copy; {currentYear} Ubelo. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;