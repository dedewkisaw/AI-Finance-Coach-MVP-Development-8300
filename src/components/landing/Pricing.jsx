import React from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const {FiCheck,FiStar,FiZap} = FiIcons;

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with basic insights',
    features: [
      'Connect 1 bank account',
      'Basic spending categorization',
      'Financial health score',
      'Debt-free calculator',
      'Monthly spending summary'
    ],
    limitations: [
      'Limited AI insights',
      'No cashflow predictions',
      'Basic support'
    ],
    cta: 'Start Free',
    popular: false,
    paymentLink: null
  },
  {
    name: 'Coach Upgrade',
    price: '€9.98',
    period: 'per month',
    description: 'Unlock the full power of AI-driven financial coaching',
    features: [
      'Everything in Free',
      'Unlimited bank accounts',
      'Advanced AI coaching',
      '90-day cashflow predictions',
      'Spending optimization alerts',
      'Custom savings goals',
      'Investment recommendations',
      'Priority support',
      'Debt payoff strategies',
      'Bill negotiation tips'
    ],
    cta: 'Start 7-Day Free Trial',
    popular: true,
    savings: 'Save 4.3 years on debt payoff',
    paymentLink: 'https://buy.stripe.com/test_00weVf5Mz8MRcye2ZcgjC00'
  }
];

const Pricing = ({onGetStarted}) => {
  const handleUpgrade = (plan) => {
    if (plan.paymentLink) {
      window.open(plan.paymentLink, '_blank');
    } else {
      onGetStarted();
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
          viewport={{once: true}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade when you're ready to accelerate your financial goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: index * 0.2}}
              viewport={{once: true}}
              className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-lg ${
                plan.popular
                  ? 'border-primary-500 shadow-lg'
                  : 'border-gray-200 hover:border-primary-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-500 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                    <SafeIcon icon={FiStar} className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
                {plan.savings && (
                  <div className="mt-4 bg-success-50 text-success-800 px-4 py-2 rounded-lg text-sm font-medium">
                    🚀 {plan.savings}
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <SafeIcon icon={FiCheck} className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                {plan.limitations && (
                  <div className="pt-4 border-t border-gray-200">
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-start space-x-3 opacity-60">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mx-auto mt-1.5"></div>
                        </div>
                        <span className="text-gray-600 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleUpgrade(plan)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.6}}
          viewport={{once: true}}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-2 bg-success-50 text-success-800 px-6 py-3 rounded-full">
            <SafeIcon icon={FiZap} className="w-5 h-5" />
            <span className="font-medium">30-day money-back guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;