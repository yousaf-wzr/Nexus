import React, { useState } from 'react';
import { 
  Rocket, DollarSign, Target, Image as ImageIcon, 
  ChevronRight, ChevronLeft, ShieldCheck, Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const CreatePitch: React.FC = () => {
  const navigate = useNavigate();
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
    // In a real app, you would send formData to your backend here
    console.log('Publishing Pitch:', formData);
    alert('Pitch Published Successfully!');
    navigate('/dashboard/entrepreneur');
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. PROGRESS HEADER */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Launch Your Pitch</h1>
        <p className="text-gray-500 font-bold mt-2 text-sm uppercase tracking-[0.3em]">Step {step} of 3</p>
        
        <div className="flex justify-center gap-3 mt-8">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                step >= i ? 'bg-blue-600 w-24' : 'bg-gray-200 w-12'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* 2. MAIN FORM CARD */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden shadow-blue-900/5">
        <div className="p-8 md:p-14">
          
          {/* STEP 1: IDENTITY & BRANDING */}
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Startup Name</label>
                  <input 
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 transition-all outline-none font-bold text-gray-900"
                    placeholder="e.g. Nexus Energy"
                    value={formData.startupName}
                    onChange={(e) => setFormData({...formData, startupName: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Industry Sector</label>
                  <select 
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none font-bold text-gray-900 appearance-none"
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  >
                    <option value="">Select Sector</option>
                    <option value="fintech">FinTech</option>
                    <option value="cleantech">CleanTech</option>
                    <option value="ai">Artificial Intelligence</option>
                    <option value="healthtech">HealthTech</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Elevator Pitch (One Sentence)</label>
                <input 
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none font-bold text-gray-900"
                  placeholder="The world's first decentralized energy grid..."
                  value={formData.tagline}
                  onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Company Logo</label>
                <div className="border-2 border-dashed border-gray-100 rounded-[2rem] p-12 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer group">
                  <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <ImageIcon className="text-blue-600" size={32} />
                  </div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Upload High-Res PNG or SVG</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: FINANCIALS & EQUITY */}
          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Funding Goal (USD)</label>
                  <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
                    <input 
                      type="number" 
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none font-bold" 
                      placeholder="1,000,000" 
                      value={formData.targetAmount}
                      onChange={(e) => setFormData({...formData, targetAmount: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Equity Offered (%)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none font-bold" 
                      placeholder="10" 
                      value={formData.equityOffered}
                      onChange={(e) => setFormData({...formData, equityOffered: e.target.value})}
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Valuation</label>
                  <input 
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none font-bold" 
                    placeholder="e.g. $10M"
                    value={formData.valuation}
                    onChange={(e) => setFormData({...formData, valuation: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Minimum Ticket</label>
                  <input 
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600 outline-none font-bold" 
                    placeholder="$25,000"
                    value={formData.minInvestment}
                    onChange={(e) => setFormData({...formData, minInvestment: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
                <ShieldCheck className="text-blue-600 shrink-0" size={24} />
                <div>
                  <h4 className="text-sm font-black text-blue-900 uppercase tracking-widest mb-1">Nexus Verification</h4>
                  <p className="text-xs text-blue-700/70 font-bold leading-relaxed">
                    Accurate financial data increases investor engagement by 3.4x. Ensure your valuation matches your current stage.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: THE STRATEGY */}
          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                   <Info size={14} className="text-blue-600" />
                   <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">The Market Problem</label>
                </div>
                <textarea 
                  rows={4} 
                  className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-blue-600 outline-none font-bold resize-none" 
                  placeholder="Clearly define the pain point..." 
                  value={formData.problem}
                  onChange={(e) => setFormData({...formData, problem: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                   <Target size={14} className="text-blue-600" />
                   <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Your Solution</label>
                </div>
                <textarea 
                  rows={4} 
                  className="w-full px-6 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-blue-600 outline-none font-bold resize-none" 
                  placeholder="How does your tech or service fix it?" 
                  value={formData.solution}
                  onChange={(e) => setFormData({...formData, solution: e.target.value})}
                />
              </div>
            </div>
          )}

          {/* NAVIGATION FOOTER */}
          <div className="flex justify-between items-center mt-16 pt-10 border-t border-gray-100">
            <button 
              onClick={prevStep}
              disabled={step === 1}
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-all ${
                step === 1 ? 'opacity-0' : 'text-gray-400 hover:text-blue-600'
              }`}
            >
              <ChevronLeft size={18} /> Back
            </button>
            
            {step < 3 ? (
              <Button 
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 py-4 px-12 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-blue-100 flex items-center gap-3"
              >
                Next Step <ChevronRight size={18} />
              </Button>
            ) : (
              <Button 
                onClick={handlePublish}
                className="bg-emerald-600 hover:bg-emerald-700 py-4 px-12 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-emerald-100 flex items-center gap-3"
              >
                Publish Pitch <Rocket size={18} />
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
