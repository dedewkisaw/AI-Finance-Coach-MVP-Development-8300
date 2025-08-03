import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useFinance } from '../../contexts/FinanceContext'
import { useAuth } from '../../contexts/AuthContext'
import openaiService from '../../services/openaiService'
import toast from 'react-hot-toast'

const { FiMessageCircle, FiSend, FiBrain, FiUser, FiZap, FiRefreshCw, FiMinimize2, FiMaximize2, FiLoader } = FiIcons

const AIChat = ({ onUpgradeClick }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your AI finance coach. Ask me anything about your money! 💰",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const chatContainerRef = useRef(null)
  const { isPremium, financialHealth } = useFinance()
  const { user } = useAuth()

  const sampleQuestions = [
    "Where did I overspend last month?",
    "How can I save $500 per month?",
    "What's my biggest spending leak?",
    "Should I pay off debt or invest?",
    "How much should I have in emergency fund?",
    "Help me create a budget"
  ]

  const scrollToBottom = () => {
    if (messagesEndRef.current && chatContainerRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Prevent page scroll when typing in chat
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target === textareaRef.current) {
        e.stopPropagation()
        // Prevent spacebar from scrolling page
        if (e.code === 'Space') {
          e.stopPropagation()
        }
      }
    }

    const textarea = textareaRef.current
    if (textarea) {
      textarea.addEventListener('keydown', handleKeyDown)
      return () => textarea.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleSendMessage = async (message = inputValue) => {
    if (!message.trim() || !user) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Build context for AI
      const context = {
        healthScore: financialHealth?.score || 85,
        monthlyIncome: financialHealth?.monthlyIncome || 5200,
        totalDebt: 45000, // Mock data
        emergencyFund: financialHealth?.totalBalance || 3500,
        topCategories: 'Dining, Groceries, Gas, Entertainment',
        isPremium
      }

      const response = await openaiService.askAI(message, context)
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.message,
        isPremium: response.isPremium,
        timestamp: new Date(),
        tokens: response.tokens,
        isError: response.isError
      }

      setMessages(prev => [...prev, aiMessage])

      // Show premium upsell for premium features
      if (response.isPremium && !isPremium && onUpgradeClick) {
        setTimeout(() => {
          onUpgradeClick()
        }, 2000)
      }
    } catch (error) {
      console.error('AI Chat Error:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm having trouble connecting right now, but I'm here to help! Try asking about your spending patterns, savings goals, or debt management strategies. 🤖",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      toast.error('AI temporarily unavailable')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSampleQuestion = (question) => {
    handleSendMessage(question)
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: "Hi! I'm your AI finance coach. Ask me anything about your money! 💰",
        timestamp: new Date()
      }
    ])
    toast.success('Chat cleared')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      e.stopPropagation()
      handleSendMessage()
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    
    // Auto-resize textarea
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 80) + 'px'
    }
  }

  const handleInputFocus = () => {
    // Add class to prevent page scroll
    document.body.classList.add('chat-input-focused')
  }

  const handleInputBlur = () => {
    // Remove class to restore page scroll
    document.body.classList.remove('chat-input-focused')
  }

  return (
    <div 
      ref={chatContainerRef}
      className={`bg-white rounded-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'h-20' : 'h-96'
      } flex flex-col chat-container relative`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiBrain} className="w-4 h-4 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Finance Coach</h3>
            <p className="text-xs text-gray-500">
              {isLoading ? 'Thinking...' : 'Ask me anything about your finances'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearChat}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors text-xs"
            title="Clear chat"
            aria-label="Clear chat"
          >
            Clear
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title={isMinimized ? 'Expand' : 'Minimize'}
            aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
          >
            <SafeIcon icon={isMinimized ? FiMaximize2 : FiMinimize2} className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      {!isMinimized && (
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{ maxHeight: '240px' }}
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <SafeIcon icon={message.type === 'user' ? FiUser : FiBrain} className="w-3 h-3" />
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.isPremium && !isPremium && (
                      <div className="mt-2 flex items-center space-x-1 text-xs opacity-75">
                        <SafeIcon icon={FiZap} className="w-3 h-3" />
                        <span>Premium insight</span>
                      </div>
                    )}
                    <div className="text-xs opacity-50 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiBrain} className="w-3 h-3 text-gray-600" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiLoader} className="w-4 h-4 text-gray-400 animate-spin" />
                    <span className="text-sm text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Sample Questions */}
          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-500 text-center">Try asking:</p>
              <div className="grid grid-cols-1 gap-2">
                {sampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSampleQuestion(question)}
                    disabled={isLoading}
                    className="w-full text-left text-sm p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                    aria-label={`Ask: ${question}`}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input */}
      {!isMinimized && (
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex space-x-2">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Ask your AI coach..."
              rows={1}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none overflow-hidden chat-input"
              disabled={isLoading}
              style={{ minHeight: '40px', maxHeight: '80px', height: '40px' }}
              aria-label="Chat message input"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0 flex items-center justify-center"
              aria-label="Send message"
            >
              <SafeIcon icon={FiSend} className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      )}
    </div>
  )
}

export default AIChat