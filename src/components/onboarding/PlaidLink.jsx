import React, { useState, useCallback } from 'react'
import { usePlaidLink } from 'react-plaid-link'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useFinance } from '../../contexts/FinanceContext'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

const { FiShield, FiLock, FiCheck, FiAlertCircle } = FiIcons

const PlaidLink = ({ onSuccess }) => {
  const [linkToken, setLinkToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const { connectBank, handlePlaidSuccess } = useFinance()
  const { user } = useAuth()

  // Initialize Plaid Link
  const onPlaidSuccess = useCallback(async (public_token, metadata) => {
    try {
      await handlePlaidSuccess(public_token, metadata)
      toast.success('Bank account connected successfully!')
      onSuccess()
    } catch (error) {
      console.error('Plaid success error:', error)
      toast.error('Failed to connect bank account')
    }
  }, [handlePlaidSuccess, onSuccess])

  const onPlaidExit = useCallback((err, metadata) => {
    if (err) {
      console.error('Plaid exit error:', err)
      toast.error('Failed to connect bank account')
    }
  }, [])

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: onPlaidSuccess,
    onExit: onPlaidExit,
  })

  const initializePlaid = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const token = await connectBank()
      setLinkToken(token)
      
      // Auto-open Plaid Link once token is ready
      setTimeout(() => {
        if (ready) {
          open()
        }
      }, 500)
    } catch (error) {
      console.error('Error initializing Plaid:', error)
      toast.error('Failed to initialize bank connection')
    } finally {
      setLoading(false)
    }
  }

  const securityFeatures = [
    'Read-only access to your accounts',
    '256-bit bank-level encryption', 
    'No access to login credentials',
    'Trusted by 5,000+ financial apps'
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Connect Your Bank Account
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Securely connect your bank account to get personalized insights and AI-powered financial coaching.
        </p>
      </div>

      {/* Security Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-success-50 border border-success-200 rounded-xl p-6 max-w-md mx-auto"
      >
        <div className="flex items-center space-x-3 mb-4">
          <SafeIcon icon={FiShield} className="w-6 h-6 text-success-600" />
          <h3 className="font-semibold text-success-900">Bank-Level Security</h3>
        </div>
        <ul className="space-y-2">
          {securityFeatures.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm text-success-800">
              <SafeIcon icon={FiCheck} className="w-4 h-4 text-success-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Connection Button */}
      <div className="text-center space-y-4">
        <button
          onClick={linkToken ? open : initializePlaid}
          disabled={loading || (linkToken && !ready)}
          className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center space-x-3"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiLock} className="w-5 h-5" />
              <span>Connect Bank Account</span>
            </>
          )}
        </button>
        
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          We use Plaid, the same technology trusted by Venmo, Robinhood, and other leading financial apps.
        </p>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Your data is safe</p>
            <p>We never store your banking credentials. Plaid uses read-only access to securely retrieve your transaction data.</p>
          </div>
        </div>
      </div>

      {/* Demo Skip Option */}
      <div className="text-center pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-3">
          For demo purposes, you can skip this step
        </p>
        <button
          onClick={onSuccess}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          Continue with Demo Data
        </button>
      </div>
    </div>
  )
}

export default PlaidLink