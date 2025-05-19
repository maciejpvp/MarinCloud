import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import AuthLayout from "@/layouts/auth";

export const CallbackPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const getToken = async (code: string) => {
    const response = await fetch(
      "https://file-system-maciejpvp-nyasdads7-new.auth.eu-central-1.amazoncognito.com/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: "4h26556loh5jtcg76s3s92bj5i",
          code,
          redirect_uri: "http://localhost:3000/callback",
        }),
      },
    );

    const data = await response.json();
    // console.log(data);
  };

  useEffect(() => {
    if (!code) return;
    getToken(code);
  }, [code]);

  return (
    <AuthLayout>
      <p className="text-md">Loading...</p>
    </AuthLayout>
  );
};
