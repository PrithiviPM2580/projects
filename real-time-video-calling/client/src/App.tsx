import AppRoutes from "./routes/AppRoutes";
import { useEffect, useRef } from "react";
import { useAuth } from "./hooks/useAuth";
import apiClient from "./lib/api-client";
import { Spinner } from "./components/ui/spinner";
import { useLocation } from "react-router-dom";

const App = () => {
  const { user, setUser, loading, setLoading, error, setError } = useAuth();
  const location = useLocation();
  const hasFetched = useRef(false);

  useEffect(() => {
    // Don't fetch user on auth pages
    if (location.pathname === "/signup" || location.pathname === "/login") {
      setLoading(false);
      return;
    }

    // Don't fetch if user already exists (from login) or already fetched
    if (user || hasFetched.current) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      hasFetched.current = true;
      try {
        const response = await apiClient.get("/users/me");

        if (!response.data) {
          setUser(null);
          setLoading(false);
          return;
        }
        setUser(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError(err?.message || "Failed to fetch user");
        setLoading(false);
        setUser(null);
      }
    };
    fetchUser();
  }, [location.pathname, user]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return <AppRoutes />;
};

export default App;
