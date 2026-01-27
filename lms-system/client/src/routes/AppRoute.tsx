import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CoursePage from "@/pages/CoursePage";
import SignupPage from "@/pages/SignupPage";
import LoginPage from "@/pages/LoginPage";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<CoursePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoute;
