
-- Fix RLS policies: change from RESTRICTIVE to PERMISSIVE

-- profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- wallets
DROP POLICY IF EXISTS "Users can view own wallet" ON public.wallets;
DROP POLICY IF EXISTS "Admins can view all wallets" ON public.wallets;
DROP POLICY IF EXISTS "Admins can manage all wallets" ON public.wallets;

CREATE POLICY "Users can view own wallet" ON public.wallets FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all wallets" ON public.wallets FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- transactions
DROP POLICY IF EXISTS "Users can view own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can insert own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Admins can manage all transactions" ON public.transactions;

CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own transactions" ON public.transactions FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can manage all transactions" ON public.transactions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- user_roles
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Site settings table for API keys and config
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  description TEXT,
  is_secret BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Insert default settings
INSERT INTO public.site_settings (key, value, category, description, is_secret) VALUES
  ('game_api_provider', '', 'game_api', 'Game API provider name (e.g., SoftSwiss, BetConstruct)', false),
  ('game_api_base_url', '', 'game_api', 'Game API base URL', false),
  ('game_api_key', '', 'game_api', 'Game API authentication key', true),
  ('game_api_secret', '', 'game_api', 'Game API secret key', true),
  ('game_api_operator_id', '', 'game_api', 'Operator ID for game API', false),
  ('crypto_payment_provider', '', 'payment', 'Crypto payment provider (e.g., NOWPayments, CoinPayments)', false),
  ('crypto_payment_api_key', '', 'payment', 'Crypto payment API key', true),
  ('crypto_payment_webhook_secret', '', 'payment', 'Crypto webhook secret', true),
  ('bkash_merchant_id', '', 'payment', 'bKash merchant ID', false),
  ('bkash_api_key', '', 'payment', 'bKash API key', true),
  ('bkash_api_secret', '', 'payment', 'bKash API secret', true),
  ('nagad_merchant_id', '', 'payment', 'Nagad merchant ID', false),
  ('nagad_api_key', '', 'payment', 'Nagad API key', true),
  ('site_name', 'Casino', 'general', 'Site display name', false),
  ('maintenance_mode', 'false', 'general', 'Enable maintenance mode', false),
  ('welcome_bonus_percent', '100', 'promotions', 'Welcome bonus percentage', false),
  ('welcome_bonus_max', '10000', 'promotions', 'Welcome bonus maximum amount (BDT)', false),
  ('referral_commission_percent', '5', 'promotions', 'Referral commission percentage', false);
