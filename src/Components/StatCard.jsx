import { useEffect, useState } from 'react';

const  StatCard = ({ title, value, change, trend, icon, color, description, healthy, risk, max, unit, critical }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    // Set initial value immediately
    setAnimatedValue(value);
    setPrevValue(value);
  }, []);

  useEffect(() => {
    if (value !== prevValue) {
      // Animate the value change
      const increment = (value - prevValue) / 20;
      let current = prevValue;
      const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= value) || (increment < 0 && current <= value)) {
          current = value;
          clearInterval(timer);
          setPrevValue(value);
        }
        setAnimatedValue(Math.round(current));
      }, 50);
      return () => clearInterval(timer);
    }
  }, [value, prevValue]);

  const getIcon = () => {
    switch (icon) {
      case 'traffic':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'shield':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'devices':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'health':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        );
      case 'alert':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5" />
          </svg>
        );
      case 'speed':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const colorClasses = {
    cyan: 'bg-gradient-to-br from-cyan-500 to-blue-500',
    blue: 'bg-gradient-to-br from-blue-500 to-indigo-500',
    green: 'bg-gradient-to-br from-green-500 to-emerald-500',
    purple: 'bg-gradient-to-br from-purple-500 to-violet-500',
    yellow: 'bg-gradient-to-br from-yellow-500 to-amber-500',
    pink: 'bg-gradient-to-br from-pink-500 to-rose-500',
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <div className="flex items-end">
            <h3 className="text-3xl font-bold text-white">
              {typeof animatedValue === 'number' ? animatedValue.toLocaleString() : animatedValue}
              {unit && <span className="text-lg text-gray-400 ml-1">{unit}</span>}
            </h3>
            {change !== undefined && (
              <div className={`ml-3 flex items-center text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {trend === 'up' ? (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {Math.abs(change)}%
              </div>
            )}
          </div>
        </div>
        <div className={`h-12 w-12 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
          <div className="text-white">
            {getIcon()}
          </div>
        </div>
      </div>

      {/* Additional metrics for specific cards */}
      {healthy !== undefined && risk !== undefined && (
        <div className="mt-3">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Healthy: {healthy}</span>
            <span className="text-red-400">Risk: {risk}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-red-500"
              style={{ width: `${(healthy / (healthy + risk)) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {max !== undefined && (
        <div className="mt-3">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Score</span>
            <span>{animatedValue}/{max}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-cyan-500"
              style={{ width: `${(animatedValue / max) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {critical !== undefined && (
        <div className="mt-3">
          <div className="flex items-center text-sm">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse mr-2"></div>
            <span className="text-red-400">{critical} critical alert{critical !== 1 ? 's' : ''}</span>
          </div>
        </div>
      )}

      {description && (
        <p className="text-xs text-gray-500 mt-3">{description}</p>
      )}
    </div>
  );
};

export default StatCard;