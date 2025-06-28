import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useFinance } from '../../contexts/FinanceContext'

const { FiTrendingUp, FiTrendingDown, FiActivity, FiInfo, FiRefreshCw } = FiIcons

const FinancialHealthCard = () => {
  const { financialHealth, loading, loadFinancialData } = useFinance()
  const [showDetails, setShowDetails] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const healthScore = financialHealth?.score || 0
  const savingsRate = financialHealth?.savingsRate || 0
  const emergencyFundMonths = financialHealth?.emergencyFundMonths || 0
  const totalBalance = financialHealth?.totalBalance || 0

  const getHealthColor = (score) => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    return 'danger'
  }

  const getHealthLabel = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Needs Work'
  }

  const healthFactors = [
    {
      name: 'Savings Rate',
      value: savingsRate,
      target: 20,
      status: savingsRate >= 20 ? 'excellent' : savingsRate >= 10 ? 'good' : 'warning',
      unit: '%'
    },
    {
      name: 'Emergency Fund',
      value: emergencyFundMonths,
      target: 6.0,
      status: emergencyFundMonths >= 6 ? 'excellent' : emergencyFundMonths >= 3 ? 'good' : 'warning',
      unit: ' months'
    },
    {
      name: 'Total Balance',
      value: totalBalance,
      target: 10000,
      status: totalBalance >= 10000 ? 'excellent' : totalBalance >= 5000 ? 'good' : 'warning',
      unit: '',
      isAmount: true
    }
  ]

  const getFactorColor = (status) => {
    const colors = {
      excellent: 'text-success-600',
      good: 'text-success-600',
      warning: 'text-warning-600',
      danger: 'text-danger-600'
    }
    return colors[status] || colors.good
  }

  const refreshHealth = async () => {
    setIsRefreshing(true)
    try {
      await loadFinancialData()
    } catch (error) {
      console.error('Error refreshing health data:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const color = getHealthColor(healthScore)
  const label = getHealthLabel(healthScore)

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-gray-900">Financial Health</h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <SafeIcon icon={FiInfo} className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={refreshHealth}
            disabled={isRefreshing}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <SafeIcon icon={FiRefreshCw} className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 bg-${color}-500 rounded-full`}></div>
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        </div>
      </div>

      {/* Health Score Circle */}
      <div className="flex items-center justify-center mb-6">
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
              stroke={color === 'success' ? '#22C55E' : color === 'warning' ? '#F59E0B' : '#EF4444'}
              strokeWidth="2"
              strokeDasharray={`${healthScore}, 100`}
              initial={{ strokeDasharray: "0, 100" }}
              animate={{ strokeDasharray: `${healthScore}, 100` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-3xl font-bold text-gray-900"
              >
                {healthScore}
              </motion.span>
              <div className="text-xs text-gray-500">Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-3 mb-6"
        >
          {healthFactors.map((factor, index) => (
            <div key={factor.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full bg-${
                  factor.status === 'excellent' ? 'success' : 
                  factor.status === 'good' ? 'success' : 
                  factor.status === 'warning' ? 'warning' : 'danger'
                }-500`}></div>
                <span className="text-sm font-medium text-gray-900">{factor.name}</span>
              </div>
              <div className="text-right">
                <div className={`text-sm font-semibold ${getFactorColor(factor.status)}`}>
                  {factor.isAmount 
                    ? `$${factor.value.toLocaleString()}`
                    : `${factor.value}${factor.unit}`
                  }
                </div>
                <div className="text-xs text-gray-500">
                  Target: {factor.isAmount 
                    ? `$${factor.target.toLocaleString()}`
                    : `${factor.target}${factor.unit}`
                  }
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{savingsRate}%</div>
          <div className="text-xs text-gray-500">Savings Rate</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{emergencyFundMonths}</div>
          <div className="text-xs text-gray-500">Emergency Months</div>
        </div>
      </div>
    </motion.div>
  )
}

export default FinancialHealthCard