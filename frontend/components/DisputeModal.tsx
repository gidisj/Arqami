import React, { useState } from 'react';
import { SimData } from '../types.ts';
import { AlertTriangle, Shield, Zap, FileText, Loader2 } from 'lucide-react';

interface DisputeModalProps {
  sim: SimData | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (simId: string) => void;
}

export const DisputeModal: React.FC<DisputeModalProps> = ({ sim, isOpen, onClose, onConfirm }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !sim) return null;

  const handleConfirm = () => {
    setIsProcessing(true);
    // Simulate API call for instant isolation
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm(sim.id);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gov-navyDark/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        
        <div className="bg-gov-red p-5 text-white flex items-center space-x-3">
          <AlertTriangle size={28} />
          <div>
            <h2 className="text-xl font-bold">Report Unknown Number</h2>
            <h3 className="text-sm opacity-90">إبلاغ واعتراض فوري</h3>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            You are about to report <strong className="text-gov-navy">{sim.number}</strong> ({sim.operator}) as an unrecognized number. 
            This action will trigger an <strong className="text-gov-red">instant network isolation</strong> (&lt; 500ms) and generate a legally binding Non-Liability Certificate.
          </p>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start space-x-3">
            <Shield className="text-orange-500 mt-0.5 flex-shrink-0" size={20} />
            <div className="text-sm text-orange-800">
              <p className="font-bold mb-1">Zero-Trust Action / إجراء أمني صارم</p>
              <p>The SIM will be immediately deactivated across all national switches. A formal report will be sent to the Cybercrime Investigation Unit.</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Zap size={16} className="text-gov-teal" />
              <span>Instant mTLS API Disconnect</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <FileText size={16} className="text-gov-teal" />
              <span>Auto-generate PKI Signed Disclaimer</span>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button 
              onClick={onClose}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Cancel / إلغاء
            </button>
            <button 
              onClick={handleConfirm}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-lg bg-gov-red text-white font-bold hover:bg-gov-redDark transition-colors flex items-center space-x-2 disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} />
                  <span>Confirm Isolation / تأكيد الإيقاف</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
