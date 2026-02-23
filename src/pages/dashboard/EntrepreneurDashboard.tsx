import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, Calendar, Video, FileText, CreditCard, 
  Wallet, Plus, Rocket, ArrowUpRight, Target
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Founder Central</h1>
          <p className="text-gray-500 font-bold mt-1">Welcome back, {user.name.split(' ')[0]}. Your startup is gaining traction.</p>
        </div>
        <div className="flex gap-3">
           <Link to="/dashboard/entrepreneur/create-pitch">
             <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 rounded-xl px-6 font-black uppercase tracking-widest text-xs py-3 flex items-center gap-2">
                <Rocket size={16} /> Create New Pitch
             </Button>
           </Link>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Wallet / Financials */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-slate-900 text-white border-none shadow-xl relative overflow-hidden group">
            <CardBody className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <Wallet size={20} />
                </div>
                <Link to="/deals" className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors flex items-center gap-1">
                  Withdraw <ArrowUpRight size={12} />
                </Link>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Available Capital</p>
              <h2 className="text-3xl font-black mt-1">${walletBalance.toLocaleString()}</h2>
              <p className="text-emerald-400 text-[10px] font-bold mt-2">+$50,000 in escrow</p>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Wallet size={120} />
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <CardBody className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <Target size={20} />
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Active Pitch Views</p>
              <h2 className="text-3xl font-black text-gray-900 mt-1">1,240</h2>
              <p className="text-purple-600 text-[10px] font-bold mt-2">+12% from last week</p>
            </CardBody>
          </Card>
        </div>

        {/* Quick Action Mini-Grid */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-3">
          <Link to="/schedule" className="group">
            <div className="h-full bg-blue-50 hover:bg-blue-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all border border-blue-100/50">
              <Calendar className="text-blue-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-[10px] font-black text-blue-700 uppercase tracking-tighter">Meetings</span>
              {pendingMeetingsCount > 0 && <span className="mt-1 px-2 py-0.5 bg-blue-600 text-white text-[8px] rounded-full font-black">{pendingMeetingsCount}</span>}
            </div>
          </Link>
          <Link to="/video-call" className="group">
            <div className="h-full bg-purple-50 hover:bg-purple-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all border border-purple-100/50">
              <Video className="text-purple-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-[10px] font-black text-purple-700 uppercase tracking-tighter">Live Room</span>
            </div>
          </Link>
          <Link to="/documents" className="group">
            <div className="h-full bg-emerald-50 hover:bg-emerald-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all border border-emerald-100/50">
              <FileText className="text-emerald-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-tighter">Data Room</span>
            </div>
          </Link>
          <Link to="/deals" className="group">
            <div className="h-full bg-orange-50 hover:bg-orange-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all border border-orange-100/50">
              <CreditCard className="text-orange-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-[10px] font-black text-orange-700 uppercase tracking-tighter">Deals</span>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. Main Content: Schedule & Matchmaking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Calendar Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight italic">Upcoming Sessions</h2>
            <Link to="/schedule" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Full Calendar</Link>
          </div>
          <Card className="border-gray-100 shadow-sm overflow-hidden bg-white rounded-3xl">
            <CardBody className="p-0">
              <div className="h-[450px]">
                <TestCalendar />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Investor Matchmaking Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Top Matches</h2>
            <div className="flex items-center gap-1">
               <span className="w-2 h-2 bg-emerald-500 rounded-full" />
               <span className="text-[9px] font-black text-gray-400 uppercase">Live</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {recommendedInvestors.map(investor => (
              <div key={investor.id} className="group transition-transform active:scale-95">
                <InvestorCard 
                  investor={investor} 
                  showActions={false} 
                />
              </div>
            ))}
            
            <Card className="border-dashed border-2 border-gray-100 bg-gray-50/30 rounded-3xl p-8 text-center">
              <div className="p-3 bg-white rounded-2xl w-fit mx-auto shadow-sm mb-4">
                <Bell className="text-blue-600" size={24} />
              </div>
              <p className="text-xs font-black text-gray-900 uppercase tracking-widest mb-1">New Match Alert</p>
              <p className="text-[10px] text-gray-400 font-bold mb-4 px-4">We found 3 more investors interested in CleanTech.</p>
              <Link to="/investors">
                <Button variant="outline" className="text-[10px] font-black uppercase tracking-widest py-2 rounded-xl border-gray-200">
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