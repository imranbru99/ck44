import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, Wallet, Gamepad2, Gift, Settings, 
  BarChart3, Shield, ChevronLeft, ChevronRight, LogOut, Globe, Image, ArrowDownCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Finance", icon: Wallet, href: "/admin/finance" },
  { label: "Games", icon: Gamepad2, href: "/admin/games" },
  { label: "Promotions", icon: Gift, href: "/admin/promotions" },
  { label: "Reports", icon: BarChart3, href: "/admin/reports" },
  { label: "API Settings", icon: Globe, href: "/admin/api-settings" },
  { label: "Popup", icon: Image, href: "/admin/popup" },
  { label: "Deposit Methods", icon: ArrowDownCircle, href: "/admin/deposit-methods" },
  { label: "Site Settings", icon: Settings, href: "/admin/settings" },
];

const AdminLayout = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login");
      return;
    }

    const checkAdmin = async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      
      if (!data) {
        navigate("/");
        return;
      }
      setIsAdmin(true);
      setChecking(false);
    };
    checkAdmin();
  }, [user, loading, navigate]);

  if (loading || checking || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground animate-pulse font-display">Loading...</div>
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-64"} border-r border-border bg-card flex flex-col transition-all duration-200`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!collapsed && (
            <Link to="/" className="font-display text-lg font-bold text-primary neon-text-green">
              🎰 CK444 ADMIN
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
