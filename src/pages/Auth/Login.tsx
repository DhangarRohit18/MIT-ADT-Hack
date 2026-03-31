import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useStore } from '../../store/useStore';

const loginSchema = z.object({
  email: z.string().email('Invalid health mission ID or email'),
  password: z.string().min(6, 'Access code must be at least 6 characters'),
  role: z.enum(['Health Worker', 'Admin']),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const { login } = useStore();
  const [activeRole, setActiveRole] = useState<'Health Worker' | 'Admin'>('Health Worker');
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: 'Health Worker' }
  });

  const onSubmit = (data: LoginForm) => {
    login(data.email, data.role);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left Decoration */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-blue-600 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-xl">
               <span className="font-bold text-2xl">N</span>
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">NutriVerse AI</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight max-w-md">
            Advanced Predictive Nutrition Intelligence
          </h2>
          <div className="space-y-6">
             {[
               "AI-Powered Risk Assessment",
               "6-Month Anthropometric Predictions",
               "Dynamic Recommendation Engine",
               "Integrated Government Scheme Lookup"
             ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-white/90 font-medium">
                   <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
                   <span className="text-sm">{text}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-20 bg-slate-50">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-lg border border-slate-200">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Please sign in to access your dashboard</p>
          </div>

          <div className="space-y-6">
            <div className="p-1 bg-slate-100 rounded-xl flex gap-1">
               <button 
                  type="button"
                  onClick={() => {
                    setActiveRole('Health Worker');
                    login('worker@health.gov.in', 'Health Worker');
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all shadow-sm ${
                     activeRole === 'Health Worker' ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 hover:text-slate-700'
                  }`}
               >
                  Login as Health Worker
               </button>
               <button 
                  type="button"
                  onClick={() => {
                    setActiveRole('Admin');
                    login('admin@health.gov.in', 'Admin');
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all shadow-sm ${
                     activeRole === 'Admin' ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 hover:text-slate-700'
                  }`}
               >
                  Login as Admin
               </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-bold tracking-widest">Or Authenticate Manually</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Official ID</label>
                  <input 
                     {...register('email')}
                     className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-medium text-slate-800" 
                     placeholder="name@health.gov.in" 
                  />
                  {errors.email && <p className="mt-1.5 text-xs font-bold text-red-500 ml-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Access Code</label>
                  <input 
                     {...register('password')}
                     type="password"
                     className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all font-medium text-slate-800" 
                     placeholder="••••••••" 
                  />
                  {errors.password && <p className="mt-1.5 text-xs font-bold text-red-500 ml-1">{errors.password.message}</p>}
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
              >
                Authenticate
              </button>
            </form>
          </div>
          
          <div className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest px-8 leading-relaxed">
             This is a secure government portal. All access attempts are logged and monitored for mission security.
          </div>
        </div>
      </div>
    </div>
  );
};
