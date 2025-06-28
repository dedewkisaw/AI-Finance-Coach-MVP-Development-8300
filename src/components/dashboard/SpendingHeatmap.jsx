import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCalendar, FiTrendingUp, FiTrendingDown, FiFilter, FiDownload, FiInfo } = FiIcons;

const SpendingHeatmap = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredDay, setHoveredDay] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock spending data for heatmap
  const spendingData = [
    { category: 'Dining', amount: 420, change: 15, color: 'bg-red-500', transactions: 12 },
    { category: 'Groceries', amount: 380, change: -8, color: 'bg-orange-500', transactions: 8 },
    { category: 'Gas', amount: 140, change: 22, color: 'bg-yellow-500', transactions: 4 },
    { category: 'Shopping', amount: 290, change: -12, color: 'bg-purple-500', transactions: 6 },
    { category: 'Bills', amount: 850, change: 2, color: 'bg-blue-500', transactions: 3 },
    { category: 'Entertainment', amount: 180, change: 45, color: 'bg-green-500', transactions: 9 }
  ];

  // Generate calendar heatmap data (last 30 days)
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate random spending for demo
      const spending = Math.floor(Math.random() * 200) + 50;
      const intensity = Math.min(spending / 50, 4); // 0-4 intensity levels
      
      data.push({
        date: date.toISOString().split('T')[0],
        spending: spending,
        intensity: Math.floor(intensity),
        dayOfWeek: date.getDay(),
        transactions: Math.floor(Math.random() * 8) + 1
      });
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  const getIntensityColor = (intensity) => {
    const colors = [
      'bg-gray-100',
      'bg-primary-200',
      'bg-primary-400',
      'bg-primary-600',
      'bg-primary-800'
    ];
    return colors[intensity] || colors[0];
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Spending,Transactions\n"
      + heatmapData.map(row => `${row.date},${row.spending},${row.transactions}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "spending_heatmap.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getDayDetails = (day) => {
    const dayData = heatmapData.find(d => d.date === day);
    return dayData || null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-gray-900">Spending Heatmap</h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <SafeIcon icon={FiInfo} className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={exportData}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <SafeIcon icon={FiDownload} className="w-4 h-4" />
          </button>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {spendingData.map(category => (
              <option key={category.category} value={category.category.toLowerCase()}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Calendar Heatmap */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Last 30 Days</span>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>Less</span>
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map(intensity => (
                <div
                  key={intensity}
                  className={`w-3 h-3 rounded-sm ${getIntensityColor(intensity)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
        
        <div className="grid grid-cols-10 gap-1">
          {heatmapData.map((day, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-sm ${getIntensityColor(day.intensity)} hover:ring-2 hover:ring-primary-300 cursor-pointer transition-all duration-200`}
              title={`${day.date}: $${day.spending}`}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
            />
          ))}
        </div>

        {/* Hovered Day Details */}
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{hoveredDay.date}</h4>
                <p className="text-sm text-gray-600">{hoveredDay.transactions} transactions</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">${hoveredDay.spending}</div>
                <div className="text-xs text-gray-500">Total spent</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Category Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700">Category Breakdown</h4>
          <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
            View All
          </button>
        </div>
        
        {spendingData.map((category, index) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => setSelectedCategory(category.category.toLowerCase())}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${category.color}`} />
              <div>
                <span className="font-medium text-gray-900">{category.category}</span>
                <div className="text-xs text-gray-500">{category.transactions} transactions</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-gray-900">
                ${category.amount}
              </span>
              <div className={`flex items-center space-x-1 text-sm ${
                category.change >= 0 ? 'text-danger-600' : 'text-success-600'
              }`}>
                <SafeIcon icon={category.change >= 0 ? FiTrendingUp : FiTrendingDown} className="w-4 h-4" />
                <span>{Math.abs(category.change)}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insights & Recommendations */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-warning-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-warning-900 mb-1">Spending Alert</h5>
              <p className="text-sm text-warning-800">
                You've increased dining spending by 15% this month. Consider setting a dining budget to stay on track.
              </p>
              <div className="mt-2">
                <button className="text-sm text-warning-700 hover:text-warning-800 font-medium">
                  Set Budget →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">$1,260</div>
            <div className="text-xs text-gray-500">Total This Month</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">42</div>
            <div className="text-xs text-gray-500">Transactions</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">$30</div>
            <div className="text-xs text-gray-500">Avg Per Day</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpendingHeatmap;