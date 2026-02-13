import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, Settings } from "lucide-react";

interface Setting {
  id: string;
  key: string;
  value: string | null;
  category: string;
  description: string | null;
}

const AdminSiteSettings = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [edits, setEdits] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .in("category", ["general", "promotions"])
      .order("key");
    setSettings(data || []);
    setLoading(false);
  };

  const handleChange = (key: string, value: string) => {
    setEdits((prev) => ({ ...prev, [key]: value }));
  };

  const getValue = (setting: Setting) => edits[setting.key] ?? setting.value ?? "";

  const handleSave = async () => {
    setSaving(true);
    for (const [key, value] of Object.entries(edits)) {
      await supabase.from("site_settings").update({ value }).eq("key", key);
    }
    toast.success("Settings saved!");
    setEdits({});
    setSaving(false);
    fetchSettings();
  };

  if (loading) return <div className="p-6 text-muted-foreground animate-pulse">Loading...</div>;

  const generalSettings = settings.filter((s) => s.category === "general");
  const promoSettings = settings.filter((s) => s.category === "promotions");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Site Settings</h1>
        {Object.keys(edits).length > 0 && (
          <Button onClick={handleSave} disabled={saving} className="neon-glow-green gap-2">
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save"}
          </Button>
        )}
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-display text-lg">General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {generalSettings.map((s) => (
            <div key={s.key} className="space-y-1">
              <label className="text-sm font-medium">{s.key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</label>
              {s.description && <p className="text-xs text-muted-foreground">{s.description}</p>}
              {s.key === "maintenance_mode" ? (
                <Switch
                  checked={getValue(s) === "true"}
                  onCheckedChange={(val) => handleChange(s.key, val ? "true" : "false")}
                />
              ) : (
                <Input value={getValue(s)} onChange={(e) => handleChange(s.key, e.target.value)} />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-display text-lg">Promotions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {promoSettings.map((s) => (
            <div key={s.key} className="space-y-1">
              <label className="text-sm font-medium">{s.key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</label>
              {s.description && <p className="text-xs text-muted-foreground">{s.description}</p>}
              <Input type="number" value={getValue(s)} onChange={(e) => handleChange(s.key, e.target.value)} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSiteSettings;
