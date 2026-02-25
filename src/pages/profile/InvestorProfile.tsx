import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MessageCircle, Building2, MapPin, UserCircle, 
  BarChart3, Briefcase, TrendingUp, Target, 
  Layers, Globe, Award
} from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { findUserById } from '../../data/users';
import { Investor } from '../../types';

export const InvestorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  
  const investor = findUserById(id || '') as Investor | null;
  
  if (!investor || investor.role !== 'investor') {
    return (
      <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Investor not found</h2>
        <p className="text-slate-500 mt-2 font-medium">This profile is private or has been moved.</p>
        <Link to="/dashboard/entrepreneur">
          <Button className="mt-6 bg-slate-900 rounded-xl px-8 uppercase text-[10px] font-black tracking-widest">Return to Hub</Button>
        </Link>
      </div>
    );
  }
  
  const isCurrentUser = currentUser?.id === investor.id;
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-12">
      
      {/* --- HEADER SECTION: PREMIUM INVESTOR DESIGN --- */}
      <Card className="rounded-[3rem] border-none shadow-2xl shadow-slate-200/60 bg-white overflow-hidden group">
        <CardBody className="p-10 md:p-14 relative">
          
          {/* Floating Decorative Icon */}
          <div className="absolute top-10 right-10 opacity-[0.05] text-slate-900 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
            <Award size={140} strokeWidth={1.5} />
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            {/* Avatar with Premium Ring */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-slate-900 to-indigo-900 rounded-full opacity-5 animate-pulse" />
              <Avatar
                src={investor.avatarUrl}
                alt={investor.name}
                size="xl"
                className="ring-8 ring-white shadow-2xl scale-110 relative z-10"
              />
              <span className={`absolute bottom-2 right-2 w-6 h-6 border-4 border-white rounded-full z-20 ${investor.isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            </div>
            
            <div className="flex-1 text-center md:text-left pt-2">
              {/* Heading Area */}
              <div className="flex flex-col md:flex-row md:items-center gap-8 mb-6">
                <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  {investor.name}
                </h1>
                <Badge className="bg-slate-900 text-white border-none text-[10px] font-black uppercase tracking-[0.2em] py-2 px-6 rounded-full shadow-lg shadow-slate-200 animate-in zoom-in duration-500">
                  Verified Investor
                </Badge>
              </div>
              
              <p className="text-slate-400 font-bold flex items-center justify-center md:justify-start gap-3 mb-8 text-lg">
                <Briefcase size={22} className="text-indigo-500" />
                <span>Venture Partner</span>
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                <span className="text-slate-900 uppercase tracking-widest text-sm font-black">
                  {investor.totalInvestments} Portfolio Companies
                </span>
              </p>
              
              {/* Quick Info Pills */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2.5 bg-indigo-50 px-5 py-2.5 rounded-2xl text-[11px] font-black text-indigo-700 border border-indigo-100 uppercase tracking-tight hover:bg-white transition-all cursor-default">
                  <MapPin size={16} className="text-indigo-400" />
                  San Francisco, CA
                </div>
                {investor.investmentStage.map((stage, index) => (
                  <div key={index} className="flex items-center gap-2.5 bg-slate-50 px-5 py-2.5 rounded-2xl text-[11px] font-black text-slate-600 border border-slate-100 uppercase tracking-tight hover:bg-white hover:shadow-md transition-all cursor-default">
                    <Target size={16} className="text-slate-400" />
                    {stage}
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA Action */}
            <div className="flex flex-col gap-4 min-w-[240px] w-full md:w-auto self-center">
              {!isCurrentUser ? (
                <Link to={`/chat/${investor.id}`} className="w-full">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-black uppercase tracking-widest text-[11px] py-7 shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1" leftIcon={<MessageCircle size={20} strokeWidth={2.5} />}>
                    Message Investor
                  </Button>
                </Link>
              ) : (
                <Button variant="outline" className="w-full rounded-2xl border-slate-200 text-slate-700 font-black uppercase tracking-widest text-[11px] py-7 shadow-sm hover:bg-slate-50 transition-all" leftIcon={<UserCircle size={20} strokeWidth={2.5} />}>
                  Edit Private Profile
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* --- CONTENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Thesis & Portfolio */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="rounded-[2.5rem] border-slate-100 shadow-sm overflow-hidden bg-white">
            <div className="p-8 bg-slate-50/50 border-b border-slate-100">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Investment Thesis</h2>
            </div>
            <CardBody className="p-10">
              <p className="text-2xl font-medium text-slate-700 leading-relaxed italic border-l-8 border-indigo-500 pl-8 mb-12">
                "{investor.bio}"
              </p>
              
              <div className="space-y-10">
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-3 mb-6">
                    <Layers size={18} className="text-indigo-500" /> Target Sectors
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {investor.investmentInterests.map((interest, index) => (
                      <Badge key={index} className="bg-slate-50 text-slate-700 border-slate-200 text-[11px] font-black px-5 py-3 rounded-2xl hover:bg-indigo-600 hover:text-white transition-colors cursor-default">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Proven founding teams with exit experience",
                    "Clear path to $10M ARR within 24 months",
                    "Proprietary tech or deep-moat IP",
                    "Global scalability from Day 1"
                  ].map((criteria, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:bg-white hover:shadow-md transition-all">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full shadow-lg shadow-indigo-200 shrink-0" />
                      <p className="text-xs font-bold text-slate-600 leading-snug">{criteria}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Portfolio Companies */}
          <div className="space-y-6">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-6">Portfolio Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {investor.portfolioCompanies.map((company, index) => (
                <Card key={index} className="rounded-3xl border-slate-100 hover:border-indigo-400 hover:shadow-xl transition-all group cursor-default">
                  <CardBody className="p-6 flex items-center gap-5">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner shrink-0">
                      <Building2 size={28} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1">{company}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Invested 2022 • Series A</p>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Capital & Performance */}
        <div className="lg:col-span-4 space-y-8">
          {/* Capital Card */}
          <Card className="bg-slate-900 text-white border-none rounded-[3rem] shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            <div className="p-8 bg-white/5 border-b border-white/5">
              <h2 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.25em]">Check Size</h2>
            </div>
            <CardBody className="p-10">
              <div className="mb-10 text-center">
                <span className="text-slate-500 text-[11px] font-black uppercase tracking-widest">Typical Range</span>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <h2 className="text-4xl font-black tracking-tighter">
                    {investor.minimumInvestment} — {investor.maximumInvestment}
                  </h2>
                </div>
              </div>

              <div className="space-y-8">
                {[
                  { label: "B2B SaaS Focus", percent: '75%' },
                  { label: "FinTech Focus", percent: '60%' }
                ].map((focus, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{focus.label}</span>
                      <span className="text-[11px] font-black text-indigo-400">{focus.percent}</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ width: focus.percent }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-5 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-[11px] text-slate-400 font-bold leading-relaxed text-center">
                  Open to lead or follow-on rounds with secondary market interest.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Performance Track Record */}
          <Card className="rounded-[3rem] border-slate-100 shadow-sm overflow-hidden bg-white">
            <div className="p-8 bg-slate-50/50 border-b border-slate-100">
               <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Exit Track Record</h2>
            </div>
            <CardBody className="p-8 space-y-4">
              {[
                { label: 'Successful Exits', value: '4', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { label: 'Average ROI', value: '3.2x', icon: BarChart3, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                { label: 'Active Deals', value: '12', icon: Globe, color: 'text-amber-500', bg: 'bg-amber-50' }
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-[2rem] transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1 group/stat">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 ${stat.bg} rounded-2xl transition-transform group-hover/stat:rotate-12`}>
                      <stat.icon size={20} className={stat.color} />
                    </div>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <span className="text-xl font-black text-slate-900">{stat.value}</span>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};