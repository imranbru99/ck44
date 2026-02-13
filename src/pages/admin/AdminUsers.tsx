import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Search, Ban, CheckCircle, Shield, Eye } from "lucide-react";

interface UserRow {
  id: string;
  user_id: string;
  display_name: string | null;
  phone: string | null;
  kyc_status: string;
  verification_level: number;
  created_at: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast.error("Failed to load users");
      return;
    }
    setUsers(data || []);
    setLoading(false);
  };

  const updateKycStatus = async (userId: string, status: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ kyc_status: status })
      .eq("user_id", userId);
    
    if (error) {
      toast.error("Failed to update KYC status");
      return;
    }
    toast.success("KYC status updated");
    fetchUsers();
  };

  const filteredUsers = users.filter(
    (u) =>
      (u.display_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.phone || "").includes(search)
  );

  const kycBadgeColor = (status: string) => {
    switch (status) {
      case "verified": return "default";
      case "pending": return "secondary";
      case "rejected": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">User Management</h1>
        <Badge variant="outline">{users.length} users</Badge>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-3">
        {loading ? (
          <p className="text-muted-foreground animate-pulse">Loading users...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-muted-foreground">No users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <Card key={user.id} className="border-border">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-bold">{(user.display_name || "?")[0].toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-medium">{user.display_name || "Unnamed"}</p>
                    <p className="text-xs text-muted-foreground">{user.phone || "No phone"}</p>
                    <p className="text-xs text-muted-foreground">Joined {new Date(user.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={kycBadgeColor(user.kyc_status)} className="capitalize">
                    {user.kyc_status}
                  </Badge>
                  <Select
                    value={user.kyc_status}
                    onValueChange={(val) => updateKycStatus(user.user_id, val)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unverified">Unverified</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
