import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2, Save, GripVertical } from "lucide-react";

interface DepositMethod {
  id: string;
  name: string;
  account_number: string;
  instructions: string | null;
  icon_label: string | null;
  is_active: boolean;
  sort_order: number;
}

const AdminDepositMethods = () => {
  const [methods, setMethods] = useState<DepositMethod[]>([]);
  const [loading, setLoading] = useState(true);

  // New method form
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", account_number: "", instructions: "", icon_label: "" });
  const [saving, setSaving] = useState(false);

  const fetchMethods = async () => {
    const { data } = await supabase
      .from("deposit_methods")
      .select("*")
      .order("sort_order", { ascending: true });
    setMethods((data as DepositMethod[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchMethods(); }, []);

  const handleAdd = async () => {
    if (!form.name.trim() || !form.account_number.trim()) {
      toast.error("Name and account number are required");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("deposit_methods").insert({
      name: form.name.trim(),
      account_number: form.account_number.trim(),
      instructions: form.instructions.trim() || null,
      icon_label: form.icon_label.trim() || null,
      sort_order: methods.length,
    });
    setSaving(false);
    if (error) { toast.error("Failed to add method"); return; }
    toast.success("Deposit method added");
    setForm({ name: "", account_number: "", instructions: "", icon_label: "" });
    setShowForm(false);
    fetchMethods();
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("deposit_methods").update({ is_active: !current }).eq("id", id);
    fetchMethods();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this deposit method?")) return;
    await supabase.from("deposit_methods").delete().eq("id", id);
    toast.success("Deleted");
    fetchMethods();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Deposit Methods</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" /> Add Method
        </Button>
      </div>

      {showForm && (
        <Card className="border-secondary/30">
          <CardHeader><CardTitle className="text-lg">New Deposit Method</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Method Name *</Label>
                <Input placeholder="e.g. bKash VIP" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Icon Label</Label>
                <Input placeholder="e.g. bKash" value={form.icon_label} onChange={e => setForm(f => ({ ...f, icon_label: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Account Number *</Label>
              <Input placeholder="e.g. 01XXXXXXXXX" value={form.account_number} onChange={e => setForm(f => ({ ...f, account_number: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Instructions</Label>
              <Textarea placeholder="Instructions for users..." rows={3} value={form.instructions} onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} disabled={saving} className="gap-2">
                <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Method"}
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {loading ? (
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        ) : methods.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-8 text-center text-muted-foreground">
              No deposit methods configured yet. Click "Add Method" to create one.
            </CardContent>
          </Card>
        ) : (
          methods.map((m) => (
            <Card key={m.id} className="border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-bold">{m.name} {m.icon_label && <span className="text-xs text-muted-foreground ml-1">({m.icon_label})</span>}</p>
                    <p className="text-sm text-muted-foreground font-mono">{m.account_number}</p>
                    {m.instructions && <p className="text-xs text-muted-foreground mt-1 max-w-md truncate">{m.instructions}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Active</Label>
                    <Switch checked={m.is_active} onCheckedChange={() => toggleActive(m.id, m.is_active)} />
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(m.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDepositMethods;
