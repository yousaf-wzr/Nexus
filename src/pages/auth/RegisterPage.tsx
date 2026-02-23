import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
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
  const [showPass, setShowPass] = useState(false);
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-[380px] text-center mb-4">
        <div className="flex justify-center mb-2">
          <img 
            src="/logo.svg" 
            alt="Logo" 
            className="w-10 h-10 object-contain hover:rotate-6 transition-transform" 
          />
        </div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Join Nexus</h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Registration</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[380px]">
        <div className="bg-white py-6 px-6 shadow-xl rounded-2xl border border-gray-100">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} />
              <p className="text-xs font-semibold">{error}</p>
            </div>
          )}

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-50 rounded-lg mb-2">
              <button
                type="button"
                onClick={() => setRole('entrepreneur')}
                className={`py-2 rounded-md font-bold text-[11px] transition-all ${
                  role === 'entrepreneur' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'
                }`}
              >
                Entrepreneur
              </button>
              <button
                type="button"
                onClick={() => setRole('investor')}
                className={`py-2 rounded-md font-bold text-[11px] transition-all ${
                  role === 'investor' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'
                }`}
              >
                Investor
              </button>
            </div>

            <Input label="Name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required fullWidth className="rounded-lg h-9 text-sm" />
            <Input label="Email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth className="rounded-lg h-9 text-sm" />
            
            <div className="relative">
              <Input 
                label="Password" 
                type={showPass ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                fullWidth 
                className="rounded-lg h-9 text-sm pr-10" 
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-[64%] -translate-y-1/2 text-gray-400 hover:text-blue-600 p-1"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="mt-1"><PasswordStrength pass={password} /></div>

            <div className="relative">
              <Input 
                label="Confirm Password" 
                type={showPass ? "text" : "password"} 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                fullWidth 
                className="rounded-lg h-9 text-sm pr-10" 
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-[64%] -translate-y-1/2 text-gray-400 hover:text-blue-600 p-1"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            
            <Button type="submit" fullWidth isLoading={isLoading} className="py-2.5 rounded-lg font-bold text-sm bg-blue-600 mt-4 shadow-md active:scale-95 transition-all">
              Create Account
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-50 text-center">
            <p className="text-[12px] text-gray-500 font-medium">
              Have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};