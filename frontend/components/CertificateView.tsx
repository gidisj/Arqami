import React from 'react';
import { UserProfile, SimData } from '../types.ts';
import { ShieldCheck, Download, ArrowLeft, Stamp } from 'lucide-react';

interface CertificateViewProps {
  user: UserProfile;
  sim: SimData;
  onBack: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ user, sim, onBack }) => {
  const timestamp = new Date().toISOString();
  const certId = `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center space-x-2 text-gov-navy hover:text-gov-teal transition-colors font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
      >
        <ArrowLeft size={20} />
        <span>Back / عودة</span>
      </button>

      <div className="bg-white shadow-xl rounded-sm border border-gray-200 overflow-hidden relative">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <ShieldCheck size={400} />
        </div>

        {/* Header */}
        <div className="border-b-4 border-gov-navy p-8 flex justify-between items-start bg-slate-50">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gov-navy rounded-full flex items-center justify-center text-white">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gov-navy uppercase tracking-wider">National Cyber Security Center</h1>
              <h2 className="text-lg text-gray-600">المركز الوطني للسلامة المعلوماتية</h2>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-mono text-gray-500">Ref: {certId}</p>
            <p className="text-sm font-mono text-gray-500">Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-10 space-y-8 relative z-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gov-navy border-b pb-4 inline-block">
              Digital Non-Liability Certificate
              <br/>
              <span className="text-2xl font-normal mt-2 block">شهادة إخلاء مسؤولية رقمية فورية</span>
            </h2>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-gray-800 leading-relaxed text-lg">
            <p className="mb-4 text-justify">
              This document certifies that the individual identified below has formally disputed the ownership and authorization of the telecommunications subscription detailed herein. 
              Effective immediately upon the timestamp recorded, the associated SIM card has been isolated from all national networks.
            </p>
            <p className="text-justify font-bold text-gov-navy bg-blue-50 p-4 rounded border-l-4 border-gov-navy">
              "تُخلي هذه الشهادة مسؤولية المواطن/المقيم الجنائية والمالية عن الرقم المذكور لحين استكمال التحقيق السيبراني من قبل الجهات المختصة."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 border-b pb-1">Citizen / Resident Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-gray-500">Full Name:</dt><dd className="font-bold">{user.fullNameEn}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Civil ID:</dt><dd className="font-mono font-bold">{user.civilId}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Trust Level:</dt><dd className="text-gov-teal font-bold">{user.trustLevel}</dd></div>
              </dl>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 border-b pb-1">Disputed Asset Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-gray-500">Phone Number:</dt><dd className="font-mono font-bold text-gov-red">{sim.number}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Operator:</dt><dd className="font-bold">{sim.operator}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Isolation Time:</dt><dd className="font-mono">{new Date(timestamp).toLocaleString()}</dd></div>
              </dl>
            </div>
          </div>

          {/* Footer / Seal */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-xs text-gray-400">Digitally signed via National PKI</p>
              <p className="text-xs font-mono text-gray-400 break-all max-w-md">
                Hash: 8f4e2a1b9c7d5e3f0a2b4c6d8e0f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5
              </p>
            </div>
            <div className="flex flex-col items-center text-gov-teal opacity-80">
              <Stamp size={64} strokeWidth={1.5} />
              <span className="text-xs font-bold mt-2 uppercase tracking-widest">Verified Authentic</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button className="bg-gov-navy text-white px-6 py-3 rounded-lg font-bold hover:bg-gov-navyDark transition-colors flex items-center space-x-2 shadow-lg">
          <Download size={20} />
          <span>Download PDF / تحميل الشهادة</span>
        </button>
      </div>
    </div>
  );
};
