const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">IO</span>
              </div>
              <span className="ml-2 text-lg font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Incognoir
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Next-generation immunological surveillance platform
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Incognoir. All rights reserved.
            </p>
            
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700/50 text-center">
          <p className="text-xs text-gray-500">
            This system monitors and analyzes immunological traffic patterns to detect anomalies and threats.
            All data is encrypted and processed in compliance with security protocols.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;