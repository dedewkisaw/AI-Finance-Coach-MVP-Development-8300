import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTarget, FiCalendar, FiDollarSign } = FiIcons;

const DebtCountdown = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    years: 2,
    months: 3,
    days: 15
  });

  // Mock debt data
  const totalDebt = 45000;
  const monthlyPayment = 1250;
  const debtFreeDate = new Date('2026-11-15');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = debtFreeDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        
        setTimeRemaining({ years, months, days });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60 * 60 * 24); // Update daily

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Debt-Free Countdown</h3>
        <SafeIcon icon={FiTarget} className="w-6 h-6 opacity-80" />
      </div>

      {/* Countdown Display */}
      <div className="text-center mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">{timeRemaining.years}</div>
            <div className="text-xs opacity-80">Years</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">{timeRemaining.months}</div>
            <div className="text-xs opacity-80">Months</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">{timeRemaining.days}</div>
            <div className="text-xs opacity-80">Days</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>67%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div 
            className="bg-white h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '67%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiDollarSign} className="w-4 h-4 opacity-80" />
          <div>
            <div className="font-medium">${totalDebt.toLocaleString()}</div>
            <div className="opacity-80 text-xs">Total Debt</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiCalendar} className="w-4 h-4 opacity-80" />
          <div>
            <div className="font-medium">${monthlyPayment}</div>
            <div className="opacity-80 text-xs">Monthly Payment</div>
          </div>
        </div>
      </div>

      {/* Target Date */}
      <div className="mt-4 pt-4 border-t border-white/20 text-center">
        <div className="text-sm opacity-80">Target Debt-Free Date</div>
        <div className="font-semibold">{debtFreeDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</div>
      </div>
    </motion.div>
  );
};

export default DebtCountdown;