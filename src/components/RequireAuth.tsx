import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/AuthModal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      setShowAuth(true);
    }
  }, [loading, user]);

  if (loading) return null;

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">
        <AuthModal
          open={showAuth}
          onOpenChange={(open) => {
            setShowAuth(open);
            if (!open) navigate("/");
          }}
          defaultMode="login"
        />
        <p>Please log in to access this page.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
