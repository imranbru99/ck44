
-- Allow users to see profiles of people they referred
CREATE POLICY "Users can view referred profiles"
  ON public.profiles FOR SELECT
  USING (referred_by = auth.uid());
