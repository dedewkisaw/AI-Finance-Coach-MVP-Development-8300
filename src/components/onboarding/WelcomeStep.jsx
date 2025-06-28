import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiDollarSign, FiShield, FiBrain, FiTrendingUp } = FiIcons;

const benefits = [
  {
    icon: FiBrain,
    title: 'AI-Powered Insights',
    description: 'Get personalized financial advice tailored to your spending habits'
  },
  {
    icon: FiShield,
    title: 'Bank-Level Security',
    description: 'Your data is protected with 256-bit encryption and read-only access'
  },
  {
    icon: FiTrendingUp,
    title: 'Predictive Analytics',
    description: 'See your financial future with accurate 90-day forecasts'
  }
];

const WelcomeStep = ({ onNext }) => {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto"
      >
        <SafeIcon icon={FiDollarSign} className="w-10 h-10 text-primary-600" />
      </motion.div>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to FinanceAI
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your personal AI finance coach is here to help you make smarter money decisions and achieve your financial goals faster.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-gray-50 rounded-xl p-6 text-center"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={benefit.icon} className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
            <p className="text-sm text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <button
          onClick={onNext}
          className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Let's Get Started
        </button>
        <p className="text-sm text-gray-500">
          This will take less than 2 minutes to complete
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;