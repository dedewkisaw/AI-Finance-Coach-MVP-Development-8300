const OPENAI_API_KEY = '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';
const OPENAI_BASE_URL = 'https://openrouter.ai/api/v1';

class OpenAIService {
  constructor() {
    this.apiKey = OPENAI_API_KEY;
    this.baseURL = OPENAI_BASE_URL;
  }

  async askAI(question, context = {}) {
    try {
      console.log('Making AI request with question:', question);
      
      const systemPrompt = this.buildSystemPrompt(context);
      
      const requestBody = {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
        stream: false
      };

      console.log('Request body:', requestBody);

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'FinanceAI'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('API Response status:', response.status);
      console.log('API Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      if (!data.choices || !data.choices[0]) {
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response from OpenAI API');
      }

      const aiResponse = data.choices[0].message.content;
      
      return {
        message: aiResponse,
        isPremium: this.isPremiumFeature(question),
        tokens: data.usage?.total_tokens || 0
      };

    } catch (error) {
      console.error('OpenAI API Error Details:', error);
      
      // Return a more helpful error message and fallback
      return {
        message: this.getFallbackResponse(question),
        isPremium: this.isPremiumFeature(question),
        tokens: 0,
        isError: true
      };
    }
  }

  getFallbackResponse(question) {
    // Smart fallback responses based on question content
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('save') || lowerQuestion.includes('saving')) {
      return "💡 **Savings Tip**: Start by tracking your expenses for a week. Most people find they can save 15-20% by cutting unnecessary subscriptions and reducing dining out. Would you like specific strategies for your situation?";
    }
    
    if (lowerQuestion.includes('debt') || lowerQuestion.includes('pay off')) {
      return "🎯 **Debt Strategy**: Focus on high-interest debt first (avalanche method) or smallest balances (snowball method). Based on typical scenarios, you could save thousands in interest. Want me to analyze your specific debt situation?";
    }
    
    if (lowerQuestion.includes('budget') || lowerQuestion.includes('spending')) {
      return "📊 **Budgeting Insight**: Try the 50/30/20 rule - 50% needs, 30% wants, 20% savings. Most users find dining and subscriptions are their biggest optimization opportunities. What's your biggest spending category?";
    }
    
    if (lowerQuestion.includes('invest') || lowerQuestion.includes('investment')) {
      return "📈 **Investment Guidance**: Generally, pay off high-interest debt (>6%) before investing. For emergency funds, aim for 3-6 months of expenses. Start investing with low-cost index funds. What's your current financial priority?";
    }
    
    if (lowerQuestion.includes('emergency') || lowerQuestion.includes('fund')) {
      return "🛡️ **Emergency Fund**: Aim for 3-6 months of expenses. Start with $1,000 as a mini emergency fund, then build from there. Most people save this by cutting one major expense category. What's your target amount?";
    }
    
    if (lowerQuestion.includes('predict') || lowerQuestion.includes('forecast')) {
      return "🔮 **Financial Forecasting**: While I can't access live predictions right now, typical patterns show that consistent saving of 20% of income leads to strong financial health. Premium users get detailed 90-day forecasts. Want to upgrade for advanced predictions?";
    }
    
    // Generic helpful response
    return "I'm temporarily having connection issues, but I'm still here to help! 🤖 Based on financial best practices, I can suggest: 1) Track all expenses for a week, 2) Identify your top 3 spending categories, 3) Set one specific savings goal. What financial topic interests you most?";
  }

  buildSystemPrompt(context) {
    return `You are a helpful AI financial coach for FinanceAI, a personal finance management app. Your role is to provide personalized, actionable financial advice.

Context about the user:
- Current financial health score: ${context.healthScore || 85}
- Monthly income: ${context.monthlyIncome || '$5,200'}
- Total debt: ${context.totalDebt || '$45,000'}
- Emergency fund: ${context.emergencyFund || '$3,500'}
- Top spending categories: ${context.topCategories || 'Dining, Groceries, Gas, Entertainment'}
- Premium status: ${context.isPremium ? 'Yes' : 'No'}

Guidelines:
1. Be encouraging and supportive, not judgmental
2. Provide specific, actionable advice with numbers when possible
3. Use simple language that anyone can understand
4. Focus on practical steps the user can take immediately
5. When discussing premium features (90-day predictions, debt optimization, advanced analytics), mention they require an upgrade
6. Keep responses concise but helpful (under 200 words)
7. Use emojis sparingly for emphasis
8. Always end with a follow-up question to keep the conversation going

Remember: You're helping people improve their financial lives. Be positive, practical, and personal.`;
  }

  isPremiumFeature(question) {
    const premiumKeywords = [
      'predict', 'forecast', '90 day', 'cashflow prediction',
      'debt optimization', 'investment recommendation',
      'advanced analytics', 'detailed breakdown'
    ];
    
    return premiumKeywords.some(keyword => 
      question.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  async getChatSuggestions(userContext = {}) {
    const suggestions = [
      "Where did I overspend last month?",
      "How can I save $500 per month?",
      "What's my biggest spending leak?",
      "Should I pay off debt or invest?",
      "How much should I have in emergency fund?",
      "Help me create a budget",
      "How to improve my credit score?",
      "What subscriptions should I cancel?"
    ];

    // Personalize suggestions based on user context
    if (userContext.hasDebt) {
      suggestions.unshift("What's the fastest way to pay off my debt?");
    }
    
    if (userContext.lowEmergencyFund) {
      suggestions.unshift("How much should I save for emergencies?");
    }

    return suggestions.slice(0, 6); // Return top 6 suggestions
  }
}

export default new OpenAIService();