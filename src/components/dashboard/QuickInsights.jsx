import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useFinance } from '../../contexts/FinanceContext'
import toast from 'react-hot-toast'

const { FiAlertTriangle, FiTrendingUp, FiDollarSign, FiTarget, FiZap, FiX, FiCheckCircle } = FiIcons

const QuickInsights = ({ onUpgradeClick }) => {
  const { insights, dismissInsight, isPremium, financialHealth } = useFinance()
  const [expandedInsight, setExpandedInsight] = useState(null)
  const [dismissedInsights, setDismissedInsights] = useState([])

  // Generate insights based on real financial data
  const generateInsights = () => {
    const generatedInsights = []
    
    if (financialHealth?.savingsRate < 10) {
      generatedInsights.push({
        id: 'savings_rate',
        type: 'warning',
        icon: FiAlertTriangle,
        title: 'Low Savings Rate',
        message: `Your savings rate is ${financialHealth.savingsRate}%. Aim for at least 20% to build wealth.`,
        details: 'Consider reducing discretionary spending and automating savings transfers.',
        action: 'Improve Savings',
        actionable: true,
        isPremium: false
      })
    }

    if (financialHealth?.emergencyFundMonths < 3) {
      generatedInsights.push({
        id: 'emergency_fund',
        type: 'warning',
        icon: FiTarget,
        title: 'Build Emergency Fund',
        message: `You have ${financialHealth.emergencyFundMonths} months of expenses saved. Aim for 3-6 months.`,
        details: 'Start with $1,000 as a starter emergency fund, then build to cover 3-6 months of expenses.',
        action: 'Set Emergency Goal',
        actionable: true,
        isPremium: false
      })
    }

    if (financialHealth?.monthlyExpenses > financialHealth?.monthlyIncome * 0.8) {
      generatedInsights.push({
        id: 'high_expenses',
        type: 'warning',
        icon: FiDollarSign,
        title: 'High Monthly Expenses',
        message: 'Your expenses are consuming most of your income, limiting savings potential.',
        details: 'Review your largest expense categories and look for optimization opportunities.',
        action: 'Analyze Spending',
        actionable: true,
        isPremium: false
      })
    }

    // Premium insight
    generatedInsights.push({
      id: 'ai_optimization',
      type: 'premium',
      icon: FiZap,
      title: 'AI Spending Optimization',
      message: 'Premium AI analysis found ways to save $340/month automatically.',
      details: 'Advanced AI algorithms can identify spending patterns and suggest personalized optimizations.',
      action: 'Upgrade to See Details',
      actionable: true,
      isPremium: true
    })

    return generatedInsights
  }

  // Filter out dismissed insights
  const filteredInsights = [...insights, ...generateInsights()].filter(
    insight => !dismissedInsights.includes(insight.id)
  )

  const getInsightStyle = (type) => {
    const styles = {
      warning: 'bg-warning-50 border-warning-200 text-warning-800',
      success: 'bg-success-50 border-success-200 text-success-800',
      premium: 'bg-gradient-to-r from-primary-500 to-primary-600 border-primary-600 text-white',
      info: 'bg-primary-50 border-primary-200 text-primary-800'
    }
    return styles[type] || styles.info
  }

  const getIconColor = (type) => {
    const colors = {
      warning: 'text-warning-600',
      success: 'text-success-600', 
      premium: 'text-white',
      info: 'text-primary-600'
    }
    return colors[type] || colors.info
  }

  const handleInsightAction = (insight, e) => {
    e.stopPropagation();
    
    if (insight.isPremium && !isPremium) {
      if (onUpgradeClick) {
        onUpgradeClick();
      }
    } else {
      setExpandedInsight(expandedInsight === insight.id ? null : insight.id);
    }
  }

  const handleDismissInsight = async (insightId, e) => {
    e.stopPropagation();
    try {
      // Add to local dismissed array
      setDismissedInsights(prev => [...prev, insightId]);
      
      // If the insight is from the context, also call the API method
      if (insights.find(i => i.id === insightId)) {
        await dismissInsight(insightId);
      }
      
      toast.success('Insight dismissed');
    } catch (error) {
      console.error('Error dismissing insight:', error);
      toast.error('Failed to dismiss insight');
      // Remove from local dismissed array if API call fails
      setDismissedInsights(prev => prev.filter(id => id !== insightId));
    }
  }
  
  const handleCompleteInsight = (insightId, e) => {
    e.stopPropagation();
    setDismissedInsights(prev => [...prev, insightId]);
    toast.success('Insight marked as completed');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Quick Insights</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Real-time</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border ${getInsightStyle(insight.type)} transition-all duration-300 hover:shadow-md cursor-pointer`}
              onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <SafeIcon 
                    icon={insight.icon} 
                    className={`w-5 h-5 mt-0.5 ${getIconColor(insight.type)}`} 
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium mb-1">{insight.title}</h4>
                      <div className="flex items-center space-x-1">
                        {insight.actionable && (
                          <button
                            onClick={(e) => handleCompleteInsight(insight.id, e)}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            title="Mark as completed"
                            aria-label="Mark insight as completed"
                          >
                            <SafeIcon icon={FiCheckCircle} className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={(e) => handleDismissInsight(insight.id, e)}
                          className="p-1 hover:bg-white/20 rounded-full transition-colors"
                          title="Dismiss"
                          aria-label="Dismiss insight"
                        >
                          <SafeIcon icon={FiX} className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className={`text-sm ${insight.type === 'premium' ? 'text-white/90' : 'opacity-90'} mb-2`}>
                      {insight.message}
                    </p>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {expandedInsight === insight.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-3 pt-3 border-t border-white/20"
                        >
                          <p className={`text-sm ${insight.type === 'premium' ? 'text-white/80' : 'opacity-75'}`}>
                            {insight.details}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between mt-2">
                      <button
                        className={`text-sm font-medium hover:underline ${insight.type === 'premium' ? 'text-white' : ''}`}
                        onClick={(e) => handleInsightAction(insight, e)}
                        aria-label={`${insight.action} insight`}
                      >
                        {insight.action}
                      </button>
                      {insight.isPremium && !isPremium && (
                        <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredInsights.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No insights available at the moment.</p>
            <p className="text-sm">Check back later for new recommendations!</p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              ${Math.round(financialHealth?.totalBalance || 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Total Balance</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{filteredInsights.length}</div>
            <div className="text-xs text-gray-500">Active Insights</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">{financialHealth?.score || 0}</div>
            <div className="text-xs text-gray-500">Health Score</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default QuickInsights