import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, Calendar, Video, FileText, CreditCard, 
  Wallet, Rocket, ArrowUpRight, Target, Layout, Archive 
} from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { useAuth } from '../../context/AuthContext';
import { useCalendar } from '../../context/CalendarContext';
import { usePitches } from '../../context/PitchContext'; 
import { getUsers } from '../../data/users'; 
import TestCalendar from '../TestCalendar'; 

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const { meetings } = useCalendar(); 
  const { pitches, archivePitch } = usePitches(); // Get archive function
  
  const activePitches = pitches.filter(p => p.status !== 'archived');
  
  const walletBalance = 125000.00;
  const recommendedInvestors = getUsers()
    .filter(u => u.role === 'investor')
    .slice(0, 2);

  if (!user) return null;

  const handleArchive = (id: string, name: string) => {
    if (window.confirm(`Move "${name}" to archives? It will no longer be visible to investors.`)) {
      archivePitch(id);
    }
  };

  const pendingMeetingsCount = meetings.filter(m => m.status === 'pending').length;

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Founder Central</h1>
          <p className="text-slate-500 font-medium mt-1">Welcome back, {user.name.split(' ')[0]}. Your startup is gaining traction.</p>
        </div>
        <div className="flex gap-3">
           <Link to="/dashboard/entrepreneur/create-pitch">
             <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 rounded-xl px-8 font-bold uppercase tracking-widest text-[11px] py-4 flex items-center gap-2 transition-all hover:-translate-y-1">
                <Rocket size={16} strokeWidth={2.5} /> Create New Pitch
             </Button>
           </Link>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-slate-950 text-white border-none shadow-2xl relative overflow-hidden group rounded-3xl">
            <CardBody className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20">
                  <Wallet size={24} strokeWidth={2.5} />
                </div>
                <Link to="/deals" className="text-[10px] font-black uppercase tracking-[0.15em] text-indigo-400 hover:text-white transition-colors flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                  Withdraw <ArrowUpRight size={14} />
                </Link>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Available Capital</p>
              <h2 className="text-4xl font-black mt-2 tracking-tight">${walletBalance.toLocaleString()}</h2>
            </CardBody>
          </Card>

          <Card className="bg-white border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden rounded-3xl border">
            <CardBody className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-violet-50 rounded-2xl text-violet-600">
                  <Target size={24} strokeWidth={2.5} />
                </div>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Active Pitch Views</p>
              <h2 className="text-4xl font-black text-slate-900 mt-2 tracking-tight">1,240</h2>
            </CardBody>
          </Card>
        </div>

        {/* Quick Action Mini-Grid */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
          {[
            { to: "/schedule", icon: Calendar, color: "indigo", label: "Meetings", count: pendingMeetingsCount },
            { to: "/video-call", icon: Video, color: "violet", label: "Live Room" },
            { to: "/documents", icon: FileText, color: "emerald", label: "Data Room" },
            { to: "/deals", icon: CreditCard, color: "orange", label: "Deals" }
          ].map((item) => (
            <Link key={item.label} to={item.to} className="group">
              <div className={`h-full bg-white hover:bg-${item.color}-50/50 rounded-3xl p-5 flex flex-col items-center justify-center text-center transition-all border border-slate-100 hover:border-${item.color}-200/50 shadow-sm hover:shadow-md`}>
                <item.icon className={`text-${item.color}-600 mb-3 group-hover:scale-110 transition-transform`} size={28} strokeWidth={2} />
                <span className={`text-[10px] font-black text-${item.color}-700 uppercase tracking-widest`}>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. ACTIVE PITCHES FEED (Filters out Archived) */}
      {activePitches.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.15em] px-1">Active Ventures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePitches.map((pitch) => (
              <Card key={pitch.id} className="border-slate-100 shadow-sm hover:shadow-md transition-all rounded-3xl bg-white border">
                <CardBody className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md uppercase tracking-wider">
                      {pitch.industry}
                    </span>
                    <button 
                      onClick={() => handleArchive(pitch.id, pitch.startupName)}
                      className="text-slate-300 hover:text-amber-600 transition-colors p-1"
                      title="Archive Venture"
                    >
                      <Archive size={16} />
                    </button>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{pitch.startupName}</h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">{pitch.tagline}</p>
                  <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                    <p className="text-[10px] font-bold text-slate-400">Target: <span className="text-slate-900">${Number(pitch.targetAmount).toLocaleString()}</span></p>
                    <Link to="#" className="text-[10px] font-black text-indigo-600 uppercase">Manage</Link>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 4. Calendar & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.15em]">Upcoming Sessions</h2>
          </div>
          <Card className="border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden bg-white rounded-[2rem]">
            <CardBody className="p-0">
              <div className="h-[480px]">
                <TestCalendar />
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Top Matches</h2>
          <div className="space-y-4">
            {recommendedInvestors.map(investor => (
              <InvestorCard 
                key={investor.id}
                investor={investor} 
                showActions={false} 
                className="border-slate-100 shadow-sm rounded-3xl"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};