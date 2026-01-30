import ActivityLogPage from "@/pages/ActivityLogPage";
import DashboardPage from "@/pages/DashboardPage";
import FoodLogPage from "@/pages/FoodLogPage";
import LayoutPage from "@/pages/LayoutPage";
import ProfilePage from "@/pages/ProfilePage";
import { Routes, Route } from "react-router-dom";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />} />
      <Route index element={<DashboardPage />} />
      <Route path="food" element={<FoodLogPage />} />
      <Route path="activity" element={<ActivityLogPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default AppRoute;
