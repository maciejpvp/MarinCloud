import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

type LeftPanelButtonProps = {
  label: string;
  path: string;
  active: boolean;
};

export const LeftPanelButton = ({
  label,
  active,
  path,
}: LeftPanelButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (active) return;

    navigate(`/${path}`);
  };

  return (
    <li>
      <Button
        className={`w-full flex justify-start text-md font-medium transition-all duration-500 ${active ? "text-black" : "text-white"}`}
        color={active ? "primary" : "default"}
        radius="sm"
        onPress={handleClick}
      >
        {label}
      </Button>
    </li>
  );
};
