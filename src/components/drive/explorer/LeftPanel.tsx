import {
  UserIcon,
  UserGroupIcon,
  HeartIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import { LeftPanelButton } from "./LeftPanelButton";

import { UsedStorage } from "@/components/usedStorage/UsedStorage";

export const LeftPanel = () => {
  const panelButtons = [
    { label: "My Drive", path: "drive", icon: UserIcon },
    {
      label: "Shared with me",
      path: "shared",
      icon: UserGroupIcon,
      available: false,
    },
    {
      label: "Favourites",
      path: "favourites",
      icon: HeartIcon,
      available: false,
    },
  ];

  const path = location.pathname.split("/").at(1);

  return (
    <div className="grid grid-rows-[0.25fr,0.25fr,0.75fr,auto] h-full px-1">
      <div className="flex flex-col items-start justify-start gap-1 ">
        <img alt="Logo" className="h-24 w-min " src="/logo.png" />
        <h1 className="font-semibold text-2xl px-1">Marin_Cloud</h1>
      </div>
      <ul className="flex flex-col gap-3 ">
        {panelButtons.map((button) => {
          const key = button.label.replace(/\s+/g, "").toLowerCase();

          return (
            <li key={key}>
              <LeftPanelButton
                Icon={button.icon}
                active={button.path === path}
                available={button.available}
                label={button.label}
                path={button.path}
              />
            </li>
          );
        })}
      </ul>

      <UsedStorage />

      <LeftPanelButton
        key="settings"
        Icon={Cog6ToothIcon}
        active={path === "settings"}
        label="Settings"
        path="settings"
      />
    </div>
  );
};
