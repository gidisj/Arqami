import React from 'react';
import { X, Phone, ShieldAlert, Building2, AlertTriangle } from 'lucide-react';

interface EmergencyNumbersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyNumbersModal: React.FC<EmergencyNumbersModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const contacts = [
    {
      id: 'tra',
      titleEn: 'Telecommunications Regulatory Authority (TRA)',
      titleAr: 'هيئة تنظيم الاتصالات',
      number: '1000',
      icon: <Building2 size={24} className="text-gov-navy" />,
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-gov-navy'
    },
    {
      id: 'rop',
      titleEn: 'ROP - Cyber Extortion & Fraud',
      titleAr: 'شرطة عمان السلطانية - الابتزاز والاحتيال الإلكتروني',
      number: '80077444',
      icon: <ShieldAlert size={24} className="text-gov-red" />,
      color: 'bg-red-50 border-red-200',
      textColor: 'text-gov-red'
    },
    {
      id: 'cert',
      titleEn: 'Oman National CERT',
      titleAr: 'المركز الوطني للسلامة المعلوماتية',
      number: '24166828',
      icon: <AlertTriangle size={24} className="text-orange-500" />,
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gov-navyDark/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gov-navy p-5 text-white flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Phone size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Emergency & Support</h2>
              <h3 className="text-xs opacity-90">أرقام الطوارئ والدعم الفني</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600 mb-4 text-center">
            For immediate assistance regarding telecom fraud, identity theft, or regulatory inquiries, please contact the official authorities below.
            <br/>
            <span className="block mt-1 font-medium" dir="rtl">
              للحصول على مساعدة فورية بشأن الاحتيال، سرقة الهوية، أو الاستفسارات التنظيمية، يرجى التواصل مع الجهات الرسمية أدناه.
            </span>
          </p>

          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className={`p-4 rounded-xl border ${contact.color} flex flex-col md:flex-row items-center justify-between gap-4 transition-transform hover:scale-[1.02]`}>
                <div className="flex items-center space-x-4 w-full md:w-auto">
                  <div className="bg-white p-3 rounded-full shadow-sm flex-shrink-0">
                    {contact.icon}
                  </div>
                  <div className="text-left md:text-left w-full">
                    <h4 className="font-bold text-gray-900 text-sm">{contact.titleEn}</h4>
                    <h5 className="font-medium text-gray-600 text-xs mt-0.5" dir="rtl">{contact.titleAr}</h5>
                  </div>
                </div>
                <a 
                  href={`tel:${contact.number}`}
                  className={`flex items-center justify-center space-x-2 px-5 py-2.5 bg-white rounded-lg shadow-sm border border-gray-200 font-bold text-lg tracking-wider ${contact.textColor} hover:bg-gray-50 transition-colors w-full md:w-auto flex-shrink-0`}
                  dir="ltr"
                >
                  <Phone size={18} />
                  <span>{contact.number}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-center">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close / إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
