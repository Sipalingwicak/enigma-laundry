import { Routes, Route, useNavigate } from "react-router";
import Loading from "./components/Loading";
import { Toaster } from "sonner";
import { lazy, Suspense } from "react";
import { setNavigator } from "./utils/authRedirect";
const Home = lazy(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("./pages/Home")), 2000)
    )
);
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);
  return (
    <>
      <Toaster position="top-center" closeButton />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path="/register" />
          <Route element={<Dashboard />} path="/dashboard" />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
