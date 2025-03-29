
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // In a real app, we would check the authentication state
    // For now, we'll use localStorage to simulate authentication
    const user = localStorage.getItem("user");
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page.",
        variant: "destructive",
      });
    }
    
    setIsAuthenticated(!!user);
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="animate-pulse-glow w-16 h-16 rounded-full bg-cancer-blue/10 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-cancer-blue/20 animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
