import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, Calendar, Video, FileText, CreditCard, 
  Wallet, Rocket, ArrowUpRight, Target
} from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { useAuth } from '../../context/AuthContext';
import { useCalendar } from '../../context/CalendarContext';
import { getUsers } from '../../data/users'; 
import TestCalendar from '../TestCalendar'; 

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const { meetings } = useCalendar(); 
  
  const walletBalance = 125000.00;
  
  const recommendedInvestors = getUsers()
    .filter(u => u.role === 'investor')
    .slice(0, 2);

  if (!user) return null;

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
        
        {/* Wallet / Financials */}
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
              <div className="flex items-center gap-2 mt-4">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-emerald-400 text-[11px] font-bold">+$50,000 in escrow</p>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <Wallet size={200} />
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden rounded-3xl border">
            <CardBody className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-violet-50 rounded-2xl text-violet-600">
                  <Target size={24} strokeWidth={2.5} />
                </div>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 shadow-sm" />
                  ))}
                </div>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Active Pitch Views</p>
              <h2 className="text-4xl font-black text-slate-900 mt-2 tracking-tight">1,240</h2>
              <p className="text-violet-600 text-[11px] font-bold mt-4 flex items-center gap-1">
                <ArrowUpRight size={14} /> +12% from last week
              </p>
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
                {item.count ? (
                  <span className="mt-2 px-2.5 py-0.5 bg-indigo-600 text-white text-[9px] rounded-full font-black shadow-lg shadow-indigo-200">
                    {item.count}
                  </span>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Main Content: Schedule & Matchmaking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Calendar Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.15em]">Upcoming Sessions</h2>
            <Link to="/schedule" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors">Full Calendar</Link>
          </div>
          <Card className="border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden bg-white rounded-[2rem]">
            <CardBody className="p-0">
              <div className="h-[480px]">
                <TestCalendar />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Investor Matchmaking Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Top Matches</h2>
            <div className="flex items-center gap-2 bg-emerald-50 px-2 py-1 rounded-full">
               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[9px] font-black text-emerald-700 uppercase tracking-tighter">Live Sync</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {recommendedInvestors.map(investor => (
              <div key={investor.id} className="group transition-all hover:-translate-y-1">
                <InvestorCard 
                  investor={investor} 
                  showActions={false} 
                  className="border-slate-100 shadow-sm group-hover:shadow-md transition-shadow rounded-3xl"
                />
              </div>
            ))}
            
            <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50 rounded-[2rem] p-8 text-center">
              <div className="p-4 bg-white rounded-2xl w-fit mx-auto shadow-sm mb-4 border border-slate-100">
                <Bell className="text-indigo-600" size={24} strokeWidth={2.5} />
              </div>
              <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">New Match Alert</p>
              <p className="text-[11px] text-slate-500 font-medium mb-5 px-4">We found 3 more investors interested in your sector.</p>
              <Link to="/investors">
                <Button variant="outline" className="text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-xl border-slate-200 hover:bg-white hover:border-indigo-600 hover:text-indigo-600 transition-all">
                  Browse All
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};