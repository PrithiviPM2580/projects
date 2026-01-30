import ActivityLogPage from "@/pages/ActivityLogPage";
import DashboardPage from "@/pages/DashboardPage";
import FoodLogPage from "@/pages/FoodLogPage";
import LayoutPage from "@/pages/LayoutPage";
import ProfilePage from "@/pages/ProfilePage";
import { Routes, Route } from "react-router-dom";
import useAppContext from "@/hooks/useAppContext";
import LoginPage from "@/pages/LoginPage";
import { SpinnerCustom } from "@/components/ui/spinner";

const AppRoute = () => {
  const { user, isUserFetched, onboardingCompleted } = useAppContext();

  if (!user) {
    return isUserFetched ? <LoginPage /> : <SpinnerCustom />;
  }
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
