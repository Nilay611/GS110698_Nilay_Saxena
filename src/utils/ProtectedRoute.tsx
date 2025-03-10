import { useAppSelector } from "../redux/hooks/hooks";
import { router } from "../router/routes";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isAuthenticated) {
      router.navigate("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null; // Render children if authenticated
};

export default ProtectedRoute;
