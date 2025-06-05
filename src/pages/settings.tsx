import { useState, useEffect } from "react";
import { Divider } from "@heroui/divider";
import { Button, ButtonGroup } from "@heroui/button";
import { useTheme } from "@heroui/use-theme";

import DefaultLayout from "@/layouts/default";

export const SettingsPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div />;

  return (
    <DefaultLayout showNavbar={false}>
      <div className="h-full flex flex-col gap-1">
        <h1 className="text-2xl font-semibold pb-1">Settings</h1>
        <Divider />
        <div className="flex flex-col items-start mt-2">
          <p className="mb-1 pl-1 font-semibold">Change Theme</p>
          <ButtonGroup>
            <Button
              color={theme === "light" ? "primary" : "default"}
              variant={theme === "light" ? "solid" : "ghost"}
              onPress={() => setTheme("light")}
            >
              Light
            </Button>
            <Button
              color={theme === "dark" ? "primary" : "default"}
              variant={theme === "dark" ? "solid" : "ghost"}
              onPress={() => setTheme("dark")}
            >
              Dark
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </DefaultLayout>
  );
};
