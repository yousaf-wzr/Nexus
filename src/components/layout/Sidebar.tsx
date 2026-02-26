import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, Building2, CircleDollarSign, Users, MessageCircle, 
  Bell, FileText, Settings, HelpCircle
} from 'lucide-react';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `group flex items-center py-3 px-4 rounded-xl transition-all duration-200 text-sm relative ${
          isActive 
            ? 'bg-indigo-50 text-indigo-600 font-bold' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 w-1 h-5 bg-indigo-600 rounded-r-full" />
          )}
          <span className={`mr-3 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
            {React.cloneElement(icon as React.ReactElement, { strokeWidth: 2.5 })}
          </span>
          <span>{text}</span>
        </>
      )}
    </NavLink>
  );
};


export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const entrepreneurItems = [
    { to: '/dashboard/entrepreneur', icon: <Home size={18} />, text: 'Dashboard' },
    { to: '/profile/entrepreneur/' + user.id, icon: <Building2 size={18} />, text: 'My Startup' },
    { to: '/investors', icon: <CircleDollarSign size={18} />, text: 'Find Investors' },
    { to: '/messages', icon: <MessageCircle size={18} />, text: 'Messages' },
    { to: '/notifications', icon: <Bell size={18} />, text: 'Notifications' },
    { to: '/documents', icon: <FileText size={18} />, text: 'Documents' },
  ];
  
  const investorItems = [
    { to: '/dashboard/investor', icon: <Home size={18} />, text: 'Dashboard' },
    { to: '/profile/investor/' + user.id, icon: <CircleDollarSign size={18} />, text: 'My Portfolio' },
    { to: '/entrepreneurs', icon: <Users size={18} />, text: 'Find Startups' },
    { to: '/messages', icon: <MessageCircle size={18} />, text: 'Messages' },
    { to: '/notifications', icon: <Bell size={18} />, text: 'Notifications' },
    { to: '/deals', icon: <FileText size={18} />, text: 'Deals' },
  ];
  
  const sidebarItems = user.role === 'entrepreneur' ? entrepreneurItems : investorItems;
  
  return (
    <div className="w-64 bg-white h-full border-r border-slate-100 hidden md:flex flex-col">
      <div className="flex-1 px-4 overflow-y-auto pt-10">
        <div className="mb-10">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            Main Menu
          </p>
          <div className="space-y-1">
            {sidebarItems.map((item, index) => (
              <SidebarItem key={index} to={item.to} icon={item.icon} text={item.text} />
            ))}
          </div>
        </div>
        
        <div className="mb-10">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            System
          </p>
          <div className="space-y-1">
            <SidebarItem to="/settings" icon={<Settings size={18} />} text="Settings" />
            <SidebarItem to="/help" icon={<HelpCircle size={18} />} text="Help & Support" />
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-50">
         <div className="bg-slate-50 rounded-2xl p-3 text-center">
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
              Nexus v1.0.4
            </p>
         </div>
      </div>
    </div>
  );
};