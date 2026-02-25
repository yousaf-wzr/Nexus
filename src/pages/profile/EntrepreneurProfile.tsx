import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MessageCircle, Users, Calendar, Building2, MapPin, 
  UserCircle, FileText, DollarSign, ShieldCheck 
} from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { findUserById } from '../../data/users';
import { createCollaborationRequest, getRequestsFromInvestor } from '../../data/collaborationRequests';
import { Entrepreneur } from '../../types';

export const EntrepreneurProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  
  const entrepreneur = findUserById(id || '') as Entrepreneur | null;
  
  // 1. Error Guard: Prevents blank page if ID is wrong or data is missing
  if (!entrepreneur || entrepreneur.role !== 'entrepreneur') {
    return (
      <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Entity not found</h2>
        <p className="text-slate-500 mt-2 font-medium">This profile is private or has been moved.</p>
        <Link to="/dashboard/investor">
          <Button className="mt-6 bg-slate-900 rounded-xl px-8 uppercase text-[10px] font-black tracking-widest">Return to Hub</Button>
        </Link>
      </div>
    );
  }
  
  const isCurrentUser = currentUser?.id === entrepreneur.id;
  const isInvestor = currentUser?.role === 'investor';
  const hasRequestedCollaboration = isInvestor && id 
    ? getRequestsFromInvestor(currentUser.id).some(req => req.entrepreneurId === id)
    : false;
  
  const handleSendRequest = () => {
    if (isInvestor && currentUser && id) {
      createCollaborationRequest(currentUser.id, id, `Interest in ${entrepreneur.startupName}`);
      window.location.reload();
    }
  };

  // 2. Safety Helper: Prevents "split of undefined" crash
  const getFirstSentence = (text: string | undefined) => {
    if (!text) return "Innovative solution in the tech sector.";
    const parts = text.split('.');
    return parts[0] ? `${parts[0]}.` : text;
  };
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-12">
      
      {/* --- HEADER SECTION: NEW ATTRACTIVE DESIGN --- */}
      <Card className="rounded-[3rem] border-none shadow-2xl shadow-slate-200/60 bg-white overflow-hidden group">
        <CardBody className="p-10 md:p-14 relative">
          
          {/* Smaller, Elegant Floating Icon */}
          <div className="absolute top-10 right-10 opacity-[0.05] text-indigo-600 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none">
            <Building2 size={120} strokeWidth={1.5} />
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            {/* Avatar with Pulse Effect */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full opacity-10 animate-pulse" />
              <Avatar
                src={entrepreneur.avatarUrl}
                alt={entrepreneur.name}
                size="xl"
                className="ring-8 ring-white shadow-2xl scale-110 relative z-10"
              />
              <span className={`absolute bottom-2 right-2 w-6 h-6 border-4 border-white rounded-full z-20 ${entrepreneur.isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            </div>
            
            <div className="flex-1 text-center md:text-left pt-2">
              {/* Heading with adjusted Padding & Gap */}
              <div className="flex flex-col md:flex-row md:items-center gap-8 mb-6">
                <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  {entrepreneur.startupName || "The Startup"}
                </h1>
                <Badge className="bg-indigo-600 text-white border-none text-[10px] font-black uppercase tracking-[0.2em] py-2 px-6 rounded-full shadow-lg shadow-indigo-100 animate-in zoom-in duration-500">
                  Series A • Fundraising
                </Badge>
              </div>
              
              <p className="text-slate-400 font-bold flex items-center justify-center md:justify-start gap-3 mb-8 text-lg">
                <UserCircle size={22} className="text-indigo-500" />
                <span>Led by <span className="text-slate-900">{entrepreneur.name}</span></span>
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                <span className="text-indigo-600 uppercase tracking-widest text-sm font-black">{entrepreneur.industry || "General Industry"}</span>
              </p>
              
              {/* Quick Info Pills */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {[
                  { icon: MapPin, text: entrepreneur.location || "Global" },
                  { icon: Calendar, text: `Est. ${entrepreneur.foundedYear || "2023"}` },
                  { icon: Users, text: `${entrepreneur.teamSize || "5-10"} Employees` }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-slate-50 px-5 py-2.5 rounded-2xl text-[11px] font-black text-slate-600 border border-slate-100 uppercase tracking-tight hover:bg-white hover:shadow-md transition-all cursor-default">
                    <item.icon size={16} className="text-indigo-400" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 min-w-[240px] w-full md:w-auto self-center">
              {!isCurrentUser && (
                <>
                  <Link to={`/chat/${entrepreneur.id}`} className="w-full">
                    <Button variant="outline" className="w-full rounded-2xl border-slate-200 text-slate-700 font-black uppercase tracking-widest text-[11px] py-7 shadow-sm hover:bg-slate-900 hover:text-white transition-all" leftIcon={<MessageCircle size={20} strokeWidth={2.5} />}>
                      Message Founder
                    </Button>
                  </Link>
                  {isInvestor && (
                    <Button 
                      className={`w-full rounded-2xl font-black uppercase tracking-widest text-[11px] py-7 shadow-xl transition-all ${hasRequestedCollaboration ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 hover:-translate-y-1'}`}
                      leftIcon={<ShieldCheck size={20} strokeWidth={2.5} />}
                      disabled={hasRequestedCollaboration}
                      onClick={handleSendRequest}
                    >
                      {hasRequestedCollaboration ? 'Access Requested' : 'Request Data Room'}
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* --- CONTENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="rounded-[2.5rem] border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 bg-slate-50/50 border-b border-slate-100">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Executive Summary</h2>
            </div>
            <CardBody className="p-10">
              <p className="text-2xl font-medium text-slate-700 leading-relaxed italic border-l-8 border-indigo-500 pl-8 mb-10">
                "{entrepreneur.bio || "Building the next generation of industry standards."}"
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
                {[
                  { title: "The Problem", text: getFirstSentence(entrepreneur.pitchSummary) },
                  { title: "The Solution", text: entrepreneur.pitchSummary || "Proprietary technology solving market inefficiencies." },
                  { title: "Competitive Edge", text: "Proprietary AI-driven logic and deep market penetration strategy." },
                  { title: "Market Growth", text: "Targeting a $4B addressable market with 14% CAGR." }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full shadow-lg shadow-indigo-200" /> {item.title}
                    </h3>
                    <p className="text-[15px] text-slate-500 font-medium leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-8">
          {/* Financials */}
          <Card className="bg-slate-900 text-white border-none rounded-[3rem] shadow-2xl overflow-hidden relative">
            <div className="p-8 bg-white/5 border-b border-white/5">
              <h2 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.25em]">Capital Requirement</h2>
            </div>
            <CardBody className="p-10">
              <div className="mb-10 text-center md:text-left">
                <span className="text-slate-500 text-[11px] font-black uppercase tracking-widest">Seeking</span>
                <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                  <DollarSign size={32} className="text-emerald-400" strokeWidth={3} />
                  <h2 className="text-5xl font-black tracking-tighter">{entrepreneur.fundingNeeded || "$1.2M"}</h2>
                </div>
              </div>
              <div className="space-y-6">
                {[{ label: "Valuation", val: "$12.5M" }, { label: "Equity", val: "15-20%" }, { label: "Runway", val: "18 Mo" }].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center pb-5 border-b border-white/5 last:border-0">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                    <span className="text-sm font-black text-slate-100 uppercase">{stat.val}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Interactive Milestones with Hover Effect */}
          <Card className="rounded-[3rem] border-slate-100 shadow-sm overflow-hidden bg-white">
            <div className="p-8 bg-slate-50/50 border-b border-slate-100">
               <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Milestones</h2>
            </div>
            <CardBody className="p-6 space-y-2">
              {[
                { year: '2023', event: 'Product-Market Fit', status: 'completed', desc: 'Reached key revenue goal' },
                { year: '2024', event: 'Global Expansion', status: 'active', desc: 'Currently scaling to EU' },
                { year: '2025', event: 'Series B Fundraising', status: 'pending', desc: 'Targeting Q3 close' }
              ].map((m, i) => (
                <div key={i} className="flex gap-6 p-4 rounded-[2rem] transition-all duration-300 hover:bg-slate-50 group/item">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-4 transition-all duration-300 group-hover/item:scale-125 ${
                      m.status === 'completed' ? 'bg-indigo-500 border-indigo-100' : 
                      m.status === 'active' ? 'bg-white border-indigo-500 animate-pulse' : 'bg-white border-slate-200'
                    }`} />
                    {i !== 2 && <div className="w-0.5 h-14 bg-slate-100 mt-2 group-hover/item:bg-indigo-200" />}
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${m.status === 'completed' ? 'text-indigo-500' : 'text-slate-400'}`}>{m.year}</p>
                    <p className="text-sm font-black text-slate-800 tracking-tight group-hover/item:text-indigo-600 transition-colors">{m.event}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 opacity-0 group-hover/item:opacity-100 transition-all transform translate-y-1 group-hover/item:translate-y-0">{m.desc}</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};