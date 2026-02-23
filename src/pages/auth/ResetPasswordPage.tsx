import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

export const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const { resetPassword } = useAuth();
  const token = searchParams.get('token');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    try {
      await resetPassword(token, password);
      toast.success("Password updated successfully");
      navigate('/login');
    } catch (error) {
      console.error("Reset failed", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="inline-flex p-3 bg-red-50 rounded-full mb-4">
            <AlertCircle className="text-red-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Invalid reset link</h2>
          <p className="mt-2 text-sm text-gray-500">This link is invalid or has expired.</p>
          <Button 
            className="mt-6 w-full rounded-xl" 
            onClick={() => navigate('/forgot-password')}
          >
            Request new link
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-blue-50 rounded-full mb-4">
            <Lock className="text-blue-600" size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Set new password</h2>
          <p className="mt-2 text-sm text-gray-500">Choose a password you'll remember easily.</p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="New password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              startAdornment={<Lock size={18} className="text-gray-400" />}
              className="rounded-xl"
            />
            
            <Input
              label="Confirm new password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              startAdornment={<ShieldCheck size={18} className="text-gray-400" />}
              className="rounded-xl"
              error={password !== confirmPassword && confirmPassword !== '' ? 'Passwords do not match' : undefined}
            />
            
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              disabled={password !== confirmPassword || password === ''}
              className="py-4 rounded-xl text-md font-bold shadow-lg shadow-blue-100"
            >
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};