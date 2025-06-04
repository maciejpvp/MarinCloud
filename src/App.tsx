import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuthStore } from "./store/authStore";

import { LoadingPage } from "@/pages/Loading";
import { IndexPage } from "@/pages/drive";
import { LoginPage } from "@/pages/login";
import { CallbackPage } from "@/pages/callback";
import { FavouritesPage } from "@/pages/favourites";
import { SharedPade } from "@/pages/shared";
import { SettingsPage } from "@/pages/settings";

function App() {
  const login = useAuthStore((store) => store.login);
  const idToken = useAuthStore((store) => store.idToken);
  const hasToken = Boolean(idToken);

  useEffect(() => {
    login();

    const refreshId = setTimeout(
      () => {
        login();
      },
      59 * 60 * 1000,
    );

    return () => {
      clearTimeout(refreshId);
    };
  }, []);

  return (
    <Routes>
      <Route element={<CallbackPage />} path="/callback" />
      <Route
        element={hasToken ? <IndexPage /> : <LoadingPage />}
        path="/drive/*"
      />
      <Route
        element={hasToken ? <FavouritesPage /> : <LoadingPage />}
        path="/favourites/*"
      />
      <Route
        element={hasToken ? <SharedPade /> : <LoadingPage />}
        path="/shared/*"
      />
      <Route
        element={hasToken ? <SettingsPage /> : <LoadingPage />}
        path="/settings"
      />

      <Route element={<LoginPage />} path="/login" />
      <Route element={<Navigate to="/drive" />} path="*" />
    </Routes>
  );
}

export default App;
