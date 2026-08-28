import React from 'react';
import { MessageSquare, PhoneCall, Ear, ShieldAlert } from 'lucide-react';

interface FloatingSidebarProps {
  onOpenChat: () => void;
  onOpenSignLanguage: () => void;
}

export const FloatingSidebar: React.FC<FloatingSidebarProps> = ({ onOpenChat, onOpenSignLanguage }) => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-3">
      <div className="bg-white shadow-lg rounded-full p-2 flex flex-col space-y-4 border border-gov-border">
        <button 
          onClick={onOpenChat}
          className="p-3 rounded-full bg-gray-50 text-gov-navy hover:bg-gov-navy hover:text-white transition-all group relative" 
          aria-label="Live Chatbot"
        >
          <MessageSquare size={20} />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
            Live Chat / محادثة
          </span>
        </button>
        <button className="p-3 rounded-full bg-gray-50 text-gov-navy hover:bg-gov-navy hover:text-white transition-all group relative" aria-label="24/7 Hotline">
          <PhoneCall size={20} />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
            1000 Hotline / الخط الساخن
          </span>
        </button>
        <button 
          onClick={onOpenSignLanguage}
          className="p-3 rounded-full bg-gray-50 text-gov-navy hover:bg-gov-navy hover:text-white transition-all group relative" 
          aria-label="Sign-Language Support"
        >
          <Ear size={20} />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
            Sign Language / لغة الإشارة
          </span>
        </button>
        <div className="w-full h-px bg-gray-200 my-1"></div>
        <button className="p-3 rounded-full bg-gov-red/10 text-gov-red hover:bg-gov-red hover:text-white transition-all group relative" aria-label="Emergency Lock">
          <ShieldAlert size={20} />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gov-red text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
            Emergency Lock / قفل طارئ
          </span>
        </button>
      </div>
    </div>
  );
};
