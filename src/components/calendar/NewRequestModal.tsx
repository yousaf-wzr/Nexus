import React, { useState } from 'react';
import { X, User, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCalendar } from '../../context/CalendarContext';
import { getUsers } from '../../data/users';

interface NewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewRequestModal: React.FC<NewRequestModalProps> = ({ isOpen, onClose }) => {
  const { requestMeeting } = useCalendar();
  const investors = getUsers().filter(u => u.role === 'investor');
  
  const [selectedInvestor, setSelectedInvestor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!selectedInvestor || !date || !time) {
      alert("Please select an investor and time");
      return;
    }

    const startISO = `${date}T${time}:00`;
    // Default meetings to 30 minutes for the request
    const end = new Date(new Date(startISO).getTime() + 30 * 60000).toISOString();

    requestMeeting(startISO, end);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">New Meeting Request</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Investor</label>
            <select 
              value={selectedInvestor}
              onChange={(e) => setSelectedInvestor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
            >
              <option value="">Choose an investor...</option>
              {investors.map(inv => (
                <option key={inv.id} value={inv.id}>{inv.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Send Request</Button>
        </div>
      </div>
    </div>
  );
};