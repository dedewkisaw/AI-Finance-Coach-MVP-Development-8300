import { supabase } from '../lib/supabase'

class SupabaseService {
  // User Profile Management
  async createUserProfile(userId, userData) {
    const { data, error } = await supabase
      .from('users_profile_8x9k2m')
      .insert({
        id: userId,
        email: userData.email,
        full_name: userData.full_name,
        onboarding_completed: false
      })
    
    if (error) throw error
    return data
  }

  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('users_profile_8x9k2m')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  async updateUserProfile(userId, updates) {
    const { data, error } = await supabase
      .from('users_profile_8x9k2m')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Connected Accounts
  async addConnectedAccount(userId, accountData) {
    const { data, error } = await supabase
      .from('connected_accounts_7h5j3n')
      .insert({
        user_id: userId,
        ...accountData
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async getConnectedAccounts(userId) {
    const { data, error } = await supabase
      .from('connected_accounts_7h5j3n')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
    
    if (error) throw error
    return data || []
  }

  // Transactions
  async addTransactions(transactions) {
    const { data, error } = await supabase
      .from('transactions_5m8p1q')
      .insert(transactions)
      .select()
    
    if (error) throw error
    return data
  }

  async getTransactions(userId, limit = 100, offset = 0) {
    const { data, error } = await supabase
      .from('transactions_5m8p1q')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .range(offset, offset + limit - 1)
    
    if (error) throw error
    return data || []
  }

  async getTransactionsByCategory(userId, startDate, endDate) {
    const { data, error } = await supabase
      .from('transactions_5m8p1q')
      .select('category, amount')
      .eq('user_id', userId)
      .gte('date', startDate)
      .lte('date', endDate)
    
    if (error) throw error
    
    // Aggregate by category
    const categoryTotals = data.reduce((acc, transaction) => {
      const category = transaction.category
      acc[category] = (acc[category] || 0) + Math.abs(transaction.amount)
      return acc
    }, {})
    
    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount
    }))
  }

  // Financial Goals
  async addFinancialGoal(userId, goalData) {
    const { data, error } = await supabase
      .from('financial_goals_9k3l7r')
      .insert({
        user_id: userId,
        ...goalData
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async getFinancialGoals(userId) {
    const { data, error } = await supabase
      .from('financial_goals_9k3l7r')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  async updateGoalProgress(goalId, currentAmount) {
    const { data, error } = await supabase
      .from('financial_goals_9k3l7r')
      .update({ current_amount: currentAmount })
      .eq('id', goalId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // AI Chat History
  async saveChatMessage(userId, question, answer, tokensUsed, wasPremiumFeature) {
    const { data, error } = await supabase
      .from('ai_chat_history_2n6m4k')
      .insert({
        user_id: userId,
        question,
        answer,
        tokens_used: tokensUsed,
        was_premium_feature: wasPremiumFeature
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async getChatHistory(userId, limit = 50) {
    const { data, error } = await supabase
      .from('ai_chat_history_2n6m4k')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  }

  // Financial Insights
  async addInsight(userId, insightData) {
    const { data, error } = await supabase
      .from('financial_insights_4l9n8j')
      .insert({
        user_id: userId,
        ...insightData
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async getActiveInsights(userId) {
    const { data, error } = await supabase
      .from('financial_insights_4l9n8j')
      .select('*')
      .eq('user_id', userId)
      .eq('is_dismissed', false)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  async dismissInsight(insightId) {
    const { data, error } = await supabase
      .from('financial_insights_4l9n8j')
      .update({ is_dismissed: true })
      .eq('id', insightId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Subscription Management
  async updateSubscriptionStatus(userId, status, subscriptionId = null) {
    const { data, error } = await supabase
      .from('users_profile_8x9k2m')
      .update({ 
        subscription_status: status,
        subscription_id: subscriptionId 
      })
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async addSubscriptionHistory(userId, subscriptionData) {
    const { data, error } = await supabase
      .from('subscription_history_6p2k9m')
      .insert({
        user_id: userId,
        ...subscriptionData
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Analytics & Reports
  async getSpendingTrends(userId, months = 6) {
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - months)
    
    const { data, error } = await supabase
      .from('transactions_5m8p1q')
      .select('date, amount, category')
      .eq('user_id', userId)
      .gte('date', startDate.toISOString().split('T')[0])
      .lt('amount', 0) // Only expenses
    
    if (error) throw error
    return data || []
  }

  async getFinancialHealthData(userId) {
    // Get recent transactions, goals, and account balances
    const [transactions, goals, accounts] = await Promise.all([
      this.getTransactions(userId, 100),
      this.getFinancialGoals(userId),
      this.getConnectedAccounts(userId)
    ])
    
    // Calculate health metrics
    const totalBalance = accounts.reduce((sum, account) => sum + (account.balance || 0), 0)
    const monthlyExpenses = transactions
      .filter(t => {
        const transactionDate = new Date(t.date)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return transactionDate >= thirtyDaysAgo && t.amount < 0
      })
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
    
    const monthlyIncome = transactions
      .filter(t => {
        const transactionDate = new Date(t.date)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return transactionDate >= thirtyDaysAgo && t.amount > 0
      })
      .reduce((sum, t) => sum + t.amount, 0)
    
    const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0
    
    // Calculate health score (0-100)
    let healthScore = 50 // Base score
    
    // Emergency fund factor (up to 25 points)
    const emergencyFundMonths = totalBalance / (monthlyExpenses || 1)
    if (emergencyFundMonths >= 6) healthScore += 25
    else if (emergencyFundMonths >= 3) healthScore += 15
    else if (emergencyFundMonths >= 1) healthScore += 10
    
    // Savings rate factor (up to 25 points)
    if (savingsRate >= 20) healthScore += 25
    else if (savingsRate >= 10) healthScore += 15
    else if (savingsRate >= 5) healthScore += 10
    else if (savingsRate > 0) healthScore += 5
    
    return {
      score: Math.min(100, Math.max(0, Math.round(healthScore))),
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      savingsRate: Math.round(savingsRate),
      emergencyFundMonths: Math.round(emergencyFundMonths * 10) / 10,
      goalsCount: goals.length,
      accountsCount: accounts.length
    }
  }
}

export default new SupabaseService()