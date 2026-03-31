import React, { useEffect, useState } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { getDashboardData } from '../../services/api';
import { DashboardStats } from '../../types';

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardData().then(d => {
      setData(d);
      setLoading(false);
    });
  }, []);

  if (loading || !data) return (
    <div className="animate-pulse space-y-8 p-10">
      <div className="h-10 w-64 bg-slate-200 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => <div key={i} className="h-32 bg-white rounded-2xl border" />)}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Mission Metrics Dashboard</h1>
           <p className="text-slate-500 font-medium text-sm">Real-time indicators overview</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Records" value={data.totalChildren.toLocaleString()} color="blue" />
        <StatCard label="High Risk Cases" value={data.highRiskCount.toString()} color="red" />
        <StatCard label="Improvement" value="18%" color="green" />
        <StatCard label="Districts" value="24" color="indigo" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
           <h2 className="text-lg font-bold text-slate-800 mb-6">Growth Trends</h2>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={data.growthTrends}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="avgRisk" stroke="#2563EB" strokeWidth={3} />
                 </LineChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <h2 className="text-lg font-bold text-slate-800 mb-6">Risk Profile</h2>
           <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie data={data.riskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                       {data.riskDistribution.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: string; color: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
     <p className="text-2xl font-bold text-slate-800 mb-1">{value}</p>
     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
  </div>
);
