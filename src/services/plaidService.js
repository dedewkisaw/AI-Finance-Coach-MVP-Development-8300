// Plaid Integration Service
class PlaidService {
  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001'
  }

  // Create link token for Plaid Link
  async createLinkToken(userId) {
    try {
      const response = await fetch(`${this.apiUrl}/api/plaid/create-link-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ userId })
      })
      
      if (!response.ok) {
        throw new Error('Failed to create link token')
      }
      
      const data = await response.json()
      return data.link_token
    } catch (error) {
      console.error('Error creating link token:', error)
      throw error
    }
  }

  // Exchange public token for access token
  async exchangePublicToken(publicToken, userId) {
    try {
      const response = await fetch(`${this.apiUrl}/api/plaid/exchange-public-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          public_token: publicToken,
          userId 
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to exchange public token')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error exchanging public token:', error)
      throw error
    }
  }

  // Get accounts for a user
  async getAccounts(userId) {
    try {
      const response = await fetch(`${this.apiUrl}/api/plaid/accounts/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to get accounts')
      }
      
      const data = await response.json()
      return data.accounts
    } catch (error) {
      console.error('Error getting accounts:', error)
      throw error
    }
  }

  // Get transactions for a user
  async getTransactions(userId, startDate, endDate) {
    try {
      const response = await fetch(`${this.apiUrl}/api/plaid/transactions/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          start_date: startDate,
          end_date: endDate
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to get transactions')
      }
      
      const data = await response.json()
      return data.transactions
    } catch (error) {
      console.error('Error getting transactions:', error)
      throw error
    }
  }

  // Sync transactions (webhook handler)
  async syncTransactions(userId) {
    try {
      const response = await fetch(`${this.apiUrl}/api/plaid/sync-transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ userId })
      })
      
      if (!response.ok) {
        throw new Error('Failed to sync transactions')
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error syncing transactions:', error)
      throw error
    }
  }
}

export default new PlaidService()