import React, {createContext, useContext, useState, useEffect} from 'react'
import {useAuth} from './AuthContext'

const FinanceContext = createContext()

export const useFinance = () => {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider')
  }
  return context
}

export const FinanceProvider = ({children}) => {
  const {user, userProfile} = useAuth()
  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])
  const [goals, setGoals] = useState([])
  const [insights, setInsights] = useState([])
  const [financialHealth, setFinancialHealth] = useState(null)
  const [loading, setLoading] = useState(false)

  const isPremium = userProfile?.subscription_status === 'premium'

  useEffect(() => {
    if (user) {
      loadFinancialData()
    }
  }, [user])

  const loadFinancialData = async () => {
    if (!user) return
    
    setLoading(true)
    try {
      // Mock financial data for demo
      const mockHealthData = {
        score: 85,
        totalBalance: 12500,
        monthlyIncome: 5200,
        monthlyExpenses: 3800,
        savingsRate: 27,
        emergencyFundMonths: 3.3,
        goalsCount: 3,
        accountsCount: 2
      }
      
      const mockTransactions = [
        {
          id: '1',
          amount: -45.67,
          description: 'Starbucks Coffee',
          category: 'dining',
          date: '2024-01-15'
        },
        {
          id: '2',
          amount: -120.00,
          description: 'Grocery Store',
          category: 'groceries',
          date: '2024-01-14'
        },
        {
          id: '3',
          amount: 5200.00,
          description: 'Salary Deposit',
          category: 'income',
          date: '2024-01-01'
        }
      ]
      
      const mockAccounts = [
        {
          id: '1',
          account_name: 'Checking Account',
          balance: 8500,
          institution_name: 'Demo Bank'
        },
        {
          id: '2',
          account_name: 'Savings Account',
          balance: 4000,
          institution_name: 'Demo Bank'
        }
      ]
      
      const mockGoals = [
        {
          id: '1',
          title: 'Emergency Fund',
          target_amount: 15000,
          current_amount: 4000,
          goal_type: 'emergency'
        },
        {
          id: '2',
          title: 'Vacation Fund',
          target_amount: 3000,
          current_amount: 800,
          goal_type: 'vacation'
        }
      ]

      setFinancialHealth(mockHealthData)
      setTransactions(mockTransactions)
      setAccounts(mockAccounts)
      setGoals(mockGoals)
      setInsights([])
    } catch (error) {
      console.error('Error loading financial data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Mock AI function
  const askAI = async (question) => {
    try {
      if (!isPremium && question.toLowerCase().includes('predict')) {
        return {
          message: "AI predictions are a premium feature. Upgrade to get 90-day cashflow forecasts with 94% accuracy!",
          isPremium: true
        }
      }

      // Mock AI response
      const responses = {
        'save': "💡 Based on your spending patterns, you could save $340/month by reducing dining out and optimizing subscriptions. Would you like specific recommendations?",
        'debt': "🎯 Your debt-to-income ratio looks good! Focus on paying off high-interest debt first. The avalanche method could save you $2,400 in interest.",
        'budget': "📊 I recommend the 50/30/20 budget: 50% needs, 30% wants, 20% savings. You're currently at 73/15/27 - great savings rate!",
        'default': "I'm here to help with your finances! Try asking about saving money, debt strategies, or budget optimization. What's your biggest financial concern?"
      }

      const lowerQuestion = question.toLowerCase()
      let response = responses.default

      if (lowerQuestion.includes('save') || lowerQuestion.includes('saving')) {
        response = responses.save
      } else if (lowerQuestion.includes('debt')) {
        response = responses.debt
      } else if (lowerQuestion.includes('budget')) {
        response = responses.budget
      }

      return {
        message: response,
        isPremium: false,
        tokens: 150
      }
    } catch (error) {
      console.error('Error asking AI:', error)
      throw error
    }
  }

  // Mock Plaid functions
  const connectBank = async () => {
    // Return mock link token
    return 'link-sandbox-mock-token'
  }

  const handlePlaidSuccess = async (publicToken, metadata) => {
    console.log('Mock Plaid success:', {publicToken, metadata})
    // Simulate successful bank connection
    await loadFinancialData()
    return {success: true}
  }

  // Mock other functions
  const addGoal = async (goalData) => {
    const newGoal = {
      id: Date.now().toString(),
      ...goalData,
      current_amount: 0
    }
    setGoals(prev => [newGoal, ...prev])
    return newGoal
  }

  const updateGoalProgress = async (goalId, currentAmount) => {
    setGoals(prev => 
      prev.map(goal => 
        goal.id === goalId ? {...goal, current_amount: currentAmount} : goal
      )
    )
  }

  const dismissInsight = async (insightId) => {
    setInsights(prev => prev.filter(insight => insight.id !== insightId))
  }

  const value = {
    // Data
    transactions,
    accounts,
    goals,
    insights,
    financialHealth,
    isPremium,
    loading,
    // Methods
    loadFinancialData,
    connectBank,
    handlePlaidSuccess,
    askAI,
    addGoal,
    updateGoalProgress,
    dismissInsight
  }

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  )
}