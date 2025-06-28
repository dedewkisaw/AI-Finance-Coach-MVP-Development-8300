import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import toast from 'react-hot-toast'

const { FiX, FiHelpCircle, FiMessageCircle, FiMail, FiBook, FiExternalLink, FiSend, FiSearch } = FiIcons

const HelpModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('faq')
  const [searchTerm, setSearchTerm] = useState('')
  const [supportForm, setSupportForm] = useState({
    subject: '',
    message: '',
    category: 'general'
  })

  const faqItems = [
    {
      question: "How do I connect my bank account?",
      answer: "Go to Settings > Connected Banks and click 'Add Bank Account'. We use Plaid for secure, read-only access to your accounts."
    },
    {
      question: "Is my financial data secure?",
      answer: "Yes! We use bank-level 256-bit encryption and only have read-only access to your accounts. We never store your banking credentials."
    },
    {
      question: "How does the AI coaching work?",
      answer: "Our AI analyzes your spending patterns, income, and goals to provide personalized financial advice. Premium users get unlimited AI conversations."
    },
    {
      question: "Can I cancel my Premium subscription anytime?",
      answer: "Absolutely! You can cancel anytime from the Billing section. Your Premium features will remain active until the end of your billing period."
    },
    {
      question: "How accurate are the cashflow predictions?",
      answer: "Our AI predictions are typically 90-95% accurate based on your historical spending patterns and upcoming transactions."
    },
    {
      question: "What's the difference between Free and Premium?",
      answer: "Premium includes unlimited AI coaching, 90-day predictions, advanced debt strategies, and priority support. Free users get basic insights and limited AI interactions."
    }
  ]

  const filteredFaqs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSupportSubmit = (e) => {
    e.preventDefault()
    // Simulate sending support request
    setTimeout(() => {
      toast.success('Support ticket submitted! We\'ll get back to you within 24 hours.')
      setSupportForm({ subject: '', message: '', category: 'general' })
      setActiveTab('faq')
    }, 1000)
  }

  const openExternalLink = (url) => {
    window.open(url, '_blank')
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
            className="relative bg-white rounded-2xl p-6 w-full max-w-4xl mx-4 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Help & Support</h3>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'faq'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <SafeIcon icon={FiHelpCircle} className="w-4 h-4 inline mr-2" />
                FAQ
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'contact'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <SafeIcon icon={FiMessageCircle} className="w-4 h-4 inline mr-2" />
                Contact Support
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'resources'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <SafeIcon icon={FiBook} className="w-4 h-4 inline mr-2" />
                Resources
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'faq' && (
                <div className="space-y-6">
                  {/* Search */}
                  <div className="relative">
                    <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search frequently asked questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  {/* FAQ Items */}
                  <div className="space-y-4">
                    {filteredFaqs.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 rounded-lg p-4"
                      >
                        <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                      </motion.div>
                    ))}
                  </div>

                  {filteredFaqs.length === 0 && searchTerm && (
                    <div className="text-center py-8 text-gray-500">
                      <SafeIcon icon={FiSearch} className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No FAQ items found matching "{searchTerm}"</p>
                      <p className="text-sm">Try a different search term or contact support</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <h4 className="font-medium text-primary-900 mb-2">Need help?</h4>
                    <p className="text-primary-800 text-sm">
                      We're here to help! Send us a message and we'll get back to you within 24 hours.
                      Premium users receive priority support.
                    </p>
                  </div>

                  <form onSubmit={handleSupportSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={supportForm.category}
                        onChange={(e) => setSupportForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="general">General Question</option>
                        <option value="technical">Technical Issue</option>
                        <option value="billing">Billing & Subscription</option>
                        <option value="feature">Feature Request</option>
                        <option value="security">Security Concern</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={supportForm.subject}
                        onChange={(e) => setSupportForm(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Brief description of your question or issue"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        value={supportForm.message}
                        onChange={(e) => setSupportForm(prev => ({ ...prev, message: e.target.value }))}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        placeholder="Please provide as much detail as possible to help us assist you better..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <SafeIcon icon={FiSend} className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </form>

                  {/* Quick Contact Options */}
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Other ways to reach us</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => window.location.href = 'mailto:support@financeai.app'}
                        className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <SafeIcon icon={FiMail} className="w-4 h-4" />
                        <span>support@financeai.app</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-3">Getting Started Guide</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        Learn how to set up your account, connect banks, and get the most from FinanceAI.
                      </p>
                      <button
                        onClick={() => openExternalLink('https://docs.financeai.app/getting-started')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                      >
                        <span>Read Guide</span>
                        <SafeIcon icon={FiExternalLink} className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-3">Video Tutorials</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        Watch step-by-step videos on using AI coaching and understanding your financial health.
                      </p>
                      <button
                        onClick={() => openExternalLink('https://youtube.com/financeai')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                      >
                        <span>Watch Videos</span>
                        <SafeIcon icon={FiExternalLink} className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-3">API Documentation</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        For developers: Integrate FinanceAI data with your own applications.
                      </p>
                      <button
                        onClick={() => openExternalLink('https://api.financeai.app/docs')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                      >
                        <span>View Docs</span>
                        <SafeIcon icon={FiExternalLink} className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-3">Community Forum</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        Connect with other users, share tips, and get help from the community.
                      </p>
                      <button
                        onClick={() => openExternalLink('https://community.financeai.app')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                      >
                        <span>Join Forum</span>
                        <SafeIcon icon={FiExternalLink} className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Quick Tips */}
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Quick Tips</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        </div>
                        <p className="text-gray-600">
                          <strong>Pro tip:</strong> Ask your AI coach specific questions like "How can I save $500 per month?" for better results.
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        </div>
                        <p className="text-gray-600">
                          <strong>Security:</strong> We never store your banking passwords. All connections are read-only through Plaid.
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        </div>
                        <p className="text-gray-600">
                          <strong>Premium benefits:</strong> Upgrade for unlimited AI conversations and 90-day financial predictions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default HelpModal