import { Button } from "@heroui/button";

import { LeftPanelButton } from "./LeftPanelButton";

export const LeftPanel = () => {
  const panelButtons = [
    { label: "My Drive", path: "drive" },
    { label: "Shared with me", path: "shared" },
    { label: "Favourites", path: "favourites" },
  ];

  const path = location.pathname.split("/").at(1);

  return (
    <div className="grid grid-rows-[0.25fr,1fr,auto]  h-full">
      <div className="flex flex-col items-start justify-start gap-1 ">
        <img alt="Logo" className="h-24 w-min " src="/logo.png" />
        <h1 className="font-semibold text-2xl px-1">Marin_Cloud</h1>
      </div>
      <ul className="flex flex-col gap-3">
        {panelButtons.map((button) => {
          const key = button.label.replace(/\s+/g, "").toLowerCase();

          return (
            <LeftPanelButton
              key={key}
              active={button.path === path}
              label={button.label}
              path={button.path}
            />
          );
        })}
      </ul>

      <Button color="default" radius="sm">
        Settings
      </Button>
    </div>
  );
};
