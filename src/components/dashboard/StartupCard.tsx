import React from 'react';
import { TrendingUp, Users, MapPin, Heart } from 'lucide-react';
import { Button } from '../ui/Button';

interface StartupCardProps {
  startup: {
    id: string;
    name: string;
    description: string;
    industry: string;
    location: string;
    targetAmount: string;
    raisedAmount: string;
    equity: string;
    logoUrl: string;
  };
}

export const StartupCard: React.FC<StartupCardProps> = ({ startup }) => {
  // Calculate percentage for progress bar
  const raised = parseFloat(startup.raisedAmount.replace(/[^0-9.]/g, ''));
  const target = parseFloat(startup.targetAmount.replace(/[^0-9.]/g, ''));
  const progress = Math.min(Math.round((raised / target) * 100), 100);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* HEADER: Image & Category */}
      <div className="relative h-32 bg-gradient-to-br from-blue-500 to-blue-700 p-4">
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
            <Heart size={18} />
          </button>
        </div>
        <div className="absolute -bottom-6 left-6">
          <div className="w-16 h-16 bg-white rounded-xl shadow-md border-4 border-white overflow-hidden">
            <img src={startup.logoUrl} alt={startup.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="pt-8 px-6 pb-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
              {startup.industry}
            </span>
            <h3 className="text-xl font-bold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors">
              {startup.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center text-gray-400 text-xs mb-4 gap-3">
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {startup.location}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp size={14} /> {startup.equity} Equity
          </span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-6 leading-relaxed">
          {startup.description}
        </p>

        {/* FUNDING PROGRESS */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-gray-900">{startup.raisedAmount} raised</span>
            <span className="text-gray-400">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-1000" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 text-right">Target: {startup.targetAmount}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" fullWidth className="rounded-xl py-2 text-xs font-bold">
            Analysis
          </Button>
          <Button fullWidth className="rounded-xl py-2 text-xs font-bold bg-blue-600 shadow-blue-100">
            View Pitch
          </Button>
        </div>
      </div>
    </div>
  );
};