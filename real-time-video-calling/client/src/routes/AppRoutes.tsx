import { Routes, Route } from "react-router-dom";
import Auth from "@/pages/auth/Auth";
import Dashboard from "@/pages/dashboard/Dashboard";
import IsLogin from "@/pages/auth/IsLogin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<IsLogin />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route path="/signup" element={<Auth type="signup" />} />
      <Route path="/login" element={<Auth type="login" />} />
    </Routes>
  );
};

export default AppRoutes;
