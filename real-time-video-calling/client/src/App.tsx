import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import apiClient from "./lib/api-client";
import { Spinner } from "./components/ui/spinner";

const App = () => {
  const { setUser, loading, setLoading, error, setError } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get("/auth/me");

        if (!response.data) {
          setUser(null);
          setLoading(false);
          return;
        }
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(error);
        setLoading(false);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return <AppRoutes />;
};

export default App;
