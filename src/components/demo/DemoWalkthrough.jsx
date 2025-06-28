import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const {FiX, FiChevronLeft, FiChevronRight, FiPlay, FiPause} = FiIcons;

const demoSteps = [
  {
    id: 'welcome',
    title: 'Welcome to FinanceAI Demo!',
    content: 'This is a live demo of our AI-powered finance coach. Let me show you around!',
    target: null,
    position: 'center'
  },
  {
    id: 'health-score',
    title: 'Financial Health Score',
    content: 'Your AI coach analyzes your finances and gives you a health score. This demo shows 85/100 - Excellent!',
    target: '[data-demo="health-card"]',
    position: 'right'
  },
  {
    id: 'ai-chat',
    title: 'AI Finance Coach',
    content: 'Ask your AI coach anything about money! Try "How can I save $500 per month?" or "Where did I overspend?"',
    target: '[data-demo="ai-chat"]',
    position: 'left'
  },
  {
    id: 'insights',
    title: 'Smart Insights',
    content: 'Get personalized recommendations based on your spending patterns. The AI finds money-saving opportunities automatically.',
    target: '[data-demo="insights"]',
    position: 'right'
  },
  {
    id: 'premium',
    title: 'Premium Features',
    content: 'Upgrade to unlock 90-day predictions, advanced debt strategies, and unlimited AI coaching for just €9.98/month.',
    target: '[data-demo="premium-upsell"]',
    position: 'left'
  },
  {
    id: 'complete',
    title: 'Ready to Start?',
    content: 'Sign up now to connect your real bank accounts and get personalized AI coaching for your actual finances!',
    target: null,
    position: 'center'
  }
];

const DemoWalkthrough = ({isOpen, onClose, onSignUp}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= demoSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 4000); // 4 seconds per step
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen]);

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const currentStepData = demoSteps[currentStep];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] pointer-events-none">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 pointer-events-auto" onClick={onClose} />
        
        {/* Demo Tooltip */}
        <motion.div
          initial={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.8}}
          className={`absolute pointer-events-auto bg-white rounded-2xl p-6 shadow-2xl border border-gray-200 max-w-sm ${
            currentStepData.position === 'center' 
              ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              : currentStepData.position === 'right'
              ? 'top-1/2 right-8 transform -translate-y-1/2'
              : 'top-1/2 left-8 transform -translate-y-1/2'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {currentStepData.title}
            </h3>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {currentStepData.content}
          </p>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleAutoPlay}
                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                title={isPlaying ? 'Pause auto-play' : 'Start auto-play'}
              >
                <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="w-4 h-4" />
              </button>
              
              <span className="text-sm text-gray-500">
                {currentStep + 1} / {demoSteps.length}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SafeIcon icon={FiChevronLeft} className="w-4 h-4" />
              </button>
              
              {currentStep === demoSteps.length - 1 ? (
                <button
                  onClick={onSignUp}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Sign Up Now
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <SafeIcon icon={FiChevronRight} className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{width: 0}}
              animate={{width: `${((currentStep + 1) / demoSteps.length) * 100}%`}}
              transition={{duration: 0.3}}
            />
          </div>
        </motion.div>

        {/* Highlight Target Element */}
        {currentStepData.target && (
          <div
            className="absolute border-4 border-primary-500 rounded-lg pointer-events-none animate-pulse"
            style={{
              // This would need JavaScript to position dynamically
              // For demo purposes, we'll skip the actual highlighting
            }}
          />
        )}
      </div>
    </AnimatePresence>
  );
};

export default DemoWalkthrough;