// Mock API service for demo purposes
const API_BASE_URL = 'https://demo-api.example.com/api';

// Mock API functions
const mockApiCall = (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data }), delay);
  });
};

export const financeAPI = {
  // Plaid Integration (Mock)
  connectBank: (publicToken) => mockApiCall({ success: true, message: 'Bank connected' }),
  getAccounts: () => mockApiCall([]),
  getTransactions: () => mockApiCall([]),
  
  // AI Features (Mock)
  askAI: (question) => mockApiCall({ 
    message: "This is a mock AI response. In production, this would connect to your AI service.",
    isPremium: false 
  }),
  getFinancialHealth: () => mockApiCall({ score: 85, trend: 'up', change: '+5' }),
  getCashflowPrediction: () => mockApiCall({ prediction: 'mock data' }),
  getSpendingInsights: () => mockApiCall({ insights: [] }),
  
  // Premium Features (Mock)
  getPremiumStatus: () => mockApiCall({ isPremium: false }),
  createSubscription: (priceId) => mockApiCall({ success: true }),
  
  // Affiliate Offers (Mock)
  getAffiliateOffers: () => mockApiCall([]),
  trackAffiliateClick: (offerId) => mockApiCall({ success: true }),
};

export default {
  get: (url) => mockApiCall({}),
  post: (url, data) => mockApiCall({}),
  put: (url, data) => mockApiCall({}),
  delete: (url) => mockApiCall({})
};