import { loadStripe } from '@stripe/stripe-js'

class StripeService {
  constructor() {
    this.stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
    this.apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001'
  }

  // Create checkout session for premium subscription
  async createCheckoutSession(userId, priceId, successUrl, cancelUrl) {
    try {
      const response = await fetch(`${this.apiUrl}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId,
          priceId,
          successUrl,
          cancelUrl
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId } = await response.json()
      
      const stripe = await this.stripePromise
      const { error } = await stripe.redirectToCheckout({ sessionId })
      
      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw error
    }
  }

  // Create customer portal session
  async createPortalSession(userId, returnUrl) {
    try {
      const response = await fetch(`${this.apiUrl}/api/stripe/create-portal-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          userId,
          returnUrl
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create portal session')
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error creating portal session:', error)
      throw error
    }
  }

  // Get subscription status
  async getSubscriptionStatus(userId) {
    try {
      const response = await fetch(`${this.apiUrl}/api/stripe/subscription-status/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to get subscription status')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error getting subscription status:', error)
      throw error
    }
  }

  // Cancel subscription
  async cancelSubscription(subscriptionId) {
    try {
      const response = await fetch(`${this.apiUrl}/api/stripe/cancel-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ subscriptionId })
      })

      if (!response.ok) {
        throw new Error('Failed to cancel subscription')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error canceling subscription:', error)
      throw error
    }
  }
}

export default new StripeService()