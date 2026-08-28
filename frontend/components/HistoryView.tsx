import React from 'react';
import { HistoryEvent } from '../types.ts';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface HistoryViewProps {
  history: HistoryEvent[];
}

export const HistoryView: React.FC<HistoryViewProps> = ({ history }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-bold text-gov-navy">Activity History / سجل النشاطات</h2>
        <span className="text-sm text-gray-500">Immutable Audit Trail</span>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {history.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No history available.</div>
        ) : (
          history.map((event, idx) => (
            <div key={event.id} className={`p-5 flex items-start space-x-4 hover:bg-gray-50 transition-colors ${idx !== history.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className={`mt-1 flex-shrink-0 ${event.status === 'Success' ? 'text-green-500' : event.status === 'Danger' ? 'text-red-500' : 'text-blue-500'}`}>
                {event.status === 'Success' ? <CheckCircle size={24} /> : event.status === 'Danger' ? <AlertCircle size={24} /> : <Info size={24} />}
              </div>
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                  <h4 className="font-bold text-gray-800 text-lg">{event.action}</h4>
                  <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">{event.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{event.details}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
