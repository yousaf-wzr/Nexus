import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, FileText, PieChart, 
  Users, Globe, Linkedin, MessageSquare, ShieldCheck,
  TrendingUp, DollarSign, X
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const StartupDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // To be used for dynamic fetching later
  const [activeTab, setActiveTab] = useState('overview');
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');

  // Mock data for the specific startup
  const startup = {
    name: 'EcoFlow Systems',
    tagline: 'Revolutionizing Urban Renewable Energy',
    industry: 'CleanTech',
    raised: '$840,000',
    target: '$1,200,000',
    equity: '8%',
    minInvestment: 25000,
    valuation: '$15.5M',
    description: `EcoFlow Systems is developing next-generation vertical axis wind turbines specifically optimized for urban residential environments. Unlike traditional turbines, our proprietary "Whisper" technology allows for silent operation and energy capture at wind speeds as low as 3m/s.`,
    founders: [
      { name: 'Sarah Chen', role: 'CEO & Founder', bio: 'Former Lead Engineer at Tesla Energy.', img: 'https://i.pravatar.cc/150?u=sarah' },
      { name: 'Marcus Thorne', role: 'CTO', bio: 'PhD in Aerodynamics from MIT.', img: 'https://i.pravatar.cc/150?u=marcus' }
    ],
    financials: {
      revenue: '$120k ARR',
      growth: '+15% MoM',
      runway: '14 Months',
      documents: ['Pitch Deck.pdf', 'Q3 Financial Report.pdf', 'Market Analysis.pdf']
    }
  };

  const handleInvestment = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Investment commitment of $${investmentAmount} sent to ${startup.name}!`);
    setIsInvestModalOpen(false);
  };

  return (
    <div className="min-h-screen pb-20 relative">
      {/* 1. BACK BUTTON */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold text-sm mb-6 transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Discovery
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          {/* HEADER SECTION */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-white text-3xl font-black shrink-0 shadow-lg shadow-blue-100">
                EF
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                    {startup.industry}
                  </span>
                  <span className="flex items-center gap-1 text-green-600 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={14} /> Verified Pitch
                  </span>
                </div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">{startup.name}</h1>
                <p className="text-gray-500 font-bold text-lg leading-snug">{startup.tagline}</p>
              </div>
            </div>

            {/* TABS */}
            <div className="flex gap-8 mt-10 border-b border-gray-100 overflow-x-auto scrollbar-hide">
              {['Overview', 'Financials', 'Team'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all relative ${
                    activeTab === tab.toLowerCase() ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab.toLowerCase() && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="py-8 min-h-[400px]">
              {activeTab === 'overview' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h3 className="text-xl font-black text-gray-900 mb-4">The Vision</h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">{startup.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <Globe className="text-blue-600 mb-3" size={24} />
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Market Size</p>
                      <p className="text-xl font-black text-gray-900">$4.2B TAM</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <PieChart className="text-blue-600 mb-3" size={24} />
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Burn Rate</p>
                      <p className="text-xl font-black text-gray-900">$45k / mo</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'financials' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                      <p className="text-[10px] text-blue-600 font-black uppercase mb-1">Revenue</p>
                      <p className="text-lg font-black text-gray-900">{startup.financials.revenue}</p>
                    </div>
                    <div className="p-4 bg-green-50/50 rounded-2xl border border-green-100">
                      <p className="text-[10px] text-green-600 font-black uppercase mb-1">Growth</p>
                      <p className="text-lg font-black text-gray-900">{startup.financials.growth}</p>
                    </div>
                    <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
                      <p className="text-[10px] text-purple-600 font-black uppercase mb-1">Runway</p>
                      <p className="text-lg font-black text-gray-900">{startup.financials.runway}</p>
                    </div>
                  </div>
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest pt-4">Data Room</h4>
                  <div className="space-y-2">
                    {startup.financials.documents.map(doc => (
                      <div key={doc} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-200 cursor-pointer group transition-all">
                        <div className="flex items-center gap-3">
                          <FileText className="text-gray-400 group-hover:text-blue-600" size={20} />
                          <span className="text-sm font-bold text-gray-700">{doc}</span>
                        </div>
                        <span className="text-[10px] font-black text-blue-600 uppercase">Download</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'team' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {startup.founders.map((person) => (
                    <div key={person.name} className="flex flex-col gap-4 p-6 border border-gray-100 rounded-3xl hover:border-blue-200 transition-all bg-white shadow-sm">
                      <div className="flex items-center gap-4">
                        <img src={person.img} alt={person.name} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                        <div>
                          <p className="font-black text-gray-900 text-lg">{person.name}</p>
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{person.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">{person.bio}</p>
                      <div className="pt-2 flex gap-3">
                         <Linkedin size={18} className="text-gray-400 hover:text-blue-700 cursor-pointer" />
                         <Globe size={18} className="text-gray-400 hover:text-blue-700 cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INVESTMENT WIDGET */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-2xl sticky top-24">
            <h3 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Deal Summary</h3>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                  <span className="text-gray-400">Progress to Goal</span>
                  <span className="text-blue-600">70%</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden p-1">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '70%' }} />
                </div>
                <p className="text-xs font-bold text-gray-500 mt-3">{startup.raised} / <span className="text-gray-900">{startup.target}</span></p>
              </div>

              <div className="grid grid-cols-2 gap-y-8">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Equity</p>
                  <p className="text-xl font-black text-gray-900">{startup.equity}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Min Check</p>
                  <p className="text-xl font-black text-gray-900">${startup.minInvestment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Valuation</p>
                  <p className="text-xl font-black text-gray-900">{startup.valuation}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Closes In</p>
                  <p className="text-xl font-black text-orange-500">14 Days</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Button 
                  onClick={() => setIsInvestModalOpen(true)}
                  fullWidth 
                  className="bg-blue-600 hover:bg-blue-700 py-5 rounded-2xl shadow-xl shadow-blue-100 font-black text-sm uppercase tracking-[0.2em] transition-transform active:scale-95"
                >
                  Invest Now
                </Button>
                <Button 
                  onClick={() => navigate('/chat')}
                  fullWidth 
                  variant="outline" 
                  className="py-5 rounded-2xl font-black text-xs text-gray-600 uppercase tracking-[0.2em] flex items-center justify-center gap-2 border-gray-200 hover:bg-gray-50"
                >
                  <MessageSquare size={18} /> Direct Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. INVESTMENT MODAL */}
      {isInvestModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsInvestModalOpen(false)} />
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 relative z-10 shadow-2xl animate-in zoom-in duration-200">
            <button 
              onClick={() => setIsInvestModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-black text-gray-900 mb-2">Commit Funds</h2>
            <p className="text-gray-500 text-sm font-bold mb-8">Investing in <span className="text-blue-600">{startup.name}</span></p>
            
            <form onSubmit={handleInvestment} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Investment Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black">$</span>
                  <input 
                    autoFocus
                    type="number" 
                    min={startup.minInvestment}
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-lg font-black focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all"
                    placeholder={startup.minInvestment.toString()}
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    required
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-2 font-bold italic">Min investment: ${startup.minInvestment.toLocaleString()}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex justify-between text-xs font-black uppercase tracking-tighter mb-1">
                  <span className="text-blue-600">Est. Equity Stake</span>
                  <span className="text-blue-900">~0.25%</span>
                </div>
              </div>

              <Button type="submit" fullWidth className="bg-blue-600 py-4 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-blue-100">
                Confirm Commitment
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};