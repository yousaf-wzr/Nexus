import React, { useState } from 'react';
import { Plus, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CalendarView } from '../components/calendar/CalendarView';
import { AvailabilityModal } from '../components/calendar/AvailabilityModal';
import { NewRequestModal } from '../components/calendar/NewRequestModal'; // New Import

export const SchedulePage: React.FC = () => {
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false); // New State

  return (
    <div className="h-full flex flex-col space-y-4 p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meeting Schedule</h1>
          <p className="text-gray-500">Manage your availability and investor pitches</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            leftIcon={<Clock size={18} />}
            onClick={() => setIsAvailabilityOpen(true)}
          >
            Add Availability
          </Button>
          <Button 
            variant="primary" 
            leftIcon={<Plus size={18} />}
            onClick={() => setIsRequestOpen(true)} // Open Request Modal
          >
            New Request
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[600px]">
        <CalendarView />
      </div>

      <AvailabilityModal 
        isOpen={isAvailabilityOpen} 
        onClose={() => setIsAvailabilityOpen(false)} 
      />

      <NewRequestModal 
        isOpen={isRequestOpen} 
        onClose={() => setIsRequestOpen(false)} 
      />
    </div>
  );
};