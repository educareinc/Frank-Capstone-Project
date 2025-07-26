import React from 'react';
import { Mail, MapPin, Phone, User } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full mt-24 py-8 bg-black bg-opacity-20 border-t border-slate-700/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <p className="text-xl font-bold gradient-text">Frank Project</p>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Frank Zakaria. All Rights Reserved.</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-sm text-slate-300">
            <div className="flex items-center justify-center md:justify-start">
              <User className="w-4 h-4 mr-2 text-primary" />
              <span>Frank Zakaria</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <span>Tanzania</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Mail className="w-4 h-4 mr-2 text-primary" />
              <a href="mailto:frankzakaria89@gmail.com" className="hover:text-primary transition-colors">frankzakaria89@gmail.com</a>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Phone className="w-4 h-4 mr-2 text-primary" />
              <span>+255 756 525 252</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;