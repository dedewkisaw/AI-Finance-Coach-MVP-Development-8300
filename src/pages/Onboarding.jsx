import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import PlaidLink from '../components/onboarding/PlaidLink';
import GoalSetting from '../components/onboarding/GoalSetting';
import WelcomeStep from '../components/onboarding/WelcomeStep';

const { FiCheck, FiArrowRight } = FiIcons;

const steps = [
  { id: 'welcome', title: 'Welcome', description: 'Let\'s get you started' },
  { id: 'connect', title: 'Connect Bank', description: 'Securely link your accounts' },
  { id: 'goals', title: 'Set Goals', description: 'Define your financial objectives' },
  { id: 'complete', title: 'Complete', description: 'You\'re all set!' }
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const navigate = useNavigate();

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Onboarding complete, redirect to dashboard
      navigate('/dashboard');
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return <WelcomeStep onNext={handleStepComplete} />;
      case 'connect':
        return <PlaidLink onSuccess={handleStepComplete} />;
      case 'goals':
        return <GoalSetting onComplete={handleStepComplete} />;
      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto">
              <SafeIcon icon={FiCheck} className="w-8 h-8 text-success-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h2>
              <p className="text-gray-600">
                Your AI finance coach is ready to help you achieve your financial goals.
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Go to Dashboard</span>
              <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 relative">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    completedSteps.includes(index)
                      ? 'bg-success-600 border-success-600 text-white'
                      : index === currentStep
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {completedSteps.includes(index) ? (
                      <SafeIcon icon={FiCheck} className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 ml-4 transition-all duration-300 ${
                      completedSteps.includes(index) ? 'bg-success-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
                
                <div className="mt-2">
                  <div className={`text-sm font-medium ${
                    index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
        >
          {renderStepContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;