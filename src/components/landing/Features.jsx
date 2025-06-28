import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiBrain, FiTrendingUp, FiShield, FiClock, FiTarget, FiDollarSign } = FiIcons;

const features = [
  {
    icon: FiBrain,
    title: 'AI-Powered Insights',
    description: 'Get personalized financial advice based on your spending patterns and goals.',
    color: 'primary'
  },
  {
    icon: FiTrendingUp,
    title: 'Cashflow Prediction',
    description: 'See your financial future with 90-day balance forecasts and trend analysis.',
    color: 'success'
  },
  {
    icon: FiTarget,
    title: 'Debt-Free Timeline',
    description: 'Calculate exactly when you\'ll be debt-free with actionable payment strategies.',
    color: 'warning'
  },
  {
    icon: FiShield,
    title: 'Bank-Level Security',
    description: 'Your data is protected with 256-bit encryption and read-only bank connections.',
    color: 'primary'
  },
  {
    icon: FiClock,
    title: 'Real-Time Monitoring',
    description: 'Track spending in real-time with instant alerts for budget overruns.',
    color: 'danger'
  },
  {
    icon: FiDollarSign,
    title: 'Smart Savings',
    description: 'Discover hidden money leaks and automated savings opportunities.',
    color: 'success'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Master Your Money
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI analyzes your financial data to provide personalized insights and actionable recommendations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-6`}>
                <SafeIcon icon={feature.icon} className={`w-6 h-6 text-${feature.color}-500`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ask Your AI Finance Coach Anything
              </h3>
              <p className="text-primary-100 text-lg mb-6">
                Get instant answers to complex financial questions with natural language AI
              </p>
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-sm">
                  "Where did I overspend last month?"
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-sm">
                  "How can I save $500 per month?"
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-sm">
                  "Predict my balance in 90 days"
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiBrain} className="w-4 h-4" />
                  </div>
                  <span className="font-medium">AI Coach</span>
                </div>
                <p className="text-sm text-primary-100">
                  "Based on your spending patterns, you're overspending $243/month on dining out. I can help you create a budget that saves this amount while still enjoying meals out 2-3 times per week."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;