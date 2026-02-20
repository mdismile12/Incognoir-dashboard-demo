const SystemStatus = ({ status, immunityScore }) => {
  // const getStatusColor = () => {
  //   if (immunityScore >= 90) return 'text-green-400';
  //   if (immunityScore >= 75) return 'text-yellow-400';
  //   return 'text-red-400';
  // };
  const getStatusColor = () => {
    if (status === "active") return "text-green-500";
    if (status === "warning") return "text-yellow-500";
    if (status === "critical") return "text-red-500";
    return "bg-gray-500";
  };

 const getStatusText = () => {
  if (immunityScore >= 90) return 'Optimal';
  if (immunityScore >= 75) return 'Stable';
  if (immunityScore >= 50) return 'Weak';
  return (immunityScore < 50 ? 'Critical' : 'Attention Required ' );
};

  return (
    <div className="mt-4 p-4 bg-gradient-to-r from-gray-800/50 to-cyan-900/20 rounded-xl border border-cyan-500/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse mr-3"></div>
          <div>
            <h4 className="text-white font-medium">System Overview</h4>
            <p className="text-sm text-gray-400">Real-time immunological surveillance active</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getStatusColor()}`}>{immunityScore}/100</div>
            <div className="text-xs text-gray-400">Immunity Score</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{getStatusText()}</div>
            <div className="text-xs text-gray-400">System Integrity</div>
          </div>
          
          <div className="hidden md:block">
            <div className="text-sm text-gray-400">
              Neural heuristics detected <span className="text-green-400">0 anomalies</span> in the last hour
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;