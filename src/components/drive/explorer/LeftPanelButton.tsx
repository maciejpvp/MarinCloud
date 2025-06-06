import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@heroui/tooltip";

type LeftPanelButtonProps = {
  label: string;
  path: string;
  active: boolean;
  Icon?: React.ElementType;
  available?: boolean;
};

export const LeftPanelButton = ({
  label,
  active,
  path,
  Icon,
  available = true,
}: LeftPanelButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (active) return;

    navigate(`/${path}`);
  };

  const button = (
    <Button
      className={`w-full flex justify-start text-md font-medium  ${active ? "text-black" : "text-white"}`}
      color={active ? "primary" : "default"}
      isDisabled={!available}
      radius="sm"
      onPress={handleClick}
    >
      {Icon && <Icon className="size-7" />}
      {label}
    </Button>
  );

  return available ? (
    button
  ) : (
    <div className="relative">
      <Tooltip content="Not available yet">
        <div className="w-full h-full  absolute" />
      </Tooltip>
      {button}
    </div>
  );
};
