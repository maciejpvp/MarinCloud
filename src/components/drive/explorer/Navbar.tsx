import { Textarea } from "@heroui/input";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  path: string;
};

export const Navbar = ({ path }: NavbarProps) => {
  const navigate = useNavigate();

  const undo = () => {
    navigate(-1);
  };

  const redo = () => {
    navigate(+1);
  };

  return (
    <div
      className="flex flex-row gap-2 items-center h-10"
      style={{ width: "calc(100dvw - 50px)" }}
    >
      <ArrowLeftIcon className="size-6" onClick={undo} />
      <ArrowRightIcon className="size-6" onClick={redo} />
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
