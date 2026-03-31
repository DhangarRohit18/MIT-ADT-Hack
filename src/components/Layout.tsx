import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../store/useStore';

const sidebarItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Predictive Analysis', path: '/analysis' },
  { name: 'Regional Insights', path: '/regional' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useStore();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">N</span>
          </div>
          <span className="font-bold text-slate-800">NutriVerse AI</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
          {isSidebarOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-40 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 overflow-y-auto`}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <div>
              <h1 className="font-bold text-slate-800 leading-tight">NutriVerse AI</h1>
              <p className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Predictive Health Intelligence</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-blue-600/5 text-blue-600' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`
                }
              >
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex items-center gap-3 mb-1">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 truncate text-sm">{user?.name || 'Health Worker'}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.role || 'Guest'}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="w-full mt-3 flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 hidden lg:flex items-center justify-between px-8 bg-white border-b border-slate-200">
          <div className="flex-1 max-w-xl">
             <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Search child records..."
                  className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-blue-600/20 focus:ring-4 focus:ring-blue-600/5 pl-4 pr-4 py-2 rounded-xl text-sm transition-all outline-none border hover:border-slate-200"
                />
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-3">
                <div className="text-right">
                   <p className="text-sm font-bold text-slate-800 leading-none">Session: Active</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 border border-blue-600/20">
                   U
                </div>
             </div>
          </div>
        </header>

        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
           <div className="max-w-7xl mx-auto">
              {children}
           </div>
        </div>
      </main>
    </div>
  );
};
