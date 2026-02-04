import AuthPage from "@/pages/AuthPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authClient } from "@/lib/auth-client";

const AppRoute = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
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
