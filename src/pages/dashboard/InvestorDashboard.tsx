import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Search, PlusCircle, Calendar, 
  TrendingUp, Video, FileText, CreditCard,
  ArrowUpRight, Target
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Investor Hub</h1>
          <p className="text-gray-500 font-bold mt-1">Welcome back, {user.name.split(' ')[0]}. Here is your current standing.</p>
        </div>
        <div className="flex gap-3">
           <Link to="/entrepreneurs">
             <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 rounded-xl px-6 font-black uppercase tracking-widest text-xs py-3">
                <PlusCircle size={16} className="mr-2" /> New Investment
             </Button>
           </Link>
        </div>
      </div>

      {/* 2. Performance & Quick Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Performance Stats */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-900 text-white border-none shadow-xl relative overflow-hidden group">
            <CardBody className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <TrendingUp size={20} />
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-none font-black">+24.8%</Badge>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Portfolio ROI</p>
              <h2 className="text-2xl font-black mt-1">$2.4M</h2>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp size={120} />
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <CardBody className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <Target size={20} />
                </div>
                <ArrowUpRight size={18} className="text-gray-300 group-hover:text-purple-600 transition-colors" />
              </div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Active Deals</p>
              <h2 className="text-2xl font-black text-gray-900 mt-1">12</h2>
            </CardBody>
          </Card>

          <Card className="bg-white border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <CardBody className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                  <Calendar size={20} />
                </div>
                <ArrowUpRight size={18} className="text-gray-300 group-hover:text-orange-600 transition-colors" />
              </div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Pitch Calls</p>
              <h2 className="text-2xl font-black text-gray-900 mt-1">4 <span className="text-xs text-gray-400">Today</span></h2>
            </CardBody>
          </Card>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-4 flex gap-3">
          <Link to="/documents" className="flex-1">
            <div className="h-full bg-blue-50 hover:bg-blue-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all border border-blue-100/50 group">
              <FileText className="text-blue-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-[10px] font-black text-blue-700 uppercase tracking-tighter">Due Diligence</span>
            </div>
          </Link>
          <Link to="/video-call" className="flex-1">
            <div className="h-full bg-purple-50 hover:bg-purple-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all border border-purple-100/50 group">
              <Video className="text-purple-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-[10px] font-black text-purple-700 uppercase tracking-tighter">Live Pitches</span>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. Discovery & Schedule Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Featured Startups Discovery */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight italic">Featured Startups</h2>
            <div className="w-full md:w-72">
              <Input
                placeholder="Search ventures..."
                className="rounded-xl border-gray-200 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startAdornment={<Search size={16} className="text-gray-400" />}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEntrepreneurs.length > 0 ? (
              filteredEntrepreneurs.map(entrepreneur => (
                <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold">No startups found matching your filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Calendar & Filters Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Industry Filters Card */}
          <Card className="border-gray-100 shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="p-6 bg-gray-50/50 border-b border-gray-100">
              <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Quick Filters</h2>
            </CardHeader>
            <CardBody className="p-6">
              <div className="flex flex-wrap gap-2">
                {industries.map(industry => (
                  <Badge 
                    key={industry} 
                    variant={selectedIndustries.includes(industry) ? 'primary' : 'gray'}
                    onClick={() => toggleIndustry(industry)}
                    className={`cursor-pointer px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                      selectedIndustries.includes(industry) ? 'bg-blue-600 shadow-md shadow-blue-100' : ''
                    }`}
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
              {selectedIndustries.length > 0 && (
                <button 
                  onClick={() => setSelectedIndustries([])}
                  className="text-[10px] text-blue-600 font-black uppercase tracking-widest mt-6 hover:text-blue-800 transition-colors block w-full text-center py-2 border border-blue-100 rounded-xl"
                >
                  Clear Selection
                </button>
              )}
            </CardBody>
          </Card>

          {/* Schedule Mini-View */}
          <Card className="border-gray-100 shadow-sm rounded-3xl overflow-hidden">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Live Schedule</h2>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
             </div>
             <div className="h-[350px] scale-[0.9] origin-top">
                <TestCalendar />
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};