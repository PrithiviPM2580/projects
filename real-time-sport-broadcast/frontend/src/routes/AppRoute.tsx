import AuthPage from "@/pages/AuthPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppRoute = () => {
  const user = true;

  if (!user) {
    return <AuthPage />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>App Route</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
