import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useFinance } from '../../contexts/FinanceContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const { FiTrendingUp, FiEye, FiLock, FiDownload, FiRefreshCw } = FiIcons;

const CashflowChart = () => {
  const { isPremium, getCashflowPrediction } = useFinance();
  const [timeframe, setTimeframe] = useState('30');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const navigate = useNavigate();

  // Mock data for demonstration
  const mockData = {
    '30': [
      { day: 'Day 1', balance: 5200, predicted: 5200, income: 0, expenses: 0 },
      { day: 'Day 5', balance: 4800, predicted: 4750, income: 0, expenses: 400 },
      { day: 'Day 10', balance: 4200, predicted: 4100, income: 0, expenses: 600 },
      { day: 'Day 15', balance: 3800, predicted: 3900, income: 3000, expenses: 400 },
      { day: 'Day 20', balance: 4100, predicted: 4200, income: 0, expenses: 300 },
      { day: 'Day 25', balance: 3900, predicted: 3800, income: 0, expenses: 200 },
      { day: 'Day 30', balance: 4300, predicted: 4400, income: 0, expenses: 0 }
    ],
    '90': [
      { day: 'Week 1', balance: 5200, predicted: 5200, income: 0, expenses: 0 },
      { day: 'Week 4', balance: 4100, predicted: 4200, income: 3000, expenses: 1100 },
      { day: 'Week 8', balance: 3800, predicted: 3900, income: 3000, expenses: 1300 },
      { day: 'Week 12', balance: 4500, predicted: 4600, income: 3000, expenses: 800 }
    ]
  };

  const currentData = mockData[timeframe];

  const handlePremiumFeature = () => {
    if (!isPremium) {
      // Navigate to premium page
      navigate('/premium');
      toast.success('Redirecting to premium options');
      return;
    }

    refreshData();
  };

  const refreshData = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
      toast.success('Cashflow predictions updated');
    }, 1500);
  };

  const exportData = () => {
    if (!isPremium) {
      toast.error('Export is a premium feature');
      return;
    }
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Day,Balance,Predicted\n"
      + currentData.map(row => `${row.day},${row.balance},${row.predicted}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cashflow_${timeframe}days.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Cashflow data for ${timeframe} days exported`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-gray-900">Cashflow Prediction</h3>
          {!isPremium && (
            <span className="bg-warning-100 text-warning-800 px-2 py-1 rounded-full text-xs font-medium">
              Premium
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={refreshData}
            disabled={isLoading || !isPremium}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            aria-label="Refresh cashflow data"
            title={!isPremium ? "Premium feature" : "Refresh data"}
          >
            <SafeIcon icon={FiRefreshCw} className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={exportData}
            disabled={!isPremium}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            aria-label="Export cashflow data"
            title={!isPremium ? "Premium feature" : "Export data"}
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
          </button>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            disabled={!isPremium}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Select timeframe"
          >
            <option value="30">30 Days</option>
            <option value="90">90 Days</option>
          </select>
        </div>
      </div>

      <div className="relative">
        {!isPremium && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiLock} className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h4>
              <p className="text-gray-600 mb-4">Unlock AI-powered cashflow predictions</p>
              <button
                onClick={handlePremiumFeature}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                aria-label="Upgrade to premium"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Simple Chart Representation */}
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 mb-2">📈</div>
            <div className="text-sm text-gray-600">Cashflow Chart</div>
            <div className="text-xs text-gray-500">{timeframe} days forecast</div>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Last updated: {lastUpdated.toLocaleString()}
      </div>

      {/* Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-success-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-success-600" />
            <span className="text-sm font-medium text-success-800">Trend</span>
          </div>
          <div className="text-lg font-bold text-success-900">+$200</div>
          <div className="text-xs text-success-700">vs last period</div>
        </div>
        <div className="bg-primary-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon icon={FiEye} className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-800">Predicted</span>
          </div>
          <div className="text-lg font-bold text-primary-900">$4,400</div>
          <div className="text-xs text-primary-700">End of period</div>
        </div>
        <div className="bg-warning-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-warning-600" />
            <span className="text-sm font-medium text-warning-800">Accuracy</span>
          </div>
          <div className="text-lg font-bold text-warning-900">94%</div>
          <div className="text-xs text-warning-700">AI prediction</div>
        </div>
      </div>
    </motion.div>
  );
};

export default CashflowChart;