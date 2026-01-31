import { useState, useEffect } from 'react';
import StatCard from './StatCard';
import SystemStatus from './SystemStatus';
import AlertPanel from './AlertPanel';

const Dashboard = ({ demoMode }) => {
  const [dashboardData, setDashboardData] = useState({
    trafficData: 8410,
    threatsBlocked: 1284,
    activeDevices: {
      total: 482,
      healthy: 475,
      risk: 7
    },
    immunityScore: 94,
    alerts: 3,
    systemStatus: 'active',
    lastUpdate: new Date().toISOString()
  });

  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [updateCounter, setUpdateCounter] = useState(0);

  // Generate random number within a range
  const getRandomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Simulate real-time data updates
  useEffect(() => {
    console.log("🔧 Dashboard useEffect triggered");

    const updateData = () => {
      const now = new Date();
      setLastUpdateTime(now);
      setUpdateCounter(prev => prev + 1);
      
      console.log(`🔄 Update #${updateCounter + 1} at ${now.toLocaleTimeString()}`);
      
      setDashboardData(prevData => {
        const newHealthy = getRandomInRange(470, 480);
        const newData = {
          trafficData: getRandomInRange(8000, 9000),
          threatsBlocked: getRandomInRange(1200, 1350),
          activeDevices: {
            total: 482,
            healthy: newHealthy,
            risk: 482 - newHealthy
          },
          immunityScore: getRandomInRange(90, 98),
          alerts: getRandomInRange(2, 5),
          systemStatus: 'active',
          lastUpdate: now.toISOString()
        };
        
        console.log("New data generated:", newData);
        return newData;
      });
    };

    // Initial update
    updateData();
    
    // Update every 2 seconds
    const interval = setInterval(updateData, 3000);
    console.log("⏱️ Interval set for every 2 seconds");

    return () => {
      console.log("🧹 Cleaning up interval");
      clearInterval(interval);
    };
  }, []);

  const alerts = [
    { id: 1, type: 'critical', title: 'Unusual traffic pattern detected', time: '2 minutes ago', location: 'Network Segment A' },
    { id: 2, type: 'warning', title: 'Device health score below threshold', time: '15 minutes ago', location: 'Device ID: SEC-482' },
    { id: 3, type: 'info', title: 'Scheduled maintenance complete', time: '1 hour ago', location: 'All systems' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with debug info */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Incognoir Dashboard {demoMode && '(Demo Mode)'}
            </h1>
            <p className="mt-2 text-gray-400">
              Real-time immunological surveillance and threat analytics
            </p>
            <div className="mt-2 text-sm text-yellow-400">
              Updates: {updateCounter} | Last: {lastUpdateTime.toLocaleTimeString()}
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Auto-refresh: 2s
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse mr-2"></div>
              <span className="text-green-400 text-sm">Live</span>
            </div>
          </div>
        </div>
        
        <SystemStatus 
          status={dashboardData.systemStatus}
          immunityScore={dashboardData.immunityScore}
        />
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Real-time Traffic"
          value={dashboardData.trafficData}
          change={12.5}
          trend="up"
          icon="traffic"
          color="cyan"
          description="Requests per second"
        />
        
        <StatCard
          title="Threats Blocked (24h)"
          value={dashboardData.threatsBlocked}
          change={-3.2}
          trend="down"
          icon="shield"
          color="blue"
          description="Anomalies neutralized"
        />
        
        <StatCard
          title="Active Devices"
          value={dashboardData.activeDevices.total}
          healthy={dashboardData.activeDevices.healthy}
          risk={dashboardData.activeDevices.risk}
          icon="devices"
          color="green"
          description="Network endpoints"
        />
        
        <StatCard
          title="System Immunity Score"
          value={dashboardData.immunityScore}
          max={100}
          icon="health"
          color="purple"
          description="Overall system integrity"
        />
        
        <StatCard
          title="Alerts & Incidents"
          value={dashboardData.alerts}
          critical={1}
          icon="alert"
          color="yellow"
          description="Active notifications"
        />
        
        <StatCard
          title="Response Time"
          value="142"
          unit="ms"
          change={-8.1}
          trend="down"
          icon="speed"
          color="pink"
          description="Average threat response"
        />
      </div>

      {/* Alert Panel and Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AlertPanel alerts={alerts} />
        
        <div className="bg-gray-800/50 rounded-xl border border-cyan-500/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">System Configuration</h3>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
              <span className="text-sm text-green-400">Connected</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-cyan-900/30 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Neural Heuristics</p>
                  <p className="text-sm text-gray-400">Active for 14 days</p>
                </div>
              </div>
              <div className="text-sm text-green-400">0 anomalies</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-blue-900/30 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Threat Protection</p>
                  <p className="text-sm text-gray-400">Active layers: 7</p>
                </div>
              </div>
              <div className="text-sm text-green-400">Enabled</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-purple-900/30 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Analytics Engine</p>
                  <p className="text-sm text-gray-400">Processing: 2.4M events</p>
                </div>
              </div>
              <div className="text-sm text-green-400">Active</div>
            </div>
          </div>
          
          <button className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Emergency Disconnect
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-gray-800/50 rounded-xl border border-cyan-500/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Time</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Event</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Source</th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="py-3 px-4 text-cyan-400">12:04:23</td>
                <td className="py-3 px-4 text-white">Behavioral pattern analysis complete</td>
                <td className="py-3 px-4 text-gray-400">Neural Engine</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-md">Normal</span>
                </td>
              </tr>
              <tr className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="py-3 px-4 text-cyan-400">12:01:15</td>
                <td className="py-3 px-4 text-white">Threat signature updated</td>
                <td className="py-3 px-4 text-gray-400">Global Intelligence</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-md">Updated</span>
                </td>
              </tr>
              <tr className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="py-3 px-4 text-cyan-400">11:58:42</td>
                <td className="py-3 px-4 text-white">Device health check initiated</td>
                <td className="py-3 px-4 text-gray-400">Monitoring System</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded-md">In Progress</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-800/30 transition-colors">
                <td className="py-3 px-4 text-cyan-400">11:55:10</td>
                <td className="py-3 px-4 text-white">Traffic anomaly detected</td>
                <td className="py-3 px-4 text-gray-400">Segment A Gateway</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded-md">Resolved</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;