import { ReactNode, useEffect } from "react";
import { useAuthStore } from "../auth/Zustand";
import { useNavigate } from "react-router-dom";

type AllowedRoles = string[];

type Props = {
  children: ReactNode;
  allowedRoles: AllowedRoles;
};

export default function PrivateAuth({ children, allowedRoles }: Props) {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const userRole = user?.role;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else if (userRole && !allowedRoles.includes(userRole)) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, userRole, allowedRoles, navigate]);

  return <>{children}</>;
}
