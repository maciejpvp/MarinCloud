import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

type LeftPanelButtonProps = {
  label: string;
  path: string;
  active: boolean;
  Icon?: React.ElementType;
};

export const LeftPanelButton = ({
  label,
  active,
  path,
  Icon,
}: LeftPanelButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (active) return;

    navigate(`/${path}`);
  };

  return (
    <Button
      className={`w-full flex justify-start text-md font-medium  ${active ? "text-black" : "text-white"}`}
      color={active ? "primary" : "default"}
      radius="sm"
      onPress={handleClick}
    >
      {Icon && <Icon className="size-7" />}
      {label}
    </Button>
  );
};
