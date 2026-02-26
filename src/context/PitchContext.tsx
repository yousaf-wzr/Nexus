import React, { createContext, useContext, useState } from 'react';

interface Pitch {
  id: string;
  startupName: string;
  industry: string;
  tagline: string;
  targetAmount: string;
  status: 'active' | 'funded' | 'archived'; 
  createdAt: Date;
}

interface PitchContextType {
  pitches: Pitch[];
  addPitch: (pitch: Omit<Pitch, 'id' | 'status' | 'createdAt'>) => void;
  archivePitch: (id: string) => void; 
}

const PitchContext = createContext<PitchContextType | undefined>(undefined);

export const PitchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pitches, setPitches] = useState<Pitch[]>([]);

  const addPitch = (newPitchData: any) => {
    const pitch: Pitch = {
      ...newPitchData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'active',
      createdAt: new Date(),
    };
    setPitches((prev) => [pitch, ...prev]);
  };

  const archivePitch = (id: string) => {
    setPitches((currentPitches) =>
      currentPitches.map((pitch) =>
        pitch.id === id ? { ...pitch, status: 'archived' } : pitch
      )
    );
  };

  return (
    <PitchContext.Provider value={{ pitches, addPitch, archivePitch }}>
      {children}
    </PitchContext.Provider>
  );
};

export const usePitches = () => {
  const context = useContext(PitchContext);
  if (!context) throw new Error('usePitches must be used within a PitchProvider');
  return context;
};