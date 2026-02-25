import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password, role);
      navigate(role === 'investor' ? '/dashboard/investor' : '/dashboard/entrepreneur');
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F1F5F9] flex flex-col justify-center items-center py-12 px-4">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <img src="/logo.svg" alt="Logo" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Business Nexus</h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Welcome Back</p>
        </div>

        <div className="bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] border border-slate-100">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} />
              <p className="text-xs font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
              {['entrepreneur', 'investor'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r as UserRole)}
                  className={`py-2.5 rounded-xl font-bold text-[11px] uppercase transition-all ${
                    role === r ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-2 ml-1 uppercase tracking-wider text-left">Email Address</label>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  className="rounded-2xl h-12 border-slate-200 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-700 mb-2 ml-1 uppercase tracking-wider text-left">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  className="rounded-2xl h-12 border-slate-200 focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>

            <Button type="submit" fullWidth isLoading={isLoading} className="h-12 rounded-2xl font-bold text-sm bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-[0.98] transition-all">
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500 font-medium">
              New here? <Link to="/register" className="text-blue-600 font-bold hover:underline transition-colors">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};