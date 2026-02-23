import { createContext, useContext, useState, useEffect } from "react";
import { AvailabilitySlot, MeetingRequest } from "../types/calendar";
import { v4 as uuid } from "uuid";
import { useAuth } from "./AuthContext"; 

type CalendarContextType = {
  availability: AvailabilitySlot[];
  meetings: MeetingRequest[];
  addAvailability: (start: string, end: string) => void;
  deleteAvailability: (id: string) => void; 
  requestMeeting: (start: string, end: string) => void;
  updateMeetingStatus: (id: string, status: "accepted" | "declined") => void;
};

const CalendarContext = createContext<CalendarContextType | null>(null);

const STORAGE_KEY = "business_nexus_calendar";

export const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [meetings, setMeetings] = useState<MeetingRequest[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setAvailability(data.availability || []);
        setMeetings(data.meetings || []);
      } catch (e) {
        console.error("Failed to parse calendar data", e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ availability, meetings })
    );
  }, [availability, meetings]);

  const addAvailability = (start: string, end: string) => {
    const newSlot = {
      id: Math.random().toString(36).substr(2, 9),
      start,
      end,
      userId: user?.id || 'guest' 
    };
    setAvailability(prev => [...prev, newSlot]);
  };

  const deleteAvailability = (id: string) => {
    setAvailability((prev) => prev.filter((slot) => slot.id !== id));
  };

  const requestMeeting = (start: string, end: string) => {
    setMeetings(prev => [
      ...prev,
      { 
        id: uuid(), 
        start, 
        end, 
        status: "pending",
        entrepreneurId: user?.id || 'guest'
      }
    ]);
  };

  const updateMeetingStatus = (id: string, status: "accepted" | "declined") => {
    setMeetings(prev =>
      prev.map(m => (m.id === id ? { ...m, status } : m))
    );
  };

  return (
    <CalendarContext.Provider
      value={{
        availability,
        meetings,
        addAvailability,
        deleteAvailability, 
        requestMeeting,
        updateMeetingStatus,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("useCalendar must be used inside CalendarProvider");
  return context;
};