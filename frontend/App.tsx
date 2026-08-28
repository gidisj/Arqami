import React, { useState, useEffect } from 'react';
import { FloatingSidebar } from './components/FloatingSidebar.tsx';
import { SimCard } from './components/SimCard.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { DisputeModal } from './components/DisputeModal.tsx';
import { CertificateView } from './components/CertificateView.tsx';
import { DisputesView } from './components/DisputesView.tsx';
import { HistoryView } from './components/HistoryView.tsx';
import { Chatbot } from './components/Chatbot.tsx';
import { SignLanguageModal } from './components/SignLanguageModal.tsx';
import { EmergencyNumbersModal } from './components/EmergencyNumbersModal.tsx';
import { MOCK_USER, MOCK_SIMS, MOCK_HISTORY } from './constants.ts';
import { SimData, SimStatus, HistoryEvent } from './types.ts';
import { ShieldCheck, AlertCircle, Smartphone } from 'lucide-react';

type ViewState = 'dashboard' | 'disputes' | 'history' | 'certificate';

const App: React.FC = () => {
  const [sims, setSims] = useState<SimData[]>(MOCK_SIMS);
  const [history, setHistory] = useState<HistoryEvent[]>(MOCK_HISTORY);
  
  const [view, setView] = useState<ViewState>('dashboard');
  const [prevView, setPrevView] = useState<ViewState>('dashboard');
  
  // Modal States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [disputeSim, setDisputeSim] = useState<SimData | null>(null);
  const [certSim, setCertSim] = useState<SimData | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSignLanguageOpen, setIsSignLanguageOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // Simulate incoming authorization request after a few seconds for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthModalOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (newView: ViewState) => {
    if (view !== 'certificate') {
      setPrevView(view);
    }
    setView(newView);
  };

  const handleDisputeClick = (sim: SimData) => {
    setDisputeSim(sim);
  };

  const handleConfirmDispute = (simId: string) => {
    // Update SIM status to suspended
    setSims(prev => prev.map(s => s.id === simId ? { ...s, status: SimStatus.SUSPENDED } : s));
    
    const disputed = sims.find(s => s.id === simId);
    if (disputed) {
      // Add to history
      setHistory(prev => [{
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        action: 'Dispute Filed & SIM Suspended',
        details: `${disputed.operator} - ${disputed.number}`,
        status: 'Danger'
      }, ...prev]);

      setCertSim(disputed);
      navigateTo('certificate');
    }
    setDisputeSim(null);
  };

  const handleApproveAuth = () => {
    setIsAuthModalOpen(false);
    setHistory(prev => [{
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      action: 'SIM Issuance Authorized',
      details: 'Omantel - Muscat City Center',
      status: 'Success'
    }, ...prev]);
  };

  const handleRejectAuth = () => {
    setIsAuthModalOpen(false);
    setHistory(prev => [{
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      action: 'SIM Issuance Rejected & Locked',
      details: 'Omantel - Muscat City Center',
      status: 'Danger'
    }, ...prev]);
  };

  const activeSimsCount = sims.filter(s => s.status === SimStatus.ACTIVE).length;
  const disputedSims = sims.filter(s => s.status === SimStatus.SUSPENDED);

  return (
    <div className="min-h-screen flex flex-col bg-gov-slate">
      <FloatingSidebar 
        onOpenChat={() => setIsChatOpen(true)} 
        onOpenSignLanguage={() => setIsSignLanguageOpen(true)}
        onOpenEmergencyNumbers={() => setIsEmergencyOpen(true)}
      />
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <SignLanguageModal isOpen={isSignLanguageOpen} onClose={() => setIsSignLanguageOpen(false)} />
      <EmergencyNumbersModal isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />

      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        {/* Logo & Branding */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-gov-navy text-white p-3 rounded-xl shadow-md">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gov-navy leading-tight">Arqami <span className="font-normal text-gray-400 mx-1">|</span> أرقامي</h1>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">National Telecom Identity Protection</p>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        {view !== 'certificate' && (
          <div className="flex flex-wrap gap-2 mb-8 bg-white p-1.5 rounded-xl border border-gray-200 inline-flex shadow-sm">
            <button
              onClick={() => navigateTo('dashboard')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${view === 'dashboard' ? 'bg-gov-navy text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Dashboard / الرئيسية
            </button>
            <button
              onClick={() => navigateTo('disputes')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${view === 'disputes' ? 'bg-gov-navy text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Disputes / البلاغات
            </button>
            <button
              onClick={() => navigateTo('history')}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${view === 'history' ? 'bg-gov-navy text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              History / السجل
            </button>
          </div>
        )}

        {/* Views */}
        {view === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gov-border">
              <div>
                <h2 className="text-2xl font-bold text-gov-navy mb-1">Welcome, {MOCK_USER.fullNameEn}</h2>
                <p className="text-gray-500 text-sm flex items-center space-x-2">
                  <span>Civil ID: <span className="font-mono font-medium">{MOCK_USER.civilId}</span></span>
                  <span>•</span>
                  <span className="text-gov-teal font-medium flex items-center"><ShieldCheck size={14} className="mr-1"/> {MOCK_USER.trustLevel}</span>
                </p>
              </div>
              
              <div className="flex items-center space-x-4 bg-gov-slate p-3 rounded-xl border border-gray-200">
                <div className="bg-gov-teal/10 p-3 rounded-lg text-gov-teal">
                  <Smartphone size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Active SIMs</p>
                  <p className="text-2xl font-bold text-gov-navy">{activeSimsCount}</p>
                </div>
              </div>
            </div>

            {/* Security Status Banner */}
            <div className="bg-gradient-to-r from-gov-navy to-blue-800 rounded-2xl p-1 shadow-md">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-white">
                  <div className="bg-gov-teal p-2 rounded-full">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Active Zero-Trust Shield</h3>
                    <p className="text-sm text-blue-100">الهوية مؤمنة بنظام التفويض المسبق</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="hidden md:flex items-center space-x-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-white text-sm font-medium"
                >
                  <AlertCircle size={16} />
                  <span>Simulate Issuance Alert</span>
                </button>
              </div>
            </div>

            {/* SIM Cards Grid */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xl font-bold text-gov-navy">Registered Numbers / الأرقام المسجلة</h3>
                <span className="text-sm text-gray-500">Real-time sync via mTLS</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sims.map(sim => (
                  <SimCard 
                    key={sim.id} 
                    sim={sim} 
                    onDispute={handleDisputeClick} 
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'disputes' && (
          <DisputesView 
            disputedSims={disputedSims} 
            onViewCert={(sim) => {
              setCertSim(sim);
              navigateTo('certificate');
            }} 
          />
        )}

        {view === 'history' && (
          <HistoryView history={history} />
        )}

        {view === 'certificate' && certSim && (
          <CertificateView 
            user={MOCK_USER} 
            sim={certSim} 
            onBack={() => navigateTo(prevView)} 
          />
        )}
      </main>

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onApprove={handleApproveAuth}
        onReject={handleRejectAuth}
      />

      <DisputeModal 
        isOpen={!!disputeSim}
        sim={disputeSim}
        onClose={() => setDisputeSim(null)}
        onConfirm={handleConfirmDispute}
      />
    </div>
  );
};

export default App;
