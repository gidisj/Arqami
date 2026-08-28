import React, { useState, useEffect } from 'react';
import { ShieldAlert, Fingerprint, XCircle, CheckCircle2, QrCode, Clock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onApprove, onReject }) => {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [totp, setTotp] = useState('849 201');

  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose(); // Auto close or reject on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate TOTP rotation every 30s
    const totpTimer = setInterval(() => {
      setTotp(Math.floor(100000 + Math.random() * 900000).toString().replace(/(\d{3})(\d{3})/, '$1 $2'));
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(totpTimer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gov-navyDark/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 p-6 text-white text-center relative">
          <div className="absolute top-4 right-4 animate-pulse">
            <ShieldAlert size={24} className="text-white/80" />
          </div>
          <h2 className="text-xl font-bold mb-1">Proactive Authorization</h2>
          <h3 className="text-lg font-medium opacity-90">طلب تفويض استباقي</h3>
          <p className="text-sm mt-2 bg-white/20 inline-block px-3 py-1 rounded-full backdrop-blur-md">
            New SIM Issuance Request
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm space-y-2">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Operator / المشغل:</span>
              <span className="font-bold text-gov-navy">Omantel</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Branch / الفرع:</span>
              <span className="font-medium">Muscat City Center</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Agent ID / الموظف:</span>
              <span className="font-mono">#4092</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Time / الوقت:</span>
              <span className="font-medium">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Dynamic Token Area */}
          <div className="text-center space-y-3">
            <p className="text-xs font-bold text-gov-red uppercase tracking-wider">Never Share With Anyone / لا تشاركه مع أحد</p>
            <div className="flex justify-center items-center space-x-4">
              <div className="bg-gray-100 p-2 rounded-lg">
                <QrCode size={48} className="text-gov-navy" />
              </div>
              <div className="text-4xl font-mono font-bold tracking-widest text-gov-navy">
                {totp}
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm font-medium text-orange-600">
              <Clock size={16} />
              <span>Expires in: {formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button 
              onClick={onReject}
              className="flex flex-col items-center justify-center py-3 px-4 rounded-xl bg-gov-red/10 text-gov-red hover:bg-gov-red hover:text-white transition-colors border border-gov-red/20"
            >
              <XCircle size={24} className="mb-1" />
              <span className="font-bold text-sm">Reject & Lock</span>
              <span className="text-[10px]">رفض وإيقاف</span>
            </button>
            
            <button 
              onClick={onApprove}
              className="flex flex-col items-center justify-center py-3 px-4 rounded-xl bg-gov-teal text-white hover:bg-gov-tealLight transition-colors shadow-md shadow-gov-teal/20"
            >
              <Fingerprint size={24} className="mb-1" />
              <span className="font-bold text-sm">Approve (FIDO2)</span>
              <span className="text-[10px]">تأكيد وتفويض</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
