import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTarget, FiHome, FiCar, FiUmbrella, FiTrendingUp, FiDollarSign } = FiIcons;

const goalTypes = [
  { id: 'emergency', icon: FiUmbrella, label: 'Emergency Fund', description: 'Build a safety net' },
  { id: 'debt', icon: FiTarget, label: 'Pay Off Debt', description: 'Become debt-free' },
  { id: 'house', icon: FiHome, label: 'Buy a House', description: 'Save for down payment' },
  { id: 'car', icon: FiCar, label: 'Buy a Car', description: 'Save for new vehicle' },
  { id: 'retirement', icon: FiTrendingUp, label: 'Retirement', description: 'Plan for the future' },
  { id: 'vacation', icon: FiDollarSign, label: 'Vacation', description: 'Save for travel' }
];

const GoalSetting = ({ onComplete }) => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [goalDetails, setGoalDetails] = useState({});

  const handleGoalToggle = (goalId) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(prev => prev.filter(id => id !== goalId));
      const newDetails = { ...goalDetails };
      delete newDetails[goalId];
      setGoalDetails(newDetails);
    } else {
      setSelectedGoals(prev => [...prev, goalId]);
    }
  };

  const handleGoalDetailChange = (goalId, field, value) => {
    setGoalDetails(prev => ({
      ...prev,
      [goalId]: {
        ...prev[goalId],
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    // Save goals to backend
    console.log('Selected goals:', selectedGoals);
    console.log('Goal details:', goalDetails);
    onComplete();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What Are Your Financial Goals?
        </h2>
        <p className="text-gray-600">
          Select your top financial priorities so we can create a personalized plan.
        </p>
      </div>

      {/* Goal Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goalTypes.map((goal) => (
          <motion.div
            key={goal.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGoalToggle(goal.id)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selectedGoals.includes(goal.id)
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                selectedGoals.includes(goal.id)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <SafeIcon icon={goal.icon} className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{goal.label}</h3>
                <p className="text-sm text-gray-500">{goal.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Goal Details */}
      {selectedGoals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-6"
        >
          <h3 className="text-lg font-semibold text-gray-900">Goal Details</h3>
          
          {selectedGoals.map((goalId) => {
            const goal = goalTypes.find(g => g.id === goalId);
            return (
              <div key={goalId} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <SafeIcon icon={goal.icon} className="w-5 h-5 text-primary-600" />
                  <h4 className="font-medium text-gray-900">{goal.label}</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Amount ($)
                    </label>
                    <input
                      type="number"
                      placeholder="10000"
                      value={goalDetails[goalId]?.amount || ''}
                      onChange={(e) => handleGoalDetailChange(goalId, 'amount', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Date
                    </label>
                    <input
                      type="date"
                      value={goalDetails[goalId]?.date || ''}
                      onChange={(e) => handleGoalDetailChange(goalId, 'date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* Submit Button */}
      <div className="text-center space-y-4">
        <button
          onClick={handleSubmit}
          disabled={selectedGoals.length === 0}
          className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {selectedGoals.length === 0 ? 'Select at least one goal' : 'Complete Setup'}
        </button>
        
        {selectedGoals.length === 0 && (
          <button
            onClick={onComplete}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
};

export default GoalSetting;