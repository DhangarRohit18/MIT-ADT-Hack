import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { analyzeChild } from '../../services/api';
import { AnalysisResult } from '../../types';
import { useStore } from '../../store/useStore';

const childSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  age: z.number().min(0).max(18),
  gender: z.enum(['Male', 'Female', 'Other']),
  weight: z.number().min(0.5).max(150),
  height: z.number().min(30).max(250),
  region: z.string().min(2, 'Region is required'),
});

type ChildForm = z.infer<typeof childSchema>;

export const ChildAnalysis: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  
  const { addToHistory } = useStore();

  const { register, handleSubmit } = useForm<ChildForm>({
    resolver: zodResolver(childSchema),
  });

  const onSubmit = async (data: ChildForm) => {
    setIsAnalyzing(true);
    try {
      const res = await analyzeChild(data);
      setResult(res);
      addToHistory({ ...data, id: Math.random().toString(36).substr(2, 9), analyzedAt: new Date().toISOString() }, res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setResult(null);
  };

  if (isAnalyzing) return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border shadow-sm">
       <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
       <h2 className="text-xl font-bold text-slate-800">Analyzing Profile...</h2>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold text-slate-800">Child Health Analysis</h1>
         {result && <button onClick={reset} className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-bold">New Analysis</button>}
      </div>

      {!result ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 max-w-2xl mx-auto shadow-sm">
           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Full Name</label>
                    <input {...register('name')} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Region</label>
                    <input {...register('region')} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Age</label>
                    <input type="number" {...register('age', { valueAsNumber: true })} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Gender</label>
                    <select {...register('gender')} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-600">
                       <option value="Male">Male</option>
                       <option value="Female">Female</option>
                    </select>
                 </div>
              </div>
              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20">Run AI Diagnosis</button>
           </form>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                 <h3 className="text-lg font-bold mb-4">6-Month Prediction</h3>
                 <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={result.predictions}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="weight" stroke="#2563EB" fill="#EFF6FF" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold mb-6">Recommendations</h3>
              <div className="space-y-6">
                 {result.recommendations.map((rec, i) => (
                    <div key={i} className="border-b pb-4 last:border-0">
                       <h4 className="font-bold text-slate-800 mb-2">{rec.title}</h4>
                       <p className="text-xs text-slate-500 mb-3">{rec.description}</p>
                       <div className="flex flex-wrap gap-2">
                          {rec.actionItems.map((item, j) => (
                             <span key={j} className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded">{item}</span>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
