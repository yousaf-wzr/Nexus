import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { forgotPassword } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      // Error is typically handled by toast or AuthContext
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-10 px-6 shadow-xl sm:rounded-2xl sm:px-10 text-center border border-gray-100">
            <div className="inline-flex p-3 bg-green-50 rounded-full mb-4">
              <CheckCircle2 className="text-green-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Check your email
            </h2>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              We've sent password reset instructions to <br />
              <span className="font-semibold text-gray-900">{email}</span>
            </p>
            
            <div className="mt-8 space-y-3">
              <p className="text-xs text-gray-400 mb-6">
                Didn't receive the email? Check your spam folder or try another address.
              </p>
              
              <Button
                variant="outline"
                fullWidth
                onClick={() => setIsSubmitted(false)}
                className="rounded-xl border-gray-200 py-3"
              >
                Try a different email
              </Button>
              
              <Link to="/login" className="block mt-4">
                <Button
                  variant="ghost"
                  fullWidth
                  leftIcon={<ArrowLeft size={18} />}
                  className="text-gray-500 hover:text-gray-900"
                >
                  Back to login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-blue-50 rounded-full mb-4">
            <Mail className="text-blue-600" size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Enter your email to receive recovery instructions
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              startAdornment={<Mail size={18} className="text-gray-400" />}
              className="rounded-xl border-gray-200 focus:ring-blue-500"
            />
            
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              className="py-4 rounded-xl text-md font-bold shadow-lg shadow-blue-100"
            >
              Send Instructions
            </Button>
            
            <div className="relative flex justify-center text-xs uppercase tracking-widest my-4">
              <span className="px-2 bg-white text-gray-400">or</span>
            </div>

            <Link to="/login" className="block">
              <Button
                variant="ghost"
                fullWidth
                leftIcon={<ArrowLeft size={18} />}
                className="text-gray-500 font-bold"
              >
                Back to login
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};