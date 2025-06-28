import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { OnBoarding } from '@questlabs/react-sdk';
import questConfig from '../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDollarSign, FiTarget, FiTrendingUp, FiZap } = FiIcons;

const QuestOnboardingPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const getAnswers = () => {
    console.log('Onboarding completed with answers:', answers);
    // Navigate to main dashboard after onboarding completion
    navigate('/dashboard');
  };

  if (!userId || !token) {
    // Redirect to login if no auth data
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex">
      {/* Left Section - Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <SafeIcon icon={FiDollarSign} className="w-10 h-10" />
              <span className="text-2xl font-bold">FinanceAI</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-6">
              Let's Get Started!
              <span className="block text-primary-200">Your Financial Journey Begins</span>
            </h1>
            
            <p className="text-xl text-primary-100 mb-12 max-w-md">
              We're setting up your personalized AI coach to help you achieve your financial goals faster.
            </p>

            {/* Setup Benefits */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiTarget} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Personalized Goals</h3>
                  <p className="text-primary-100 text-sm">Set and track your financial objectives</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiTrendingUp} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Smart Insights</h3>
                  <p className="text-primary-100 text-sm">AI-powered financial recommendations</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiZap} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Instant Setup</h3>
                  <p className="text-primary-100 text-sm">Get started in less than 2 minutes</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      {/* Right Section - Onboarding Component */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 lg:hidden"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold text-gray-900">FinanceAI</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's Get Started!</h2>
            <p className="text-gray-600">Setting up your personalized experience</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Setup Your Profile</h2>
            <p className="text-gray-600">Help us personalize your financial coaching experience</p>
          </motion.div>

          {/* Quest Onboarding Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            style={{ width: '400px', height: 'auto' }}
          >
            <OnBoarding
              userId={userId}
              token={token}
              questId={questConfig.QUEST_ONBOARDING_QUESTID}
              answer={answers}
              setAnswer={setAnswers}
              getAnswers={getAnswers}
              accent={questConfig.PRIMARY_COLOR}
              singleChoose="modal1"
              multiChoice="modal2"
            >
              <OnBoarding.Header />
              <OnBoarding.Content />
              <OnBoarding.Footer />
            </OnBoarding>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6"
          >
            <p className="text-sm text-gray-500">
              This information helps us provide better financial recommendations
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QuestOnboardingPage;