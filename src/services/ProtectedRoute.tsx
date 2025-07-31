import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  condition: boolean;
  redirectTo: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  condition,
  redirectTo,
  children,
}) => {
  if (!condition) return <Navigate to={redirectTo} replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
