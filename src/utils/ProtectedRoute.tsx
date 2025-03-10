import { FC, ReactNode, useEffect } from "react";
import { useAppSelector } from "../redux/hooks/hooks";
import { router } from "../router/routes";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isAuthenticated) {
      router.navigate("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null; // Render children if authenticated
};

export default ProtectedRoute;
