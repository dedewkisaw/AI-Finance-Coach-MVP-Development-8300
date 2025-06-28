import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import {useFinance} from '../contexts/FinanceContext';
import {useAuth} from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const {FiCheck, FiZap, FiTrendingUp, FiBrain, FiTarget, FiArrowLeft, FiCreditCard} = FiIcons;

const premiumFeatures = [
  {
    icon: FiBrain,
    title: 'Advanced AI Coaching',
    description: 'Unlimited AI conversations with deep financial analysis',
    color: 'primary'
  },
  {
    icon: FiTrendingUp,
    title: '90-Day Cashflow Predictions',
    description: 'See exactly where your finances are headed',
    color: 'success'
  },
  {
    icon: FiTarget,
    title: 'Debt Optimization Strategies',
    description: 'AI-powered debt payoff plans that save years',
    color: 'warning'
  },
  {
    icon: FiZap,
    title: 'Real-Time Spending Alerts',
    description: 'Instant notifications when you overspend',
    color: 'danger'
  }
];

const testimonials = [
  {
    quote: "Premium saved me $2,400 in the first month by optimizing my debt payments!",
    author: "Sarah M.",
    savings: "$2,400 saved"
  },
  {
    quote: "The AI predictions were spot-on. I avoided a financial crisis thanks to the alerts.",
    author: "Mike R.",
    savings: "Crisis avoided"
  },
  {
    quote: "Became debt-free 3.2 years earlier than planned with the optimization strategies.",
    author: "Emily K.",
    savings: "3.2 years saved"
  }
];

const PremiumUpgrade = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {checkPremiumStatus} = useFinance();
  const {user} = useAuth();

  const handleUpgrade = async () => {
    if (!user) {
      toast.error('Please sign in to upgrade');
      return;
    }

    setLoading(true);
    try {
      // Open Stripe payment link in new tab
      window.open('https://buy.stripe.com/test_00weVf5Mz8MRcye2ZcgjC00', '_blank');
      
      // Simulate upgrade process for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Redirecting to Stripe checkout...');
      
      // In a real app, you would handle the success callback from Stripe
      // await checkPremiumStatus();
    } catch (error) {
      console.error('Upgrade error:', error);
      toast.error('Unable to process upgrade. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <SafeIcon icon={FiZap} className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Unlock Your Financial Potential
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Join thousands of users who've accelerated their financial goals with Premium AI coaching.
          </p>
          <div className="bg-success-50 text-success-800 px-6 py-3 rounded-full inline-block font-medium">
            🚀 Average user saves $3,200/year with Premium
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: index * 0.1}}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                <SafeIcon icon={feature.icon} className={`w-6 h-6 text-${feature.color}-500`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Pricing Card */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.5}}
          className="bg-white rounded-3xl p-8 border-2 border-primary-500 shadow-xl max-w-md mx-auto mb-12"
        >
          <div className="text-center mb-6">
            <div className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
              Coach Upgrade
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Plan</h3>
            <div className="mb-2">
              <span className="text-4xl font-bold text-gray-900">€9.98</span>
              <span className="text-gray-600">/month</span>
            </div>
            <p className="text-gray-600">Unlock the full power of AI-driven financial coaching</p>
          </div>

          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-primary-500 text-white py-4 rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <SafeIcon icon={FiCreditCard} className="w-5 h-5" />
                <span>Start 7-Day Free Trial</span>
              </>
            )}
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
            Cancel anytime • No long-term commitment
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.6 + index * 0.1}}
              className="bg-white rounded-xl p-6 border border-gray-200"
            >
              <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{testimonial.author}</span>
                <span className="bg-success-50 text-success-800 px-3 py-1 rounded-full text-sm font-medium">
                  {testimonial.savings}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.9}}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-success-50 text-success-800 px-6 py-3 rounded-full">
            <SafeIcon icon={FiCheck} className="w-5 h-5" />
            <span className="font-medium">30-day money-back guarantee</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumUpgrade;