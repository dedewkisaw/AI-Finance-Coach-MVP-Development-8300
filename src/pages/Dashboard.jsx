import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import FinancialHealthCard from '../components/dashboard/FinancialHealthCard';
import CashflowChart from '../components/dashboard/CashflowChart';
import SpendingHeatmap from '../components/dashboard/SpendingHeatmap';
import DebtCountdown from '../components/dashboard/DebtCountdown';
import AIChat from '../components/dashboard/AIChat';
import QuickInsights from '../components/dashboard/QuickInsights';
import PremiumUpsell from '../components/dashboard/PremiumUpsell';
import DemoWalkthrough from '../components/demo/DemoWalkthrough';
import DemoIndicator from '../components/demo/DemoIndicator';
import {useFinance} from '../contexts/FinanceContext';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const {financialHealth, isPremium, loading} = useFinance();
  const [showDemoWalkthrough, setShowDemoWalkthrough] = useState(false);
  const navigate = useNavigate();

  // Show demo walkthrough for new users
  useEffect(() => {
    const hasSeenDemo = localStorage.getItem('hasSeenDemo');
    const isDemo = localStorage.getItem('userEmail')?.includes('demo@');
    
    if (!hasSeenDemo && isDemo) {
      setTimeout(() => {
        setShowDemoWalkthrough(true);
      }, 1000);
    }
  }, []);

  const handleUpgradeClick = () => {
    navigate('/premium');
  };

  const handleDemoComplete = () => {
    localStorage.setItem('hasSeenDemo', 'true');
    setShowDemoWalkthrough(false);
    toast.success('Demo completed! Sign up to get started with your real finances.');
  };

  const handleSignUpFromDemo = () => {
    setShowDemoWalkthrough(false);
    navigate('/login');
  };
  
  const handleStartDemo = () => {
    setShowDemoWalkthrough(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your financial dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Indicator */}
        <DemoIndicator onStartDemo={handleStartDemo} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Financial Health & Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div data-demo="health-card">
                <FinancialHealthCard />
              </div>
              <DebtCountdown />
            </div>

            {/* Cashflow Chart */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.2}}
            >
              <CashflowChart />
            </motion.div>

            {/* Spending Heatmap */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.3}}
            >
              <SpendingHeatmap />
            </motion.div>

            {/* Quick Insights */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: 0.4}}
              data-demo="insights"
            >
              <QuickInsights onUpgradeClick={handleUpgradeClick} />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* AI Chat */}
            <motion.div
              initial={{opacity: 0, x: 20}}
              animate={{opacity: 1, x: 0}}
              transition={{delay: 0.1}}
              data-demo="ai-chat"
            >
              <AIChat onUpgradeClick={handleUpgradeClick} />
            </motion.div>

            {!isPremium && (
              <motion.div
                initial={{opacity: 0, x: 20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: 0.5}}
                data-demo="premium-upsell"
              >
                <PremiumUpsell onUpgradeClick={handleUpgradeClick} />
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Demo Walkthrough */}
      <DemoWalkthrough
        isOpen={showDemoWalkthrough}
        onClose={handleDemoComplete}
        onSignUp={handleSignUpFromDemo}
      />
    </div>
  );
};

export default Dashboard;