import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTrendingUp, FiDollarSign, FiTarget, FiClock, FiPlay } = FiIcons;

const Hero = ({ onGetStarted }) => {
  const handleWatchDemo = () => {
    // For demo purposes, we'll show an alert
    alert('Demo video would open here. This is a demo version.');
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                <span>🚀</span>
                <span>Join 15,000+ users already saving money</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your AI-Powered
                <span className="text-primary-500 block">Finance Coach</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg">
                Get personalized insights, predict your financial future, and achieve your money goals faster with AI-driven recommendations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="bg-primary-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Free Analysis
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWatchDemo}
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiPlay} className="w-5 h-5" />
                <span>Watch Demo</span>
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">$2.4M</div>
                <div className="text-sm text-gray-600">Debt Eliminated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">15k+</div>
                <div className="text-sm text-gray-600">Users Coached</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">94%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Financial Health</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Excellent</span>
                  </div>
                </div>

                {/* Health Score */}
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="2"
                        />
                        <motion.path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#4DCB99"
                          strokeWidth="2"
                          strokeDasharray="85, 100"
                          initial={{ strokeDasharray: "0, 100" }}
                          animate={{ strokeDasharray: "85, 100" }}
                          transition={{ duration: 2, delay: 1 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.5 }}
                          className="text-2xl font-bold text-gray-900"
                        >
                          85
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                    className="bg-success-50 p-4 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-success-500" />
                      <span className="text-sm font-medium text-success-800">Savings Rate</span>
                    </div>
                    <div className="text-xl font-bold text-success-900 mt-1">23%</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    className="bg-primary-50 p-4 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiTarget} className="w-5 h-5 text-primary-500" />
                      <span className="text-sm font-medium text-primary-800">Debt-Free</span>
                    </div>
                    <div className="text-xl font-bold text-primary-900 mt-1">2.3 yrs</div>
                  </motion.div>
                </div>

                {/* AI Insight */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 }}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 rounded-lg text-white"
                >
                  <div className="flex items-start space-x-3">
                    <SafeIcon icon={FiDollarSign} className="w-5 h-5 mt-0.5" />
                    <div>
                      <div className="font-medium text-sm">AI Insight</div>
                      <div className="text-sm opacity-90 mt-1">
                        "You could save an extra $340/month by optimizing your subscription spending."
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-success-500 text-white p-3 rounded-full shadow-lg"
            >
              <SafeIcon icon={FiTrendingUp} className="w-6 h-6" />
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-primary-500 text-white p-3 rounded-full shadow-lg"
            >
              <SafeIcon icon={FiTarget} className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;