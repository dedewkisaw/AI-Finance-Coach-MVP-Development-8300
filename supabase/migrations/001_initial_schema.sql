-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM public;

-- Create custom types
CREATE TYPE subscription_status AS ENUM ('free', 'premium', 'cancelled');
CREATE TYPE transaction_category AS ENUM (
  'dining', 'groceries', 'gas', 'shopping', 'bills', 
  'entertainment', 'healthcare', 'travel', 'income', 'other'
);

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users_profile_8x9k2m (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  subscription_status subscription_status DEFAULT 'free',
  subscription_id TEXT,
  stripe_customer_id TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Connected accounts (banks)
CREATE TABLE public.connected_accounts_7h5j3n (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users_profile_8x9k2m(id) ON DELETE CASCADE,
  account_id TEXT NOT NULL,
  institution_name TEXT NOT NULL,
  account_name TEXT NOT NULL,
  account_type TEXT NOT NULL,
  balance DECIMAL(12,2),
  plaid_access_token TEXT ENCRYPTED,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions
CREATE TABLE public.transactions_5m8p1q (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users_profile_8x9k2m(id) ON DELETE CASCADE,
  account_id UUID REFERENCES public.connected_accounts_7h5j3n(id) ON DELETE CASCADE,
  transaction_id TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  description TEXT NOT NULL,
  category transaction_category NOT NULL,
  subcategory TEXT,
  date DATE NOT NULL,
  pending BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financial goals
CREATE TABLE public.financial_goals_9k3l7r (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users_profile_8x9k2m(id) ON DELETE CASCADE,
  goal_type TEXT NOT NULL,
  title TEXT NOT NULL,
  target_amount DECIMAL(12,2) NOT NULL,
  current_amount DECIMAL(12,2) DEFAULT 0,
  target_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI chat history
CREATE TABLE public.ai_chat_history_2n6m4k (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users_profile_8x9k2m(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  was_premium_feature BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financial insights
CREATE TABLE public.financial_insights_4l9n8j (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users_profile_8x9k2m(id) ON DELETE CASCADE,
  insight_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  action_needed BOOLEAN DEFAULT false,
  is_dismissed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscription history
CREATE TABLE public.subscription_history_6p2k9m (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users_profile_8x9k2m(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT NOT NULL,
  status TEXT NOT NULL,
  plan_id TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.users_profile_8x9k2m ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connected_accounts_7h5j3n ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions_5m8p1q ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_goals_9k3l7r ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_history_2n6m4k ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_insights_4l9n8j ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_history_6p2k9m ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON public.users_profile_8x9k2m
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users_profile_8x9k2m
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users_profile_8x9k2m
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own accounts" ON public.connected_accounts_7h5j3n
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON public.transactions_5m8p1q
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own goals" ON public.financial_goals_9k3l7r
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own chat history" ON public.ai_chat_history_2n6m4k
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own insights" ON public.financial_insights_4l9n8j
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own subscription history" ON public.subscription_history_6p2k9m
  FOR ALL USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_transactions_user_date ON public.transactions_5m8p1q(user_id, date DESC);
CREATE INDEX idx_transactions_category ON public.transactions_5m8p1q(category);
CREATE INDEX idx_accounts_user ON public.connected_accounts_7h5j3n(user_id);
CREATE INDEX idx_goals_user ON public.financial_goals_9k3l7r(user_id);
CREATE INDEX idx_chat_user_date ON public.ai_chat_history_2n6m4k(user_id, created_at DESC);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_profile_updated_at BEFORE UPDATE ON public.users_profile_8x9k2m FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_connected_accounts_updated_at BEFORE UPDATE ON public.connected_accounts_7h5j3n FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_financial_goals_updated_at BEFORE UPDATE ON public.financial_goals_9k3l7r FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();