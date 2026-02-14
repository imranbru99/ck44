import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save, Upload, Image, Trash2 } from "lucide-react";

const AdminPopup = () => {
  const [enabled, setEnabled] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["popup_enabled", "popup_image_url"]);

    if (data) {
      setEnabled(data.find((d) => d.key === "popup_enabled")?.value === "true");
      setImageUrl(data.find((d) => d.key === "popup_image_url")?.value || "");
    }
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileName = `popup-${Date.now()}.${file.name.split(".").pop()}`;

    const { error } = await supabase.storage
      .from("popup-images")
      .upload(fileName, file, { upsert: true });

    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("popup-images")
      .getPublicUrl(fileName);

    setImageUrl(urlData.publicUrl);
    setUploading(false);
    toast.success("Image uploaded!");
  };

  const handleSave = async () => {
    setSaving(true);
    await supabase.from("site_settings").update({ value: enabled ? "true" : "false" }).eq("key", "popup_enabled");
    await supabase.from("site_settings").update({ value: imageUrl }).eq("key", "popup_image_url");
    toast.success("Popup settings saved!");
    setSaving(false);
  };

  const handleRemoveImage = () => {
    setImageUrl("");
  };

  if (loading) return <div className="p-6 text-muted-foreground animate-pulse">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Popup Management</h1>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Image className="h-5 w-5" /> Promotional Popup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable Popup</p>
              <p className="text-sm text-muted-foreground">Show popup to new visitors</p>
            </div>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>

          <div className="space-y-3">
            <p className="font-medium">Popup Image</p>
            <div className="flex gap-3">
              <label className="cursor-pointer">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
                <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium">
                  <Upload className="h-4 w-4" />
                  {uploading ? "Uploading..." : "Upload Image"}
                </div>
              </label>
              {imageUrl && (
                <Button variant="destructive" size="sm" onClick={handleRemoveImage} className="gap-1">
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              )}
            </div>

            {imageUrl && (
              <div className="mt-4 border border-border rounded-lg overflow-hidden max-w-md">
                <img src={imageUrl} alt="Popup preview" className="w-full h-auto" />
              </div>
            )}

            {!imageUrl && (
              <div className="mt-4 border border-dashed border-border rounded-lg p-12 text-center text-muted-foreground">
                No image uploaded yet. Upload an image to show in the popup.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPopup;
