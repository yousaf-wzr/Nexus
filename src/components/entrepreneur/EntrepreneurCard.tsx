import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ExternalLink, Building2, Users as UsersIcon, Wallet } from 'lucide-react';
import { Entrepreneur } from '../../types';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface EntrepreneurCardProps {
  entrepreneur: Entrepreneur;
  showActions?: boolean;
  className?: string;
}

export const EntrepreneurCard: React.FC<EntrepreneurCardProps> = ({
  entrepreneur,
  showActions = true,
  className = ""
}) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate(`/profile/entrepreneur/${entrepreneur.id}`);
  };
  
  const handleMessage = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    navigate(`/chat/${entrepreneur.id}`);
  };
  
  return (
    <Card 
      className={`transition-all duration-300 h-full rounded-[2rem] border-slate-100 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 cursor-pointer bg-white group ${className}`}
      onClick={handleViewProfile}
    >
      <CardBody className="flex flex-col p-6">
        {/* Header Section */}
        <div className="flex items-start mb-5">
          <div className="relative">
            <Avatar
              src={entrepreneur.avatarUrl}
              alt={entrepreneur.name}
              size="lg"
              className="mr-4 ring-2 ring-white shadow-md border border-slate-100"
            />
            {entrepreneur.isOnline && (
              <span className="absolute bottom-1 right-5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
              {entrepreneur.startupName}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Building2 size={12} className="text-slate-400" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Founded {entrepreneur.foundedYear} • {entrepreneur.location}
              </p>
            </div>
          </div>
        </div>

        {/* Industry & Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg">
            {entrepreneur.industry}
          </Badge>
          <Badge className="bg-slate-50 text-slate-500 border-slate-100 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg">
            {entrepreneur.teamSize} Members
          </Badge>
        </div>

        {/* Pitch Summary */}
        <div className="flex-1 mb-6">
          <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">
            {entrepreneur.pitchSummary}
          </p>
        </div>
        
        {/* Financial Metrics */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-50">
          <div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Funding Needed</span>
            <div className="flex items-center gap-1.5 text-emerald-600">
              <Wallet size={14} strokeWidth={2.5} />
              <p className="text-sm font-black tracking-tight">{entrepreneur.fundingNeeded}</p>
            </div>
          </div>
          
          <div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Founder</span>
            <div className="flex items-center gap-1.5 text-slate-900">
              <UsersIcon size={14} strokeWidth={2.5} className="text-slate-400" />
              <p className="text-sm font-bold truncate">{entrepreneur.name.split(' ')[0]}</p>
            </div>
          </div>
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
            Details
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};