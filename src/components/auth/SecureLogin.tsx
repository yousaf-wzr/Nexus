import React, { useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const SecureLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Direct login: satisfied the (email, password, role) requirement
      // Defaulting to entrepreneur for this specific secure view
      await login(email, password, 'entrepreneur'); 
      
      toast.success("Welcome back!");
      navigate('/dashboard/entrepreneur');
    } catch (err) {
      toast.error("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 bg-blue-50 rounded-full mb-4">
          <ShieldCheck className="text-blue-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Secure Sign In
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Access your startup data room
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="ceo@startup.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <Input 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        
        <Button 
          type="submit" 
          className="w-full bg-blue-600 py-6 rounded-xl font-bold" 
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              <span>Verifying...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
      
      <p className="text-center mt-6 text-xs text-gray-400">
        Protected by Business Nexus Security Protocol
      </p>
    </div>
  );
};