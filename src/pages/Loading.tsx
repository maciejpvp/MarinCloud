import AuthLayout from "@/layouts/auth";
import { Spinner } from "@heroui/spinner";

export const LoadingPage = () => {
  return (
    <AuthLayout>
      <Spinner color="white" />
    </AuthLayout>
  );
};
