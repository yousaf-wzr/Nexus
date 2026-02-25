import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ExternalLink, TrendingUp, DollarSign } from 'lucide-react';
import { Investor } from '../../types';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface InvestorCardProps {
  investor: Investor;
  showActions?: boolean;
  className?: string; // Added to allow dashboard styling
}

export const InvestorCard: React.FC<InvestorCardProps> = ({
  investor,
  showActions = true,
  className = ""
}) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate(`/profile/investor/${investor.id}`);
  };
  
  const handleMessage = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    navigate(`/chat/${investor.id}`);
  };
  
  return (
    <Card 
      className={`transition-all duration-300 h-full rounded-[2rem] border-slate-100 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 cursor-pointer bg-white group ${className}`}
      onClick={handleViewProfile}
    >
      <CardBody className="flex flex-col p-6">
        <div className="flex items-start mb-5">
          <div className="relative">
            <Avatar
              src={investor.avatarUrl}
              alt={investor.name}
              size="lg"
              className="mr-4 ring-2 ring-white shadow-md border border-slate-100"
            />
            {investor.isOnline && (
              <span className="absolute bottom-1 right-5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
              {investor.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <TrendingUp size={12} className="text-indigo-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {investor.totalInvestments} Portfolio Companies
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          {/* Investment Stages */}
          <div>
            <div className="flex flex-wrap gap-1.5">
              {investor.investmentStage.map((stage, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-indigo-50 text-indigo-700 border-indigo-100 text-[9px] font-black uppercase px-2 py-0.5 rounded-md"
                >
                  {stage}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Bio */}
          <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
            {investor.bio}
          </p>

          {/* Interests */}
          <div className="pt-2">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Focus</p>
            <div className="flex flex-wrap gap-1.5">
              {investor.investmentInterests.map((interest, index) => (
                <Badge 
                  key={index} 
                  className="bg-slate-900 text-white text-[9px] font-bold px-2.5 py-1 rounded-lg"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Investment Range Footer */}
        <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Range</span>
            <div className="flex items-center gap-1 text-slate-900">
              <DollarSign size={14} className="text-emerald-500" />
              <p className="text-sm font-black tracking-tight">
                {investor.minimumInvestment} - {investor.maximumInvestment}
              </p>
            </div>
          </div>
          {!showActions && (
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
               <ExternalLink size={14} strokeWidth={3} />
            </div>
          )}
        </div>
      </CardBody>
      
      {showActions && (
        <CardFooter className="border-t border-slate-50 bg-slate-50/30 p-4 flex gap-3">
          <Button
            variant="ghost"
            className="flex-1 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-white hover:text-indigo-600 rounded-xl transition-all"
            leftIcon={<MessageCircle size={16} strokeWidth={2.5} />}
            onClick={handleMessage}
          >
            Chat
          </Button>
          
          <Button
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-[11px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95"
            rightIcon={<ExternalLink size={16} strokeWidth={2.5} />}
            onClick={handleViewProfile}
          >
            Profile
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};