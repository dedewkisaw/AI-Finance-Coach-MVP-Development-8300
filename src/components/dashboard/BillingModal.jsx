import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useAuth } from '../../contexts/AuthContext'
import { useFinance } from '../../contexts/FinanceContext'

const { FiX, FiCreditCard, FiDownload, FiRefreshCw, FiCalendar, FiDollarSign, FiZap } = FiIcons

const BillingModal = ({ isOpen, onClose }) => {
  const { userProfile } = useAuth()
  const { isPremium } = useFinance()
  const [loading, setLoading] = useState(false)

  // Mock billing data
  const billingInfo = {
    plan: isPremium ? 'Premium' : 'Free',
    price: isPremium ? '€9.98/month' : 'Free',
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    paymentMethod: '•••• •••• •••• 4242',
    status: 'Active'
  }

  const invoices = [
    {
      id: 'inv_001',
      date: '2024-01-01',
      amount: '€9.98',
      status: 'Paid',
      description: 'Premium Plan - January 2024'
    },
    {
      id: 'inv_002',
      date: '2023-12-01',
      amount: '€9.98',
      status: 'Paid',
      description: 'Premium Plan - December 2023'
    },
    {
      id: 'inv_003',
      date: '2023-11-01',
      amount: '€9.98',
      status: 'Paid',
      description: 'Premium Plan - November 2023'
    }
  ]

  const handleUpgrade = () => {
    window.open('https://buy.stripe.com/test_00weVf5Mz8MRcye2ZcgjC00', '_blank')
  }

  const handleManageBilling = () => {
    setLoading(true)
    // Simulate loading
    setTimeout(() => {
      setLoading(false)
      alert('This would redirect to Stripe Customer Portal in a real app')
    }, 1000)
  }

  const downloadInvoice = (invoiceId) => {
    alert(`Downloading invoice ${invoiceId}...`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Billing & Subscription</h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
            </div>

            {/* Current Plan */}
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                    <SafeIcon icon={isPremium ? FiZap : FiDollarSign} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{billingInfo.plan} Plan</h4>
                    <p className="text-sm text-gray-600">{billingInfo.price}</p>
                  </div>
                </div>
                <span className="bg-success-100 text-success-800 px-3 py-1 rounded-full text-sm font-medium">
                  {billingInfo.status}
                </span>
              </div>

              {isPremium ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Next billing date</p>
                    <p className="font-medium text-gray-900">{billingInfo.nextBilling}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Payment method</p>
                    <p className="font-medium text-gray-900">{billingInfo.paymentMethod}</p>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600">
                  <p>Upgrade to Premium to unlock advanced AI features, unlimited coaching, and detailed predictions.</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              {!isPremium ? (
                <button
                  onClick={handleUpgrade}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiZap} className="w-4 h-4" />
                  <span>Upgrade to Premium</span>
                </button>
              ) : (
                <button
                  onClick={handleManageBilling}
                  disabled={loading}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <SafeIcon icon={FiCreditCard} className="w-4 h-4" />
                  )}
                  <span>Manage Billing</span>
                </button>
              )}
              
              <button
                onClick={() => setLoading(true)}
                disabled={loading}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiRefreshCw} className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            {/* Billing History */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Billing History</h4>
              
              {isPremium ? (
                <div className="space-y-3">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <SafeIcon icon={FiCalendar} className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{invoice.description}</p>
                          <p className="text-sm text-gray-600">{new Date(invoice.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900">{invoice.amount}</span>
                        <span className="bg-success-100 text-success-800 px-2 py-1 rounded-full text-xs font-medium">
                          {invoice.status}
                        </span>
                        <button
                          onClick={() => downloadInvoice(invoice.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Download invoice"
                        >
                          <SafeIcon icon={FiDownload} className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <SafeIcon icon={FiCreditCard} className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No billing history available</p>
                  <p className="text-sm">Upgrade to Premium to start your billing history</p>
                </div>
              )}
            </div>

            {/* Premium Features */}
            {!isPremium && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Premium Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiZap} className="w-4 h-4 text-primary-600" />
                    <span>Unlimited AI coaching</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiZap} className="w-4 h-4 text-primary-600" />
                    <span>90-day cashflow predictions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiZap} className="w-4 h-4 text-primary-600" />
                    <span>Advanced debt strategies</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiZap} className="w-4 h-4 text-primary-600" />
                    <span>Priority support</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default BillingModal