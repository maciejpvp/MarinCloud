import { useState, useEffect } from "react";
import { Divider } from "@heroui/divider";
import { Button, ButtonGroup } from "@heroui/button";
import { useTheme } from "@heroui/use-theme";

import DefaultLayout from "@/layouts/default";

export const SettingsPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const [debug, setDebug] = useState<boolean>(() => {
    const debugObj = localStorage.getItem("debug") || "false";

    return debugObj === "true";
  });

  const enabledDebug = () => {
    localStorage.setItem("debug", "true");
    setDebug(true);
  };

  const disableDebug = () => {
    localStorage.setItem("debug", "false");
    setDebug(false);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div />;

  return (
    <DefaultLayout showNavbar={false}>
      <div className="h-full flex flex-col gap-1">
        <h1 className="text-2xl font-semibold pb-1">Settings</h1>
        <Divider />
        <div className="flex flex-col items-start gap-3">
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
          <div className="flex flex-col items-start mt-2">
            <p className="mb-1 pl-1 font-semibold">Debug</p>
            <ButtonGroup>
              <Button
                color={!debug ? "primary" : "default"}
                variant={!debug ? "solid" : "ghost"}
                onPress={disableDebug}
              >
                Disabled
              </Button>
              <Button
                color={debug ? "primary" : "default"}
                variant={debug ? "solid" : "ghost"}
                onPress={enabledDebug}
              >
                Enabled
              </Button>
            </ButtonGroup>
            <p className="text-sm">Require page reload</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
