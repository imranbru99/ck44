
-- Table for admin-managed deposit methods
CREATE TABLE public.deposit_methods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  instructions TEXT,
  icon_label TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.deposit_methods ENABLE ROW LEVEL SECURITY;

-- Everyone can read active methods
CREATE POLICY "Anyone can view active deposit methods"
  ON public.deposit_methods FOR SELECT
  USING (is_active = true);

-- Admins can manage all
CREATE POLICY "Admins can manage deposit methods"
  ON public.deposit_methods FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_deposit_methods_updated_at
  BEFORE UPDATE ON public.deposit_methods
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
