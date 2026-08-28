import React from 'react';
import { SimData, SimStatus, Operator } from '../types.ts';
import { Smartphone, Activity, AlertOctagon, ChevronRight, Wifi, Cpu } from 'lucide-react';

interface SimCardProps {
  sim: SimData;
  onDispute: (sim: SimData) => void;
}

export const SimCard: React.FC<SimCardProps> = ({ sim, onDispute }) => {
  const isActive = sim.status === SimStatus.ACTIVE;
  
  const getOperatorColor = (op: Operator) => {
    switch(op) {
      case Operator.OMANTEL: return 'text-blue-600 bg-blue-50 border-blue-200';
      case Operator.OOREDOO: return 'text-red-600 bg-red-50 border-red-200';
      case Operator.VODAFONE: return 'text-red-500 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getIcon = () => {
    if (sim.type === 'eSIM') return <Wifi size={18} />;
    if (sim.type === 'IoT') return <Cpu size={18} />;
    return <Smartphone size={18} />;
  };

  return (
    <div className={`bg-white rounded-xl border ${isActive ? 'border-gov-border shadow-sm hover:shadow-md' : 'border-gray-200 opacity-75'} transition-all overflow-hidden flex flex-col`}>
      {/* Card Header */}
      <div className={`px-5 py-3 border-b flex justify-between items-center ${getOperatorColor(sim.operator)}`}>
        <div className="flex items-center space-x-2 font-bold">
          {getIcon()}
          <span>{sim.operator}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isActive ? 'bg-gov-teal/10 text-gov-teal' : 'bg-gray-200 text-gray-600'}`}>
            {sim.status}
          </span>
          {isActive && <span className="w-2 h-2 rounded-full bg-gov-teal animate-pulse"></span>}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-grow">
        <div className="text-2xl font-bold text-gov-navy tracking-wider mb-1" dir="ltr">
          {sim.number}
        </div>
        <div className="text-sm text-gray-500 mb-4 flex items-center space-x-2">
          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">{sim.type}</span>
          <span>•</span>
          <span>Reg: {sim.registrationDate}</span>
        </div>
        
        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>IMEI Linked:</span>
            <span className="font-mono text-gray-700">{sim.imei.substring(0, 8)}...</span>
          </div>
          <div className="flex justify-between">
            <span>Last Active:</span>
            <span className="text-gray-700">{sim.lastActive || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <button className="text-sm font-medium text-gov-navy hover:text-gov-teal transition-colors flex items-center space-x-1">
          <Activity size={16} />
          <span>Details / التفاصيل</span>
        </button>
        
        {isActive && (
          <button 
            onClick={() => onDispute(sim)}
            className="text-sm font-medium text-gov-red hover:text-gov-redDark transition-colors flex items-center space-x-1 bg-gov-red/5 hover:bg-gov-red/10 px-3 py-1.5 rounded-md"
          >
            <AlertOctagon size={16} />
            <span>Not Mine / لست أنا</span>
          </button>
        )}
      </div>
    </div>
  );
};
