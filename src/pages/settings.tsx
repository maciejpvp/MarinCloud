import { Divider } from "@heroui/divider";

import DefaultLayout from "@/layouts/default";

export const SettingsPage = () => {
  return (
    <DefaultLayout showNavbar={false}>
      <div className="h-full">
        <h1 className="text-2xl font-semibold pb-1">Settings</h1>
        <Divider />
      </div>
    </DefaultLayout>
  );
};
