
-- User saved payment accounts (bKash, Nagad, etc.)
CREATE TABLE public.user_payment_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  method_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_holder TEXT,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.user_payment_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payment accounts"
  ON public.user_payment_accounts FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own payment accounts"
  ON public.user_payment_accounts FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own payment accounts"
  ON public.user_payment_accounts FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own payment accounts"
  ON public.user_payment_accounts FOR DELETE
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all payment accounts"
  ON public.user_payment_accounts FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));
