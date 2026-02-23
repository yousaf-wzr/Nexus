import React, { useState } from 'react';
import { X, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCalendar } from '../../context/CalendarContext';

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AvailabilityModal: React.FC<AvailabilityModalProps> = ({ isOpen, onClose }) => {
  const { addAvailability } = useCalendar();
  
  // State for form inputs
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!date || !startTime || !endTime) {
      alert("Please fill in all fields");
      return;
    }

    // Combine Date and Time into ISO format: YYYY-MM-DDTHH:mm:ss
    const startISO = `${date}T${startTime}:00`;
    const endISO = `${date}T${endTime}:00`;

    // Call the context function to update the calendar
    addAvailability(startISO, endISO);
    
    // Close and reset
    onClose();
    setDate('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Add Availability</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>
            Save Availability
          </Button>
        </div>
      </div>
    </div>
  );
};