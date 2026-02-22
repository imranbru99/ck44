
-- Update handle_new_user to also store referred_by from user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _referrer_id UUID;
  _ref_code TEXT;
BEGIN
  _ref_code := NEW.raw_user_meta_data->>'referred_by_code';
  
  IF _ref_code IS NOT NULL AND _ref_code != '' THEN
    SELECT user_id INTO _referrer_id FROM public.profiles WHERE referral_code = upper(_ref_code);
  END IF;

  INSERT INTO public.profiles (user_id, display_name, referral_code, referred_by)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    upper(substr(md5(NEW.id::text), 1, 8)),
    _referrer_id
  );
  
  INSERT INTO public.wallets (user_id) VALUES (NEW.id);
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'player');
  
  RETURN NEW;
END;
$$;
