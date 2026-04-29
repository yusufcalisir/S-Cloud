import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, AreaChart, Area
} from 'recharts';
import { 
  Activity, Clock, DollarSign, Zap, AlertTriangle, CheckCircle, 
  TrendingUp, MapPin, Navigation, ShieldAlert, Cpu
} from 'lucide-react';

// --- Dummy Initial Data ---
const initialChartData = [
  { name: 'Doha', speed: 22 },
  { name: 'Lusail', speed: 18 },
  { name: 'Al Rayyan', speed: 28 },
];

const initialOrders = [
  { id: 'ORD-991', location: 'Doha', status: 'Picked Up', time: '2 mins ago', risk: 'Low' },
  { id: 'ORD-992', location: 'Lusail', status: 'Cooking', time: '12 mins ago', risk: 'High' },
  { id: 'ORD-993', location: 'Al Rayyan', status: 'Assigned', time: '5 mins ago', risk: 'Medium' },
  { id: 'ORD-994', location: 'Doha', status: 'On the way', time: '1 min ago', risk: 'Low' },
  { id: 'ORD-995', location: 'Lusail', status: 'Ready', time: '8 mins ago', risk: 'Medium' },
  { id: 'ORD-996', location: 'Al Rayyan', status: 'Cooking', time: '14 mins ago', risk: 'High' },
  { id: 'ORD-997', location: 'Lusail', status: 'On the way', time: '3 mins ago', risk: 'Low' },
  { id: 'ORD-998', location: 'Doha', status: 'Picked Up', time: '6 mins ago', risk: 'Medium' },
];

const initialVolumeData = [
  { time: '08:00', orders: 120 },
  { time: '10:00', orders: 210 },
  { time: '12:00', orders: 450 },
  { time: '14:00', orders: 380 },
  { time: '16:00', orders: 490 },
  { time: '18:00', orders: 850 },
  { time: '20:00', orders: 920 },
  { time: '22:00', orders: 510 },
];

const initialAlerts = [
  { id: 1, text: "High demand in Lusail: Recommend shifting 5 riders from Al Dafna to reduce wait time by 12%.", type: "urgent" },
  { id: 2, text: "Sufra AI indicates 15% increase in prep times at Downtown branches. Monitor active dispatches.", type: "warning" },
  { id: 3, text: "Fleet distribution optimal in Al Rayyan. Estimated cost-per-delivery stable.", type: "info" },
  { id: 4, text: "System anomaly detected: Dispatch latency spike in zone 4. Auto-resolving.", type: "warning" },
  { id: 5, text: "Route optimization model successfully deployed to 450 active nodes.", type: "info" }
];

export default function Dashboard() {
  // --- State ---
  const [activeFleet, setActiveFleet] = useState(1243);
  const [onTimeRate, setOnTimeRate] = useState(94.2);
  const [prepTime, setPrepTime] = useState(14.5);
  const [costPerDelivery, setCostPerDelivery] = useState(4.25);
  
  const [chartData, setChartData] = useState(initialChartData);
  const [orders, setOrders] = useState(initialOrders);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [volumeData, setVolumeData] = useState(initialVolumeData);

  // --- Real-time Simulation ---
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate KPIs slightly
      setActiveFleet(prev => prev + Math.floor(Math.random() * 11) - 5);
      setOnTimeRate(prev => Math.min(100, Math.max(80, prev + (Math.random() * 0.8 - 0.4))));
      setPrepTime(prev => Math.max(10, prev + (Math.random() * 0.6 - 0.3)));
      setCostPerDelivery(prev => Math.max(3.0, prev + (Math.random() * 0.1 - 0.05)));

      // Fluctuate Chart Data
      setChartData(prev => prev.map(item => ({
        ...item,
        speed: Math.max(10, item.speed + Math.floor(Math.random() * 5) - 2)
      })));

      // Fluctuate Volume Data
      setVolumeData(prev => prev.map(item => ({
        ...item,
        orders: Math.max(50, item.orders + Math.floor(Math.random() * 41) - 20)
      })));

      // Randomly update an order's status
      setOrders(prev => {
        const newOrders = [...prev];
        const randomIndex = Math.floor(Math.random() * newOrders.length);
        const statuses = ['Picked Up', 'Cooking', 'Assigned', 'On the way', 'Ready', 'Delivered'];
        const currentStatus = newOrders[randomIndex].status;
        let nextStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        if (currentStatus !== 'Delivered') {
          newOrders[randomIndex] = {
            ...newOrders[randomIndex],
            status: nextStatus,
            time: 'Just now'
          };
        }
        return newOrders;
      });

    }, 3500); // update every 3.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-snoonu-anthracite text-white font-sans p-3 flex flex-col gap-3">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-2 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <span className="text-snoonu-orange"><Activity size={32} /></span>
            S-Cloud Command Center
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Fleet Health &amp; AI Optimization Dashboard</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3 bg-gray-900 px-4 py-2 rounded-full border border-gray-800 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-snoonu-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-snoonu-orange"></span>
            </span>
            <span className="text-sm font-medium text-gray-300">Live System: Operational</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 flex-1 min-h-0">
        
        {/* Main Content Area */}
        <div className="lg:col-span-3 flex flex-col gap-3 min-h-0">
          
          {/* Executive KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
            
            {/* KPI 1: Active Fleet */}
            <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-3 rounded-2xl shadow-lg relative overflow-hidden group hover:border-snoonu-orange/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Active Fleet</p>
                  <h3 className="text-3xl font-bold mt-1 text-white">{activeFleet}</h3>
                </div>
                <div className="p-2 bg-snoonu-orange/10 rounded-lg text-snoonu-orange">
                  <Navigation size={24} className="group-hover:animate-pulse" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-emerald-400">
                <TrendingUp size={14} /> <span>+24 from last hour</span>
              </div>
              {/* Decorative gradient */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-snoonu-orange/5 rounded-full blur-2xl"></div>
            </div>

            {/* KPI 2: On-Time Delivery Rate */}
            <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-3 rounded-2xl shadow-lg hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm font-medium">On-Time Rate</p>
                  <h3 className="text-3xl font-bold mt-1 text-white">{onTimeRate.toFixed(1)}%</h3>
                </div>
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <CheckCircle size={24} />
                </div>
              </div>
              <div className="mt-3 w-full bg-gray-800 rounded-full h-1.5 mb-1 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-1000 ease-in-out" style={{ width: `${onTimeRate}%` }}></div>
              </div>
            </div>

            {/* KPI 3: Avg Prep Time */}
            <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-3 rounded-2xl shadow-lg hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Avg. Prep Time</p>
                  <h3 className="text-3xl font-bold mt-1 text-white">{prepTime.toFixed(1)} <span className="text-lg font-normal text-gray-500">min</span></h3>
                </div>
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <Clock size={24} />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-gray-400">
                <Cpu size={14} className="text-blue-400" /> <span>Sufra AI Estimated</span>
              </div>
            </div>

            {/* KPI 4: Cost Per Delivery */}
            <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-3 rounded-2xl shadow-lg hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Cost/Delivery</p>
                  <h3 className="text-3xl font-bold mt-1 text-white"><span className="text-lg font-normal text-gray-500">QAR</span> {costPerDelivery.toFixed(2)}</h3>
                </div>
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <DollarSign size={24} />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm text-emerald-400">
                <TrendingUp size={14} className="rotate-180" /> <span>-0.12 vs yesterday</span>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-1 min-h-0">
            
            {/* Regional Performance Chart */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-3 shadow-lg flex flex-col min-h-0">
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2 shrink-0">
                <MapPin size={18} className="text-snoonu-orange" />
                Regional Delivery Speeds (mins)
              </h3>
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={36}>
                    <defs>
                      <linearGradient id="colorDoha" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#ef4444" stopOpacity={0.2}/>
                      </linearGradient>
                      <linearGradient id="colorLusail" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF5A00" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#FF5A00" stopOpacity={0.2}/>
                      </linearGradient>
                      <linearGradient id="colorRayyan" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <RechartsTooltip 
                      cursor={{fill: '#222'}}
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="speed" radius={[6, 6, 0, 0]} animationDuration={1000} background={{ fill: '#1A1A1A', radius: [6, 6, 0, 0] }}>
                      {
                        chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? "url(#colorDoha)" : index === 1 ? "url(#colorLusail)" : "url(#colorRayyan)"} />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Live Dispatch Feed */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-3 shadow-lg flex flex-col min-h-0">
              <div className="flex justify-between items-center mb-3 shrink-0">
                <h3 className="text-base font-semibold flex items-center gap-2">
                  <Zap size={18} className="text-yellow-400" />
                  Live Dispatch Feed
                </h3>
                <span className="text-xs font-medium px-2 py-1 bg-gray-800 rounded text-gray-400">Last 6 Orders</span>
              </div>
              
              <div className="overflow-hidden flex-1 min-h-0">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-800">
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Location</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/50">
                    {orders.slice(0, 6).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-800/20 transition-colors group">
                        <td className="py-3 font-medium text-gray-300">{order.id}</td>
                        <td className="py-3 text-gray-400">{order.location}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border
                            ${order.status === 'Cooking' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                              order.status === 'Picked Up' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                              order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              'bg-gray-800 text-gray-300 border-gray-700'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <span className={`inline-flex items-center gap-1 
                            ${order.risk === 'High' ? 'text-red-400' : 
                              order.risk === 'Medium' ? 'text-yellow-400' : 'text-emerald-400'}`}>
                            {order.risk === 'High' && <AlertTriangle size={14} />}
                            {order.risk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar: AI Optimizer Panel & Nodes Status */}
        <div className="lg:col-span-1 flex flex-col gap-3 min-h-0">
          
          {/* AI Optimizer Panel */}
          <div className="bg-gradient-to-b from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-3 shadow-lg flex flex-col relative overflow-hidden h-full flex-1">
            {/* Fancy Background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-snoonu-orange/10 rounded-full blur-3xl"></div>
            
            <div className="flex items-center gap-3 mb-4 relative z-10 shrink-0">
              <div className="p-2 bg-snoonu-orange/20 rounded-xl">
                <Cpu size={20} className="text-snoonu-orange" />
              </div>
              <div>
                <h3 className="text-base font-semibold">S-Cloud AI Suggestions</h3>
                <p className="text-xs text-snoonu-orange font-medium mt-0.5">Optimization Active</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 relative z-10 overflow-hidden min-h-0">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-xl border relative overflow-hidden group
                  ${alert.type === 'urgent' ? 'bg-red-500/5 border-red-500/20' : 
                    alert.type === 'warning' ? 'bg-yellow-500/5 border-yellow-500/20' : 
                    'bg-blue-500/5 border-blue-500/20'}`}>
                  
                  {/* Accent Line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 
                    ${alert.type === 'urgent' ? 'bg-red-500' : 
                      alert.type === 'warning' ? 'bg-yellow-500' : 
                      'bg-blue-500'}`}></div>
                  
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      {alert.type === 'urgent' ? <ShieldAlert size={18} className="text-red-400" /> : 
                       alert.type === 'warning' ? <AlertTriangle size={18} className="text-yellow-400" /> : 
                       <Activity size={18} className="text-blue-400" />}
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {alert.text}
                    </p>
                  </div>
                  
                  {alert.type === 'urgent' && (
                    <button className="mt-3 ml-7 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors duration-200 flex items-center gap-1">
                      Execute Shift <Activity size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800 text-center relative z-10 shrink-0">
              <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                Powered by <span className="font-semibold text-gray-300">Sufra AI Engine</span>
              </p>
            </div>
          </div>

          </div>

      </div>

      {/* Full Width Bottom Row: Delivery Volume Trend */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-3 shadow-lg flex flex-col gap-2 shrink-0 h-[25vh] min-h-[180px]">
        <div className="flex justify-between items-center shrink-0">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-400" />
            Delivery Volume Trend (Today)
          </h3>
          <span className="text-xs font-medium px-2 py-1 bg-gray-800 rounded text-gray-400">Live Updates</span>
        </div>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <AreaChart data={volumeData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="time" stroke="#888" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
              <YAxis stroke="#888" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
              <RechartsTooltip 
                cursor={{stroke: '#555', strokeWidth: 1, strokeDasharray: '3 3'}}
                contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#3b82f6' }}
              />
              <Area type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorOrders)" animationDuration={1000} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
