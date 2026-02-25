import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';
import { PasswordStrength } from '../../components/auth/PasswordStrength';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await register(name, email, password, role);
      navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen w-full bg-[#F1F5F9] flex flex-col justify-center items-center py-12 px-4">
      <div className="w-full max-w-[420px] animate-in fade-in zoom-in duration-300">
        {/* Logo and Header Section */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300" 
            />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Join Nexus</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Create Account</p>
        </div>

        <div className="bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] border border-slate-100">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-xl flex items-center gap-2">
              <AlertCircle size={16} />
              <p className="text-xs font-bold">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Role Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl mb-2">
              <button 
                type="button" 
                onClick={() => setRole('entrepreneur')} 
                className={`py-2.5 rounded-xl font-bold text-[11px] uppercase transition-all ${role === 'entrepreneur' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
              >
                Entrepreneur
              </button>
              <button 
                type="button" 
                onClick={() => setRole('investor')} 
                className={`py-2.5 rounded-xl font-bold text-[11px] uppercase transition-all ${role === 'investor' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
              >
                Investor
              </button>
            </div>

            <div className="space-y-5 text-left">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-2 ml-1 uppercase tracking-wider">Full Name</label>
                <Input 
                  type="text" 
                  placeholder="John Doe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  fullWidth 
                  className="rounded-2xl h-11 border-slate-200 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-2 ml-1 uppercase tracking-wider">Email Address</label>
                <Input 
                  type="email" 
                  placeholder="john@email.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  fullWidth 
                  className="rounded-2xl h-11 border-slate-200 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-700 mb-2 ml-1 uppercase tracking-wider">Password</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  fullWidth 
                  className="rounded-2xl h-11 border-slate-200 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                />
                <div className="mt-2 px-1">
                  <PasswordStrength pass={password} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-2 ml-1 uppercase tracking-wider">Confirm Password</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                  fullWidth 
                  className="rounded-2xl h-11 border-slate-200 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              fullWidth 
              isLoading={isLoading} 
              className="h-12 rounded-2xl font-bold text-sm bg-blue-600 mt-4 shadow-lg shadow-blue-100 active:scale-[0.98] transition-all"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline transition-colors">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};