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
        `flex items-center py-3 px-4 rounded-xl transition-all duration-200 font-bold text-sm ${
          isActive 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-[1.02]' 
            : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const entrepreneurItems = [
    { to: '/dashboard/entrepreneur', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/profile/entrepreneur/' + user.id, icon: <Building2 size={20} />, text: 'My Startup' },
    { to: '/investors', icon: <CircleDollarSign size={20} />, text: 'Find Investors' },
    { to: '/messages', icon: <MessageCircle size={20} />, text: 'Messages' },
    { to: '/notifications', icon: <Bell size={20} />, text: 'Notifications' },
    { to: '/documents', icon: <FileText size={20} />, text: 'Documents' },
  ];
  
  const investorItems = [
    { to: '/dashboard/investor', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/profile/investor/' + user.id, icon: <CircleDollarSign size={20} />, text: 'My Portfolio' },
    { to: '/entrepreneurs', icon: <Users size={20} />, text: 'Find Startups' },
    { to: '/messages', icon: <MessageCircle size={20} />, text: 'Messages' },
    { to: '/notifications', icon: <Bell size={20} />, text: 'Notifications' },
    { to: '/deals', icon: <FileText size={20} />, text: 'Deals' },
  ];
  
  const sidebarItems = user.role === 'entrepreneur' ? entrepreneurItems : investorItems;
  
  return (
    <div className="w-64 bg-white h-full border-r border-gray-100 hidden md:flex flex-col">
      <div className="flex-1 px-4 overflow-y-auto pt-8">
        {/* MAIN MENU SECTION */}
        <div className="mb-10">
          <p className="px-4 text-[11px] font-black text-blue-600 uppercase tracking-[0.25em] mb-6 opacity-80">
            Main Menu
          </p>
          <div className="space-y-1.5">
            {sidebarItems.map((item, index) => (
              <SidebarItem key={index} to={item.to} icon={item.icon} text={item.text} />
            ))}
          </div>
        </div>
        
        {/* SYSTEM SECTION */}
        <div className="mb-10">
          <p className="px-4 text-[11px] font-black text-blue-600 uppercase tracking-[0.25em] mb-6 opacity-80">
            System
          </p>
          <div className="space-y-1.5">
            <SidebarItem to="/settings" icon={<Settings size={20} />} text="Settings" />
            <SidebarItem to="/help" icon={<HelpCircle size={20} />} text="Help & Support" />
          </div>
        </div>
      </div>

      {/* FOOTER (Optional info space) */}
      <div className="p-6 border-t border-gray-50">
         <p className="text-[10px] text-gray-400 font-bold text-center tracking-widest uppercase">
           Nexus v1.0.4
         </p>
      </div>
    </div>
  );
};