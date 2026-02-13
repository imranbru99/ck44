import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Save, Eye, EyeOff, Globe, CreditCard, Gamepad2 } from "lucide-react";

interface Setting {
  id: string;
  key: string;
  value: string | null;
  category: string;
  description: string | null;
  is_secret: boolean;
}

const ApiSettings = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .in("category", ["game_api", "payment"])
      .order("category")
      .order("key");
    
    if (error) {
      toast.error("Failed to load settings");
      return;
    }
    setSettings(data || []);
    setLoading(false);
  };

  const handleChange = (key: string, value: string) => {
    setEdits((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const updates = Object.entries(edits);
    
    for (const [key, value] of updates) {
      const { error } = await supabase
        .from("site_settings")
        .update({ value })
        .eq("key", key);
      
      if (error) {
        toast.error(`Failed to save ${key}`);
        setSaving(false);
        return;
      }
    }
    
    toast.success("Settings saved successfully!");
    setEdits({});
    setSaving(false);
    fetchSettings();
  };

  const getValue = (setting: Setting) => {
    if (edits[setting.key] !== undefined) return edits[setting.key];
    return setting.value || "";
  };

  const toggleSecret = (key: string) => {
    setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const gameSettings = settings.filter((s) => s.category === "game_api");
  const paymentSettings = settings.filter((s) => s.category === "payment");

  const renderSettings = (items: Setting[]) => (
    <div className="space-y-4">
      {items.map((setting) => (
        <div key={setting.key} className="space-y-1.5">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">{setting.key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</label>
            {setting.is_secret && <Badge variant="outline" className="text-[10px]">Secret</Badge>}
          </div>
          {setting.description && (
            <p className="text-xs text-muted-foreground">{setting.description}</p>
          )}
          <div className="flex gap-2">
            <Input
              type={setting.is_secret && !showSecrets[setting.key] ? "password" : "text"}
              value={getValue(setting)}
              onChange={(e) => handleChange(setting.key, e.target.value)}
              placeholder={`Enter ${setting.key.replace(/_/g, " ")}`}
            />
            {setting.is_secret && (
              <Button variant="outline" size="icon" onClick={() => toggleSecret(setting.key)}>
                {showSecrets[setting.key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return <div className="p-6 text-muted-foreground animate-pulse">Loading settings...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">API Settings</h1>
        {Object.keys(edits).length > 0 && (
          <Button onClick={handleSave} disabled={saving} className="neon-glow-green gap-2">
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        )}
      </div>

      <Tabs defaultValue="game_api">
        <TabsList className="bg-muted">
          <TabsTrigger value="game_api" className="gap-2">
            <Gamepad2 className="h-4 w-4" />
            Game API
          </TabsTrigger>
          <TabsTrigger value="payment" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Payment Gateway
          </TabsTrigger>
        </TabsList>

        <TabsContent value="game_api">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-neon-green" />
                Game API Provider
              </CardTitle>
              <CardDescription>
                Configure your game aggregator API. Supports SoftSwiss, BetConstruct, and similar providers.
                You'll need to obtain API credentials from your game provider.
              </CardDescription>
            </CardHeader>
            <CardContent>{renderSettings(gameSettings)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-neon-gold" />
                Payment Gateways
              </CardTitle>
              <CardDescription>
                Configure crypto payments (NOWPayments, CoinPayments) and mobile payments (bKash, Nagad).
              </CardDescription>
            </CardHeader>
            <CardContent>{renderSettings(paymentSettings)}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiSettings;
