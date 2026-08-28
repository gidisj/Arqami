import React from 'react';
import { Globe, Search, ShieldCheck, Bell, User, Menu } from 'lucide-react';

export const TopNav: React.FC = () => {
  return (
    <header className="w-full flex flex-col shadow-sm z-40 relative">
      {/* Utility Bar */}
      <div className="bg-gov-navyDark text-white text-xs py-1.5 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline-block opacity-80">Oman National Cyber Security Center</span>
          <a href="#" className="hover:text-gov-tealLight transition-colors">Tajawob Portal / تجاوب</a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 hover:text-gov-tealLight transition-colors">
            <Globe size={14} />
            <span>العربية</span>
          </button>
          <button className="hover:text-gov-tealLight transition-colors" aria-label="Accessibility">
            <span className="font-bold text-sm">Aa</span>
          </button>
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-white border-b border-gov-border py-3 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-gov-navy text-white p-2 rounded-lg">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gov-navy leading-tight">Arqami <span className="font-normal text-gray-400 mx-1">|</span> أرقامي</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Telecom Identity Protection</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6 text-sm font-medium text-gray-600">
            <a href="#" className="text-gov-navy border-b-2 border-gov-navy pb-1">Dashboard / الرئيسية</a>
            <a href="#" className="hover:text-gov-navy transition-colors">Disputes / البلاغات</a>
            <a href="#" className="hover:text-gov-navy transition-colors">History / السجل</a>
          </nav>
          
          <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
            <button className="text-gray-400 hover:text-gov-navy transition-colors">
              <Search size={20} />
            </button>
            <button className="text-gray-400 hover:text-gov-navy transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-gov-red rounded-full"></span>
            </button>
            <button className="bg-gov-teal text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gov-tealLight transition-colors shadow-sm flex items-center space-x-2">
              <User size={16} />
              <span>E-Services / الخدمات</span>
            </button>
          </div>
        </div>

        <button className="md:hidden text-gov-navy">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};
