-- Supabase Database Schema Script for CivixPay

-- 1. Profiles (Extends auth.users securely)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Wallets
CREATE TABLE public.wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    currency TEXT NOT NULL DEFAULT 'INR' CHECK (length(currency) = 3),
    balance BIGINT NOT NULL DEFAULT 0 CHECK (balance >= 0),
    reserved_balance BIGINT NOT NULL DEFAULT 0 CHECK (reserved_balance >= 0),
    version BIGINT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, currency)
);

-- 3. Payment Attempts (Intent tracking)
CREATE TABLE public.payment_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id),
    provider_order_id TEXT UNIQUE NOT NULL,
    provider TEXT NOT NULL CHECK (provider IN ('razorpay', 'stripe')),
    amount BIGINT NOT NULL CHECK (amount > 0),
    currency TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
    idempotency_key TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Transactions (Immutable Ledger)
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id UUID NOT NULL REFERENCES public.wallets(id),
    type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'payment', 'refund')),
    amount BIGINT NOT NULL,
    balance_after BIGINT NOT NULL CHECK (balance_after >= 0),
    payment_attempt_id UUID REFERENCES public.payment_attempts(id),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Webhook Events (Idempotency and Audit)
CREATE TABLE public.webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider TEXT NOT NULL,
    provider_event_id TEXT UNIQUE NOT NULL,
    event_type TEXT NOT NULL,
    payload JSONB NOT NULL,
    processed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_wallets_user_id ON public.wallets(user_id);
CREATE INDEX idx_transactions_wallet_id ON public.transactions(wallet_id, created_at DESC);
CREATE INDEX idx_payment_attempts_user_id ON public.payment_attempts(user_id);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- Security Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can view own wallet" ON public.wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (wallet_id IN (SELECT id FROM public.wallets WHERE user_id = auth.uid()));
CREATE POLICY "Users can view own payment attempts" ON public.payment_attempts FOR SELECT USING (auth.uid() = user_id);

-- Trigger to create profile and initial wallet on sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  
  INSERT INTO public.wallets (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Atomic Payment Success Function
CREATE OR REPLACE FUNCTION public.process_payment_success(
    p_payment_attempt_id UUID,
    p_provider_event_id TEXT,
    p_event_type TEXT,
    p_payload JSONB
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_attempt public.payment_attempts%ROWTYPE;
    v_wallet public.wallets%ROWTYPE;
    v_new_balance BIGINT;
BEGIN
    IF EXISTS (SELECT 1 FROM public.webhook_events WHERE provider_event_id = p_provider_event_id) THEN
        RETURN true;
    END IF;

    SELECT * INTO v_attempt 
    FROM public.payment_attempts 
    WHERE id = p_payment_attempt_id FOR UPDATE;

    IF NOT FOUND OR v_attempt.status IN ('success', 'refunded') THEN
        RAISE EXCEPTION 'Invalid or already processed payment attempt';
    END IF;

    SELECT * INTO v_wallet 
    FROM public.wallets 
    WHERE user_id = v_attempt.user_id AND currency = v_attempt.currency FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Wallet not found';
    END IF;

    v_new_balance := v_wallet.balance + v_attempt.amount;

    UPDATE public.wallets SET 
        balance = v_new_balance, 
        version = version + 1,
        updated_at = NOW() 
    WHERE id = v_wallet.id;

    UPDATE public.payment_attempts SET 
        status = 'success', 
        updated_at = NOW() 
    WHERE id = p_payment_attempt_id;

    INSERT INTO public.transactions (wallet_id, type, amount, balance_after, payment_attempt_id, description)
    VALUES (v_wallet.id, 'deposit', v_attempt.amount, v_new_balance, p_payment_attempt_id, 'Deposit via Gateway');

    INSERT INTO public.webhook_events (provider, provider_event_id, event_type, payload)
    VALUES (v_attempt.provider, p_provider_event_id, p_event_type, p_payload);

    RETURN true;
END;
$$;

-- ============================================================
-- 6. Blogs (CMS-style content table)
-- ============================================================
CREATE TABLE public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general',
    is_published BOOLEAN NOT NULL DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Only published blogs are publicly readable
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published blogs" ON public.blogs
    FOR SELECT USING (is_published = true);

-- Indexes
CREATE INDEX idx_blogs_published ON public.blogs(is_published, published_at DESC);

-- ============================================================
-- 7. Reviews (User-submitted reviews with FK to profiles)
-- ============================================================
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL CHECK (length(comment) >= 10 AND length(comment) <= 1000),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read reviews (public testimonials)
CREATE POLICY "Anyone can read reviews" ON public.reviews
    FOR SELECT USING (true);

-- Only authenticated users can insert their own review
CREATE POLICY "Authenticated users can submit reviews" ON public.reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own reviews
CREATE POLICY "Users can delete own reviews" ON public.reviews
    FOR DELETE USING (auth.uid() = user_id);

-- Index for fast retrieval
CREATE INDEX idx_reviews_created_at ON public.reviews(created_at DESC);

-- Prevent duplicate reviews from the same user
CREATE UNIQUE INDEX idx_reviews_unique_user ON public.reviews(user_id);
