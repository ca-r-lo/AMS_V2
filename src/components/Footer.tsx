const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#1A1F2C] text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm">
          <p>&copy; {currentYear} Ubelo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;