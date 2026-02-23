import React from 'react';

interface PasswordStrengthProps {
  pass: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ pass }) => {
  const getStrength = () => {
    let score = 0;
    if (pass.length > 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getStrength();
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-emerald-500'];

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1 h-1.5">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className={`flex-1 rounded-full transition-colors duration-500 ${
              i < strength ? colors[strength - 1] : 'bg-gray-200'
            }`} 
          />
        ))}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
        Strength: <span className={strength > 0 ? colors[strength - 1].replace('bg-', 'text-') : ''}>{labels[strength - 1] || 'None'}</span>
      </p>
    </div>
  );
};