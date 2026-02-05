import { Routes, Route } from "react-router-dom";
import Auth from "@/pages/auth/Auth";
import Dashboard from "@/pages/dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<Auth type="signup" />} />
      <Route path="/login" element={<Auth type="login" />} />
    </Routes>
  );
};

export default AppRoutes;
