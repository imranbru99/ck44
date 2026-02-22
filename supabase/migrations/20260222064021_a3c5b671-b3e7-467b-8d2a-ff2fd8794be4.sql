
-- Allow users to update their own wallet balance (for game play)
CREATE POLICY "Users can update own wallet"
  ON public.wallets FOR UPDATE
  USING (user_id = auth.uid());
