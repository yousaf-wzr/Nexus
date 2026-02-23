import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { StartupCard } from '../../components/dashboard/StartupCard';

// MOCK DATA
const MOCK_STARTUPS = [
  {
    id: '1',
    name: 'EcoFlow Systems',
    description: 'Developing next-generation vertical axis wind turbines for urban residential environments with 40% higher efficiency.',
    industry: 'CleanTech',
    location: 'Berlin, DE',
    targetAmount: '$1,200,000',
    raisedAmount: '$840,000',
    equity: '8%',
    logoUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'NeuralPulse AI',
    description: 'Predictive health monitoring using wearable EEG sensors and proprietary deep-learning models for early seizure detection.',
    industry: 'HealthTech',
    location: 'San Francisco, US',
    targetAmount: '$2,500,000',
    raisedAmount: '$250,000',
    equity: '12.5%',
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'Velociti Logistics',
    description: 'Autonomous drone delivery network specifically designed for the "last-mile" medical supply chain in remote areas.',
    industry: 'Logistics',
    location: 'Nairobi, KE',
    targetAmount: '$750,000',
    raisedAmount: '$690,000',
    equity: '5%',
    logoUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=100&h=100&fit=crop'
  }
];

export const InvestorDiscovery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Explore Startups</h1>
            <p className="text-gray-500 font-medium mt-1">Discover your next high-impact investment opportunity.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Search startups, industries..."
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* QUICK FILTERS */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
          {['All Tech', 'SaaS', 'CleanTech', 'HealthTech', 'FinTech', 'AI/ML'].map((filter, i) => (
            <button 
              key={filter} 
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white text-gray-500 border border-gray-100 hover:border-blue-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* GRID SECTION */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_STARTUPS.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
          
          <div className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-12 text-center group hover:border-blue-300 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
              <Filter size={24} />
            </div>
            <p className="mt-4 text-sm font-bold text-gray-400 group-hover:text-blue-600">Load More Opportunities</p>
          </div>
        </div>
      </div>
    </div>
  );
};