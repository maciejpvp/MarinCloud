import { Navigate, Route, Routes } from "react-router-dom";

import { IndexPage } from "@/pages/drive";
import { LoginPage } from "@/pages/login";
import { CallbackPage } from "@/pages/callback";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/drive" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<CallbackPage />} path="/callback" />
      <Route element={<Navigate to="/drive" />} path="*" />
    </Routes>
  );
}

export default App;
