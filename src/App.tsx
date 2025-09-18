import { useEffect, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuthStore } from "./store/authStore";

const LoadingPage = lazy(() =>
  import("@/pages/Loading").then((m) => ({ default: m.LoadingPage })),
);
const IndexPage = lazy(() =>
  import("@/pages/drive").then((m) => ({ default: m.IndexPage })),
);
const LoginPage = lazy(() =>
  import("@/pages/login").then((m) => ({ default: m.LoginPage })),
);
const CallbackPage = lazy(() =>
  import("@/pages/callback").then((m) => ({ default: m.CallbackPage })),
);
const FavouritesPage = lazy(() =>
  import("@/pages/favourites").then((m) => ({ default: m.FavouritesPage })),
);
const SharedPade = lazy(() =>
  import("@/pages/shared").then((m) => ({ default: m.SharedPade })),
);
const SettingsPage = lazy(() =>
  import("@/pages/settings").then((m) => ({ default: m.SettingsPage })),
);

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
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}

export default App;
