
-- Create storage bucket for popup images
INSERT INTO storage.buckets (id, name, public) VALUES ('popup-images', 'popup-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public can view popup images"
ON storage.objects FOR SELECT
USING (bucket_id = 'popup-images');

-- Allow admins to upload popup images
CREATE POLICY "Admins can upload popup images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'popup-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to update popup images
CREATE POLICY "Admins can update popup images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'popup-images' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete popup images
CREATE POLICY "Admins can delete popup images"
ON storage.objects FOR DELETE
USING (bucket_id = 'popup-images' AND public.has_role(auth.uid(), 'admin'));
