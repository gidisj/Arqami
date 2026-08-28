import React from 'react';
import { SimData } from '../types.ts';
import { FileText, AlertTriangle } from 'lucide-react';

interface DisputesViewProps {
  disputedSims: SimData[];
  onViewCert: (sim: SimData) => void;
}

export const DisputesView: React.FC<DisputesViewProps> = ({ disputedSims, onViewCert }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-bold text-gov-navy">Disputes / البلاغات</h2>
        <span className="text-sm text-gray-500">Legally binding records</span>
      </div>
      
      {disputedSims.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-gray-500 shadow-sm">
          <div className="flex justify-center mb-4 text-gray-300">
            <AlertTriangle size={48} />
          </div>
          <p className="text-lg font-medium">No disputes found.</p>
          <p className="text-sm">لا توجد بلاغات مسجلة</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {disputedSims.map(sim => (
            <div key={sim.id} className="bg-white p-5 rounded-xl border border-red-200 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm gap-4">
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-3 rounded-full text-red-600">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gov-navy tracking-wider" dir="ltr">{sim.number}</h3>
                  <p className="text-sm text-gray-500 font-medium">{sim.operator} • Suspended / موقوف</p>
                  <p className="text-xs text-gray-400 mt-1">Reg: {sim.registrationDate}</p>
                </div>
              </div>
              <button
                onClick={() => onViewCert(sim)}
                className="w-full md:w-auto flex items-center justify-center space-x-2 text-gov-teal hover:text-white font-medium bg-gov-teal/10 hover:bg-gov-teal px-5 py-2.5 rounded-lg transition-colors border border-gov-teal/20"
              >
                <FileText size={18} />
                <span>View Certificate / عرض الشهادة</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
