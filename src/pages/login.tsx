import { GoogleLogoIcon } from "@/components/icons";
import AuthLayout from "@/layouts/auth";

export const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href =
      "https://file-system-maciejpvp-nyasdads7-new.auth.eu-central-1.amazoncognito.com/oauth2/authorize" +
      "?identity_provider=Google" +
      "&redirect_uri=http://localhost:3000/callback" +
      "&response_type=CODE" +
      "&client_id=4h26556loh5jtcg76s3s92bj5i" +
      "&scope=openid+profile+email";
  };

  return (
    <AuthLayout>
      <button
        className="flex flex-row justiify-center items-center bg-content1 p-3 rounded-md gap-2"
        onClick={handleGoogleLogin}
      >
        <GoogleLogoIcon />
        <p className="text-lg">Continue With Google</p>
      </button>
    </AuthLayout>
  );
};
