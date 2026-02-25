import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Search, PlusCircle, Calendar, 
  TrendingUp, Video, FileText,
  ArrowUpRight, Target, Filter
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../context/AuthContext';
import { Entrepreneur } from '../../types';
import { getUsers } from '../../data/users'; 
import TestCalendar from '../TestCalendar'; 

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  
  if (!user) return null;

  const allEntrepreneurs = getUsers().filter(u => u.role === 'entrepreneur') as Entrepreneur[];
  
  const filteredEntrepreneurs = allEntrepreneurs.filter(entrepreneur => {
    const matchesSearch = searchQuery === '' || 
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = selectedIndustries.length === 0 || 
      selectedIndustries.includes(entrepreneur.industry);
    
    return matchesSearch && matchesIndustry;
  });
  
  const industries = Array.from(new Set(allEntrepreneurs.map(e => e.industry)));
  
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev => prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]);
  };
  
  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Investor Hub</h1>
          <p className="text-slate-500 font-medium mt-1">Welcome back, {user.name.split(' ')[0]}. Here is your portfolio standing.</p>
        </div>
        <div className="flex gap-3">
           <Link to="/entrepreneurs">
             <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 rounded-xl px-8 font-bold uppercase tracking-widest text-[11px] py-4 flex items-center gap-2 transition-all hover:-translate-y-1">
                <PlusCircle size={16} strokeWidth={2.5} /> New Investment
             </Button>
           </Link>
        </div>
      </div>

      {/* 2. Performance & Quick Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Stats Row */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-950 text-white border-none shadow-2xl relative overflow-hidden group rounded-3xl">
            <CardBody className="p-7">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20">
                  <TrendingUp size={22} strokeWidth={2.5} />
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg text-[10px] font-black border border-emerald-500/20">
                  +24.8%
                </div>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Portfolio ROI</p>
              <h2 className="text-3xl font-black mt-2 tracking-tight">$2.45M</h2>
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <TrendingUp size={140} />
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all rounded-3xl border">
            <CardBody className="p-7">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-violet-50 rounded-2xl text-violet-600">
                  <Target size={22} strokeWidth={2.5} />
                </div>
                <ArrowUpRight size={18} className="text-slate-300 group-hover:text-violet-600" />
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Active Deals</p>
              <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">12</h2>
            </CardBody>
          </Card>

          <Card className="bg-white border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all rounded-3xl border">
            <CardBody className="p-7">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-orange-50 rounded-2xl text-orange-600">
                  <Calendar size={22} strokeWidth={2.5} />
                </div>
                <div className="flex items-center gap-1 bg-orange-50 px-2 py-0.5 rounded-full">
                   <span className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                   <span className="text-[9px] font-black text-orange-700 uppercase">Live</span>
                </div>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Pitch Calls</p>
              <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">4 <span className="text-xs text-slate-300 font-bold ml-1">today</span></h2>
            </CardBody>
          </Card>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-4 flex gap-4">
          {[
            { to: "/documents", icon: FileText, color: "indigo", label: "Due Diligence" },
            { to: "/video-call", icon: Video, color: "violet", label: "Live Pitches" }
          ].map((item) => (
            <Link key={item.label} to={item.to} className="flex-1 group">
              <div className={`h-full bg-white hover:bg-${item.color}-50/50 rounded-3xl p-5 flex flex-col items-center justify-center text-center transition-all border border-slate-100 hover:border-${item.color}-200/50 shadow-sm hover:shadow-md`}>
                <item.icon className={`text-${item.color}-600 mb-3 group-hover:scale-110 transition-transform`} size={32} strokeWidth={2} />
                <span className={`text-[10px] font-black text-${item.color}-700 uppercase tracking-widest leading-tight`}>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Discovery & Schedule Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Featured Startups Discovery */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-1">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.15em]">Deal Flow Discovery</h2>
            <div className="w-full md:w-80 group">
              <Input
                placeholder="Search ventures or industries..."
                className="rounded-2xl border-slate-100 bg-white shadow-sm focus:ring-indigo-500 group-hover:border-indigo-200 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startAdornment={<Search size={16} className="text-slate-400 mr-2" />}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEntrepreneurs.length > 0 ? (
              filteredEntrepreneurs.map(entrepreneur => (
                <EntrepreneurCard 
                  key={entrepreneur.id} 
                  entrepreneur={entrepreneur} 
                  className="rounded-[2rem] border-slate-100 shadow-sm hover:shadow-xl transition-all"
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-slate-50/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                <Filter className="mx-auto text-slate-300 mb-4" size={40} />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No ventures match your criteria</p>
                <button onClick={() => {setSearchQuery(''); setSelectedIndustries([])}} className="mt-4 text-indigo-600 font-black text-[10px] uppercase underline">Reset All Filters</button>
              </div>
            )}
          </div>
        </div>

        {/* Calendar & Filters Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Industry Filters Card */}
          <Card className="border-slate-100 shadow-xl shadow-slate-200/40 rounded-[2rem] overflow-hidden bg-white">
            <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Industry Filters</h2>
              <Filter size={14} className="text-slate-400" />
            </div>
            <CardBody className="p-7">
              <div className="flex flex-wrap gap-2">
                {industries.map(industry => (
                  <Badge 
                    key={industry} 
                    onClick={() => toggleIndustry(industry)}
                    className={`cursor-pointer px-4 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                      selectedIndustries.includes(industry) 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 ring-2 ring-indigo-600 ring-offset-2' 
                        : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
              {selectedIndustries.length > 0 && (
                <button 
                  onClick={() => setSelectedIndustries([])}
                  className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mt-8 hover:text-indigo-800 transition-colors block w-full text-center py-3 border border-indigo-100 rounded-2xl bg-indigo-50/30"
                >
                  Clear Selection
                </button>
              )}
            </CardBody>
          </Card>

          {/* Schedule Mini-View */}
          <Card className="border-slate-100 shadow-xl shadow-slate-200/40 rounded-[2rem] overflow-hidden bg-white">
             <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Schedule</h2>
                <div className="flex items-center gap-2">
                   <span className="text-[9px] font-black text-slate-400 uppercase">Interactive</span>
                   <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-lg shadow-indigo-200" />
                </div>
             </div>
             <div className="h-[380px] scale-[0.88] origin-top">
                <TestCalendar />
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};