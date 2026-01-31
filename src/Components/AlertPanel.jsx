const AlertPanel = ({ alerts }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return (
          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical':
        return 'bg-red-500/10 border-red-500/30';
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/30';
      default:
        return 'bg-blue-500/10 border-blue-500/30';
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-cyan-500/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Alerts & Incidents</h3>
        <div className="flex items-center">
          <span className="text-sm text-gray-400 mr-3">Active: {alerts.length}</span>
          <span className="px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded-md">
            {alerts.filter(a => a.type === 'critical').length} Critical
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`p-4 rounded-lg border ${getAlertColor(alert.type)} transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white mb-1">{alert.title}</h4>
                <div className="flex flex-wrap items-center text-sm text-gray-400">
                  <span className="mr-4">{alert.time}</span>
                  <span className="mr-4">{alert.location}</span>
                  {alert.type === 'critical' && (
                    <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-300 rounded">Priority 1</span>
                  )}
                </div>
              </div>
              <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-3 px-4 border border-cyan-700 text-cyan-400 rounded-lg hover:bg-cyan-900/20 transition-all duration-300 flex items-center justify-center">
        View All Alerts
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
};

export default AlertPanel;