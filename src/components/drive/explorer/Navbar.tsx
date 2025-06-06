import { Textarea } from "@heroui/input";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";

import { useGetFiles } from "@/hooks/useGetFiles";

type NavbarProps = {
  path: string;
};

export const Navbar = ({ path }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathAfterDrive =
    location.pathname.replace("/drive", "").replace(/^\/+/, "") || "";

  const { refetch: refreshFn } = useGetFiles(pathAfterDrive);

  const undo = () => {
    navigate(-1);
  };

  const redo = () => {
    navigate(+1);
  };

  const home = () => {
    navigate("/drive");
  };

  const refresh = () => {
    refreshFn();
  };

  const iconsClassNames =
    "size-6 cursor-pointer hover:scale-105 transition-all duration-100";

  return (
    <div
      className="flex flex-row gap-2 items-center h-10"
      style={{ width: "calc(100dvw - 50px)" }}
    >
      <ArrowLeftIcon className={iconsClassNames} onClick={undo} />
      <ArrowRightIcon className={iconsClassNames} onClick={redo} />
      <HomeIcon className={iconsClassNames} onClick={home} />
      <ArrowPathIcon className={iconsClassNames} onClick={refresh} />
      <div className=" w-full">
        <Textarea
          isReadOnly
          className="h-9"
          value={`MyDrive/${path}`}
          variant="bordered"
        />
      </div>
    </div>
  );
};
