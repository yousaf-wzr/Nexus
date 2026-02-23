import React from 'react';
import { VideoRoom } from '../components/vedio/VideoRoom';
import { Card, CardBody } from '../components/ui/Card';

export const VideoCallPage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6 p-4 lg:p-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Virtual Pitch Room</h1>
          <p className="text-gray-500">Secure end-to-end encrypted session</p>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <VideoRoom />
      </div>
      
      {/* Sidebar for Meeting Notes / Chat can go here later */}
    </div>
  );
};