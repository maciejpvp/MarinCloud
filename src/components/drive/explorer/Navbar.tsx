import { Textarea } from "@heroui/input";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HomeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";

type NavbarProps = {
  path: string;
};

export const Navbar = ({ path }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [isRotateing, setIsRotating] = useState<boolean>(false);

  const pathStartsWith = location.pathname.split("/").at(1);

  const textareaValue =
    pathStartsWith === "drive"
      ? `MyDrive/${path}`
      : pathStartsWith === "shared"
        ? "SharedWithMe/"
        : "/";
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
    if (isRotateing) return;
    setIsRotating(true);
    queryClient.invalidateQueries();

    setTimeout(() => setIsRotating(false), 600);
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
      <motion.div
        animate={isRotateing ? { rotate: 360 } : { rotate: 0 }}
        className="w-6 h-6 cursor-pointer"
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={refresh}
      >
        <ArrowPathIcon className={iconsClassNames} />
      </motion.div>
      <div className=" w-full">
        <Textarea
          isReadOnly
          className="h-9"
          value={textareaValue}
          variant="bordered"
        />
      </div>
    </div>
  );
};
