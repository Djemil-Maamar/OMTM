"use client";
import React, { useState } from 'react';
import { 
  Radio, Activity, ClipboardList, MapPin, Users,
  ChevronRight, Search, SlidersHorizontal, Plus,
  AlertTriangle, Wrench, CheckCircle, BarChart2,
  ArrowRight, FileText
} from 'lucide-react';

/* STREAMING_CHUNK:Initializing mock data and shared constants... */

const mockQueue = [
  {
    id: 'CM-1790962871421-8BBB',
    type: 'CM',
    title: 'asdf',
    site: 'ABV-083 · Gwarinpa Ridge',
    tech: 'Chinyere Okafor',
    status: 'DISPATCHED',
    priority: 'HIGH',
    overdue: true
  },
  {
    id: 'PM-26-0002',
    type: 'PM',
    title: 'Quarterly BTS inspection',
    site: 'ABV-083 · Gwarinpa Ridge',
    tech: 'Amina Yusuf',
    status: 'NEW',
    priority: 'MEDIUM',
    overdue: false
  },
  {
    id: 'CM-26-0001',
    type: 'CM',
    title: 'Sector 2 VSWR alarm',
    site: 'LAG-214 · Ajegunle Macro 1',
    tech: 'Chinyere Okafor',
    status: 'IN PROGRESS',
    priority: 'HIGH',
    overdue: true
  },
  {
    id: 'GPM-26-0003',
    type: 'GPM',
    title: 'Generator oil and load test',
    site: 'KAN-117 · Tarauni North',
    tech: 'Unassigned',
    status: 'NEW',
    priority: 'CRITICAL',
    overdue: true
  }
];

const mockLogs = [
  {
    id: 1,
    author: 'Operations Desk',
    action: 'Task created and dispatched to technician #1.',
    ref: 'CM-1790962871421-8BBB',
    date: '2 oct., 18:41'
  },
  {
    id: 2,
    author: 'Operations Desk',
    action: 'Status changed to new.',
    ref: 'PM-26-0002',
    date: '2 oct., 18:40'
  },
  {
    id: 3,
    author: 'Operations Desk',
    action: 'Status changed to dispatched.',
    ref: 'PM-26-0002',
    date: '2 oct., 18:40'
  },
  {
    id: 4,
    author: 'asdfg',
    action: 'sdfg',
    ref: 'PM-26-0002',
    date: '2 oct., 18:39'
  },
  {
    id: 5,
    author: 'Operations Desk',
    action: 'Status changed to new.',
    ref: 'PM-26-0002',
    date: '2 oct., 18:23'
  }
];

/* STREAMING_CHUNK:Building utility components and UI blocks... */

const StatusBadge = ({ status }) => {
  const styles = {
    'NEW': 'bg-gray-100 text-gray-700 border-gray-200',
    'DISPATCHED': 'bg-amber-50 text-amber-700 border-amber-200',
    'IN PROGRESS': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'COMPLETED': 'bg-teal-50 text-teal-700 border-teal-200',
  };
  
  const selectedStyle = styles[status] || styles['NEW'];
  
  return (
    <span className={`px-2 py-0.5 text-xs font-semibold rounded border flex items-center gap-1.5 ${selectedStyle}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'NEW' ? 'bg-gray-400' : status === 'DISPATCHED' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
      {status}
    </span>
  );
};

const PriorityText = ({ priority, overdue }) => {
  const isHigh = priority === 'HIGH' || priority === 'CRITICAL';
  return (
    <div className="flex flex-col text-xs font-medium text-right">
      <span className={isHigh ? 'text-red-600' : 'text-amber-600'}>{priority}</span>
      {overdue && <span className="text-red-600 uppercase">OVERDUE</span>}
    </div>
  );
};

/* STREAMING_CHUNK:Constructing the main Dashboard Overview component... */

const DashboardOverview = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8 h-full overflow-y-auto">
      
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs font-semibold text-slate-500 tracking-wider mb-1">DISPATCH OVERVIEW / EAST REGION</p>
          <h1 className="text-3xl font-bold text-slate-800">Shift at a glance</h1>
          <p className="text-slate-500 mt-1">Live maintenance workload across the network.</p>
        </div>
        <button className="bg-[#2d7a6b] hover:bg-[#246155] text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition-colors">
          <ClipboardList size={16} />
          Open dispatch board
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { title: 'Open work orders', count: '4', sub: 'Awaiting closeout', icon: <FileText size={20} />, border: 'border-l-teal-600' },
          { title: 'In field', count: '1', sub: 'Technicians on task', icon: <Wrench size={20} />, border: 'border-l-teal-500' },
          { title: 'Past due', count: '3', sub: 'Needs dispatcher attention', icon: <AlertTriangle size={20} className="text-red-500" />, border: 'border-l-red-500', alert: true },
          { title: 'Closed today', count: '0', sub: 'Completed this shift', icon: <CheckCircle size={20} />, border: 'border-l-slate-300' },
          { title: 'Network footprint', count: '3', sub: '3 field technicians', icon: <BarChart2 size={20} />, border: 'border-l-orange-400' },
        ].map((kpi, idx) => (
          <div key={idx} className={`bg-white p-5 rounded-lg border border-slate-200 shadow-sm border-l-4 ${kpi.border} flex flex-col justify-between`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-semibold text-slate-700">{kpi.title}</h3>
              <span className="text-slate-400">{kpi.icon}</span>
            </div>
            <div>
              <p className={`text-3xl font-bold ${kpi.alert ? 'text-red-600' : 'text-slate-800'}`}>{kpi.count}</p>
              <p className="text-xs text-slate-500 mt-1">{kpi.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Active Work Queue */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Active work queue</h2>
              <p className="text-sm text-slate-500">Latest task activity across the region</p>
            </div>
            <button className="text-[#2d7a6b] font-semibold text-sm flex items-center gap-1 hover:underline">
              View dispatch board <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="flex-1 overflow-auto">
            {mockQueue.map((task, idx) => (
              <div key={task.id} className="p-4 border-b border-slate-100 hover:bg-slate-50 flex items-center justify-between group cursor-pointer transition-colors">
                <div className="flex gap-4 w-1/3">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{task.title}</h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{task.id} · {task.type}</p>
                  </div>
                </div>
                
                <div className="w-1/3 px-2">
                  <p className="text-sm font-semibold text-slate-700">{task.site}</p>
                  <p className="text-xs text-slate-500">{task.tech}</p>
                </div>
                
                <div className="w-1/4 flex justify-end px-2">
                  <StatusBadge status={task.status} />
                </div>
                
                <div className="w-1/6 flex justify-end">
                  <PriorityText priority={task.priority} overdue={task.overdue} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Operations Log */}
        <div className="bg-[#fcfdfd] rounded-lg border border-slate-200 shadow-sm flex flex-col h-[600px]">
          <div className="p-5 border-b border-slate-100 flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Operations log</h2>
              <p className="text-sm text-slate-500">Recent field and dispatch updates</p>
            </div>
            <Activity size={20} className="text-[#2d7a6b]" />
          </div>
          
          <div className="flex-1 overflow-auto p-5 relative">
            <div className="absolute top-5 bottom-5 left-8 w-px bg-slate-200"></div>
            
            <div className="flex flex-col gap-6 relative">
              {mockLogs.map((log) => (
                <div key={log.id} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#ebf4f1] border border-[#a4c9c0] flex items-center justify-center shrink-0 z-10 mt-1 text-[#2d7a6b]">
                    <Activity size={12} />
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex-1 text-sm">
                    <p className="text-slate-800">
                      <span className="font-bold">{log.author}</span> · {log.action}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      {log.ref} · {log.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

/* STREAMING_CHUNK:Building the primary App layout, Sidebar, and Header... */

export default function App() {
  const [activeTab, setActiveTab] = useState('Overview');

  const navItems = [
    { name: 'Overview', icon: <Activity size={20} /> },
    { name: 'Work orders', icon: <ClipboardList size={20} />, badge: 3 },
    { name: 'Network sites', icon: <MapPin size={20} /> },
    { name: 'Field team', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] font-sans text-slate-800 selection:bg-[#2d7a6b] selection:text-white">
      
      {/* Sidebar Navigation */}
      <aside className="w-[240px] bg-[#15222b] text-slate-300 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 gap-3 pt-4 mb-6">
          <div className="w-10 h-10 bg-[#2d7a6b] rounded-lg flex items-center justify-center text-white shrink-0">
            <Radio size={24} />
          </div>
          <div>
            <h1 className="text-white font-bold tracking-wide leading-tight">GSM O&M</h1>
            <p className="text-[10px] text-slate-400 tracking-wider font-semibold">NETWORK OPERATIONS</p>
          </div>
        </div>

        <div className="px-6 mb-2">
          <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Dispatch Desk</p>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-3">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-md transition-colors ${
                activeTab === item.name 
                  ? 'bg-[#1e2e38] text-white border-l-2 border-[#48a593]' 
                  : 'hover:bg-[#1e2e38] hover:text-white border-l-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 font-medium text-sm">
                {item.icon}
                {item.name}
              </div>
              {item.badge && (
                <span className="bg-[#c25146] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Live Channel Indicator */}
        <div className="p-6 border-t border-[#1e2e38] mt-auto flex items-center gap-2 text-xs font-semibold text-slate-400">
          <div className="w-2 h-2 rounded-full bg-[#2d7a6b] animate-pulse"></div>
          Dispatch channel live
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-[#fdfdfc] border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center text-sm text-slate-500 font-medium">
            <span className="hover:text-slate-800 cursor-pointer">Operations</span>
            <ChevronRight size={16} className="mx-1 opacity-50" />
            <span className="text-slate-800 font-bold">{activeTab}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-xs font-semibold text-slate-500 tracking-widest uppercase">
              Regional Control / East
            </div>
            
            <div className="flex items-center bg-slate-100 rounded-md border border-slate-200 text-xs font-bold text-slate-600">
              <span className="px-3 py-1.5 border-r border-slate-200">SHIFT</span>
              <span className="px-3 py-1.5 text-slate-800 font-mono">07:00–19:00</span>
            </div>

            <div className="flex items-center gap-2 pl-4 border-l border-slate-200 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-[#ebf4f1] text-[#2d7a6b] flex items-center justify-center font-bold text-xs group-hover:bg-[#2d7a6b] group-hover:text-white transition-colors">
                OC
              </div>
              <span className="text-sm font-bold text-slate-800">Ops control</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-hidden relative bg-[#fafaf9]">
          {activeTab === 'Overview' && <DashboardOverview />}
          {activeTab !== 'Overview' && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <Activity size={48} className="mb-4 opacity-20" />
              <h2 className="text-xl font-bold text-slate-600 mb-2">{activeTab} module</h2>
              <p className="text-sm text-slate-500">Navigate to 'Overview' to view the active operational telemetry.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
```eof