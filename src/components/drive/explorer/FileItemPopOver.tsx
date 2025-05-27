import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";

import { Bars } from "@/components/icons";

export const FileItemPopOver = () => {
  return (
    <Popover showArrow backdrop="blur" placement="bottom">
      <PopoverTrigger>
        <button>
          <Bars />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Popover Content</div>
          <div className="text-tiny">This is the popover content</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
