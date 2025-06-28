import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import {QuestLogin} from '@questlabs/react-sdk';
import {useAuth} from '../contexts/AuthContext';
import questConfig from '../config/questConfig';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import toast from 'react-hot-toast';

const {FiDollarSign, FiTrendingUp, FiShield, FiBrain, FiPlay, FiUser} = FiIcons;

const LoginPage = () => {
  const navigate = useNavigate();
  const {signIn, setIsAuthenticated} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = ({userId, token, newUser}) => {
    try {
      console.log('Quest Login Success:', {userId, token, newUser});
      
      // Store authentication data
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', `user-${userId}@example.com`);
      
      // Update auth context
      setIsAuthenticated(true);
      
      // Navigate based on user status
      if (newUser) {
        toast.success('Welcome! Let\'s get you set up.');
        navigate('/quest-onboarding');
      } else {
        toast.success('Welcome back!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login handling error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate demo login
      const demoUser = {
        id: 'demo-user-' + Date.now(),
        email: 'demo@financeai.app'
      };
      
      await signIn(demoUser.email, 'demo-password');
      
      toast.success('Welcome to the demo!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Demo login error:', error);
      toast.error('Demo login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
          >
            <div className="flex items-center space-x-3 mb-8">
              <SafeIcon icon={FiDollarSign} className="w-10 h-10" />
              <span className="text-2xl font-bold">FinanceAI</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-6">
              Welcome Back to Your
              <span className="block">Financial Journey</span>
            </h1>
            
            <p className="text-xl text-primary-100 mb-12 max-w-md">
              Continue building your financial future with AI-powered insights and personalized coaching.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-6">
              <motion.div
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: 0.3}}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiBrain} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">AI-Powered Coaching</h3>
                  <p className="text-primary-100 text-sm">Get personalized financial advice</p>
                </div>
              </motion.div>

              <motion.div
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: 0.4}}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiTrendingUp} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Smart Predictions</h3>
                  <p className="text-primary-100 text-sm">90-day cashflow forecasts</p>
                </div>
              </motion.div>

              <motion.div
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: 0.5}}
                className="flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiShield} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Bank-Level Security</h3>
                  <p className="text-primary-100 text-sm">Your data is always protected</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
            className="text-center mb-8 lg:hidden"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold text-gray-900">FinanceAI</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue your financial journey</p>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.2}}
            className="hidden lg:block text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">Access your personalized financial dashboard</p>
          </motion.div>

          {/* Demo Mode Button */}
          <motion.div
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.6, delay: 0.1}}
            className="mb-6"
          >
            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-success-500 to-success-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-success-600 hover:to-success-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <SafeIcon icon={FiPlay} className="w-5 h-5" />
                  <span>Try Live Demo</span>
                </>
              )}
            </button>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or sign in with email</span>
            </div>
          </div>

          {/* Quest Login Component */}
          <motion.div
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.6, delay: 0.3}}
            className="mt-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
          >
            <QuestLogin
              onSubmit={handleLogin}
              email={true}
              google={false}
              accent={questConfig.PRIMARY_COLOR}
              loader={true}
            />
          </motion.div>

          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.5}}
            className="text-center mt-6"
          >
            <p className="text-sm text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;