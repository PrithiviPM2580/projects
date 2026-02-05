import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const IsLogin = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default IsLogin;
