import React, { useState } from 'react';
import { 
  Rocket, DollarSign, Target, Image as ImageIcon, 
  ChevronRight, ChevronLeft, ShieldCheck, Info,
  Globe, Layout
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { usePitches } from '../../context/PitchContext'; 

export const CreatePitch: React.FC = () => {
  const navigate = useNavigate();
  const { addPitch } = usePitches();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    startupName: '',
    tagline: '',
    industry: '',
    description: '',
    targetAmount: '',
    minInvestment: '',
    valuation: '',
    equityOffered: '',
    problem: '',
    solution: '',
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handlePublish = () => {
    // REAL-TIME ACTION: Pushing to global state
    addPitch({
      startupName: formData.startupName,
      industry: formData.industry,
      tagline: formData.tagline,
      targetAmount: formData.targetAmount,
    });

    navigate('/dashboard/entrepreneur');
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* 1. PREMIUM PROGRESS HEADER */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Launch Your Pitch</h1>
        <p className="text-indigo-500 font-black mt-3 text-xs uppercase tracking-[0.4em]">
          Phase {step} of 3 • {step === 1 ? 'Market Identity' : step === 2 ? 'Financial Architecture' : 'Growth Strategy'}
        </p>
        
        <div className="flex justify-center gap-4 mt-10">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-700 ease-out ${
                step >= i ? 'bg-indigo-600 w-32 shadow-lg shadow-indigo-100' : 'bg-slate-200 w-12'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* 2. MAIN FORM CARD ) */}
      <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl overflow-hidden shadow-indigo-900/5 transition-all">
        <div className="p-10 md:p-16 relative">
          
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none text-slate-900">
             <Layout size={200} />
          </div>

          {/*  IDENTITY & BRANDING */}
          {step === 1 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Startup Name</label>
                  <input 
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-indigo-600 transition-all outline-none font-bold text-slate-900 shadow-sm"
                    placeholder="e.g. Nexus Energy"
                    value={formData.startupName}
                    onChange={(e) => setFormData({...formData, startupName: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Industry Sector</label>
                  <div className="relative">
                    <select 
                      className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-indigo-600 outline-none font-bold text-slate-900 appearance-none shadow-sm cursor-pointer"
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    >
                      <option value="">Select Sector</option>
                      <option value="FinTech">FinTech</option>
                      <option value="CleanTech">CleanTech</option>
                      <option value="AI">Artificial Intelligence</option>
                      <option value="HealthTech">HealthTech</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <ChevronRight size={18} className="rotate-90" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Elevator Pitch (One Sentence)</label>
                <input 
                  className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-indigo-600 outline-none font-bold text-slate-900 shadow-sm"
                  placeholder="The world's first decentralized energy grid..."
                  value={formData.tagline}
                  onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                />
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Venture Branding</label>
                <div className="border-4 border-dashed border-slate-100 rounded-[2.5rem] p-16 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-indigo-50/30 hover:border-indigo-200 transition-all cursor-pointer group">
                  <div className="p-5 bg-white rounded-3xl shadow-xl mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <ImageIcon className="text-indigo-600" size={40} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Drop Pitch Deck or Logo (PDF/PNG)</p>
                </div>
              </div>
            </div>
          )}

          {/*  FINANCIALS & EQUITY */}
          {step === 2 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Funding Goal (USD)</label>
                  <div className="relative">
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 text-indigo-600 font-black">$</div>
                    <input 
                      type="number" 
                      className="w-full pl-14 pr-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-indigo-600 outline-none font-bold text-slate-900 shadow-sm" 
                      placeholder="1,000,000" 
                      value={formData.targetAmount}
                      onChange={(e) => setFormData({...formData, targetAmount: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Equity Offered (%)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-indigo-600 outline-none font-bold text-slate-900 shadow-sm" 
                      placeholder="10" 
                      value={formData.equityOffered}
                      onChange={(e) => setFormData({...formData, equityOffered: e.target.value})}
                    />
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 text-indigo-600 font-black">%</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Valuation Cap</label>
                  <input 
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-indigo-600 outline-none font-bold text-slate-900 shadow-sm" 
                    placeholder="e.g. $10,000,000"
                    value={formData.valuation}
                    onChange={(e) => setFormData({...formData, valuation: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Minimum Ticket</label>
                  <input 
                    className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-indigo-600 outline-none font-bold text-slate-900 shadow-sm" 
                    placeholder="$25,000"
                    value={formData.minInvestment}
                    onChange={(e) => setFormData({...formData, minInvestment: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="p-8 bg-indigo-600 rounded-[2.5rem] shadow-2xl shadow-indigo-200 flex items-start gap-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Globe size={100} />
                </div>
                <ShieldCheck className="shrink-0" size={32} strokeWidth={2.5} />
                <div className="relative z-10">
                  <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-2">Institutional Grade Data</h4>
                  <p className="text-xs text-indigo-100 font-bold leading-relaxed opacity-90">
                    Accurate financial mapping increases institutional investor engagement by 340%. Ensure your valuation reflects current market multiples.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/*  THE STRATEGY */}
          {step === 3 && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-1">
                   <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Info size={16} /></div>
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Market Pain Point</label>
                </div>
                <textarea 
                  rows={4} 
                  className="w-full px-8 py-6 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-indigo-600 outline-none font-bold text-slate-900 shadow-sm resize-none" 
                  placeholder="Clearly define the problem you are solving..." 
                  value={formData.problem}
                  onChange={(e) => setFormData({...formData, problem: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-1">
                   <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Target size={16} /></div>
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">The Nexus Solution</label>
                </div>
                <textarea 
                  rows={4} 
                  className="w-full px-8 py-6 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-indigo-600 outline-none font-bold text-slate-900 shadow-sm resize-none" 
                  placeholder="Explain your unfair advantage and technology..." 
                  value={formData.solution}
                  onChange={(e) => setFormData({...formData, solution: e.target.value})}
                />
              </div>
            </div>
          )}

          {/* NAVIGATION FOOTER */}
          <div className="flex justify-between items-center mt-20 pt-12 border-t border-slate-100">
            <button 
              onClick={prevStep}
              disabled={step === 1}
              className={`flex items-center gap-3 text-xs font-black uppercase tracking-[0.25em] transition-all ${
                step === 1 ? 'opacity-0' : 'text-slate-400 hover:text-indigo-600'
              }`}
            >
              <ChevronLeft size={20} /> Back
            </button>
            
            {step < 3 ? (
              <Button 
                onClick={nextStep}
                className="bg-slate-900 hover:bg-indigo-600 py-6 px-16 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-4"
              >
                Continue <ChevronRight size={18} />
              </Button>
            ) : (
              <Button 
                onClick={handlePublish}
                className="bg-indigo-600 hover:bg-indigo-700 py-6 px-16 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-indigo-200 transition-all hover:-translate-y-1 flex items-center gap-4"
              >
                Publish Venture <Rocket size={20} />
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};