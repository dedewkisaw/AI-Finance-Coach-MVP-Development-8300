import React from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const {FiZap, FiTrendingUp, FiBrain, FiTarget, FiArrowRight} = FiIcons;

const PremiumUpsell = ({onUpgradeClick}) => {
  const premiumFeatures = [
    {icon: FiBrain, text: 'Unlimited AI coaching'},
    {icon: FiTrendingUp, text: '90-day predictions'},
    {icon: FiTarget, text: 'Advanced debt strategies'}
  ];

  const handleUpgradeClick = () => {
    // Open Stripe payment link in new tab
    window.open('https://buy.stripe.com/test_00weVf5Mz8MRcye2ZcgjC00', '_blank');
  };

  return (
    <motion.div
      initial={{opacity: 0, x: 20}}
      animate={{opacity: 1, x: 0}}
      className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <SafeIcon icon={FiZap} className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold">Unlock Premium</h3>
          <p className="text-sm opacity-90">Get AI-powered insights</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {premiumFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{opacity: 0, x: -10}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: index * 0.1}}
            className="flex items-center space-x-2"
          >
            <SafeIcon icon={feature.icon} className="w-4 h-4 opacity-80" />
            <span className="text-sm">{feature.text}</span>
          </motion.div>
        ))}
      </div>

      <div className="text-center mb-4">
        <div className="text-2xl font-bold">€9.98</div>
        <div className="text-sm opacity-80">per month</div>
      </div>

      <button
        onClick={handleUpgradeClick}
        className="w-full bg-white text-primary-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
      >
        <span>Start Free Trial</span>
        <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
      </button>

      <p className="text-center text-xs opacity-80 mt-3">
        7-day free trial • Cancel anytime
      </p>
    </motion.div>
  );
};

export default PremiumUpsell;