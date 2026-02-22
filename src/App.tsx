import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import PlayerLayout from "./components/PlayerLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import RequireAuth from "./components/RequireAuth";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminFinance from "./pages/admin/AdminFinance";
import ApiSettings from "./pages/admin/ApiSettings";
import AdminSiteSettings from "./pages/admin/AdminSiteSettings";
import AdminPlaceholder from "./pages/admin/AdminPlaceholder";
import AdminPopup from "./pages/admin/AdminPopup";
import SlotsPage from "./pages/games/SlotsPage";
import LiveCasinoPage from "./pages/games/LiveCasinoPage";
import CrashPage from "./pages/games/CrashPage";
import SportsPage from "./pages/games/SportsPage";
import MiniGamesPage from "./pages/games/MiniGamesPage";
import HotGamesPage from "./pages/HotGamesPage";
import Promotions from "./pages/Promotions";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import VipPage from "./pages/VipPage";
import SupportPage from "./pages/SupportPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Player routes with persistent sidebar */}
              <Route element={<PlayerLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/games/slots" element={<SlotsPage />} />
                <Route path="/games/live-casino" element={<LiveCasinoPage />} />
                <Route path="/games/crash" element={<CrashPage />} />
                <Route path="/games/sports" element={<SportsPage />} />
                <Route path="/games/mini" element={<MiniGamesPage />} />
                <Route path="/games/hot" element={<HotGamesPage />} />
                <Route path="/promotions" element={<Promotions />} />
                <Route path="/wallet" element={<RequireAuth><Wallet /></RequireAuth>} />
                <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
                <Route path="/vip" element={<RequireAuth><VipPage /></RequireAuth>} />
                <Route path="/support" element={<SupportPage />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="finance" element={<AdminFinance />} />
                <Route path="games" element={<AdminPlaceholder title="Game Management" />} />
                <Route path="promotions" element={<AdminPlaceholder title="Promotion Management" />} />
                <Route path="reports" element={<AdminPlaceholder title="Reports" />} />
                <Route path="api-settings" element={<ApiSettings />} />
                <Route path="popup" element={<AdminPopup />} />
                <Route path="settings" element={<AdminSiteSettings />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
