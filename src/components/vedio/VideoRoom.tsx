import React, { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Maximize, Settings } from 'lucide-react';
import { Button } from '../ui/Button';

export const VideoRoom: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
      {/* Main Video Display Area */}
      <div className="relative flex-1 bg-black flex items-center justify-center">
        {isCallActive ? (
          <div className="w-full h-full relative">
            {/* Simulation of Remote Participant */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              {!isVideoOn ? (
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <VideoOff size={40} />
                  </div>
                  <p>Your camera is off</p>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <p className="text-gray-400 font-medium">Remote Participant (Investor)</p>
                </div>
              )}
            </div>
            
            {/* Self View (Picture-in-Picture) */}
            <div className="absolute bottom-6 right-6 w-48 h-32 bg-gray-700 rounded-lg border-2 border-gray-600 shadow-xl overflow-hidden">
               {isVideoOn ? (
                 <div className="w-full h-full bg-gray-600 animate-pulse" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center bg-gray-800">
                   <VideoOff size={20} className="text-gray-500" />
                 </div>
               )}
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video size={40} className="text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Ready to Pitch?</h2>
            <p className="text-gray-400 mb-6">Ensure your camera and microphone are working before joining.</p>
            <Button size="lg" onClick={() => setIsCallActive(true)} variant="primary" className="px-12 rounded-full">
              Start Call
            </Button>
          </div>
        )}
      </div>

      {/* Control Bar */}
      {isCallActive && (
        <div className="bg-gray-800/80 backdrop-blur-md p-6 flex items-center justify-between">
          <div className="flex items-center gap-4 text-white">
            <span className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono">04:12</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAudioOn(!isAudioOn)}
              className={`p-4 rounded-full transition-all ${isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
            >
              {isAudioOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>

            <button 
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-4 rounded-full transition-all ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
            >
              {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
            </button>

            <button 
              onClick={() => setIsCallActive(false)}
              className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all transform hover:scale-110"
            >
              <PhoneOff size={24} />
            </button>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <Settings size={20} className="hover:text-white cursor-pointer" />
            <Maximize size={20} className="hover:text-white cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
};