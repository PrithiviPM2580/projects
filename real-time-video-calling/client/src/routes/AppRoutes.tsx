import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "@/pages/auth/Auth";
import Dashboard from "@/pages/dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="signup" element={<Auth type="signup" />} />
        <Route path="login" element={<Auth type="login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
