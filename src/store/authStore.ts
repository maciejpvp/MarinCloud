import { create } from "zustand";

interface AuthState {
  idToken: string;
  login: () => void;
  refresh: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  idToken: "",
  login: async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      if (window.location.pathname === "/drive") {
        window.location.pathname = "/login";
      }

      return;
    }

    const response = await fetch(
      "https://file-system-maciejpvp-nyasdads7-new.auth.eu-central-1.amazoncognito.com/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: "4h26556loh5jtcg76s3s92bj5i",
          refresh_token: refreshToken,
        }),
      },
    );

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    const idToken = data.id_token;

    set({ idToken });
  },
  refresh: () => {},
}));
