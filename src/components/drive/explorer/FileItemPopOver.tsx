import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Divider } from "@heroui/divider";
import { Spinner } from "@heroui/spinner";

import {
  ArrowDownTrayIcon,
  UserPlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { Bars } from "@/components/icons";
import { useDownloadFile } from "@/hooks/useDownloadFile";

type FileItemPopOverProps = {
  uuid: string;
  filename: string;
};

export const FileItemPopOver = ({ uuid, filename }: FileItemPopOverProps) => {
  const { downloadFile, isLoading, error } = useDownloadFile(uuid, filename);

  return (
    <Popover showArrow backdrop="blur" placement="bottom">
      <PopoverTrigger>
        <button>
          <Bars />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 flex flex-col gap-1">
          <div className="text-medium font-bold px-1">Options</div>
          <Divider />
          <div className="text-medium">
            <ul className="flex flex-col gap-1">
              <li className="hover:bg-content2 p-1 transition-all duration-150 rounded-md">
                <button
                  className="flex flex-row gap-1 h-5"
                  disabled={isLoading || error}
                  onClick={downloadFile}
                >
                  {isLoading ? (
                    <Spinner color="default" size="sm" />
                  ) : (
                    <ArrowDownTrayIcon className="h-full" />
                  )}
                  <p>Download</p>
                </button>
              </li>
              <li className="hover:bg-content2 p-1 transition-all duration-150 rounded-md">
                <button className="flex flex-row gap-1 h-5">
                  <UserPlusIcon className="h-full" />
                  <p>Share File</p>
                </button>
              </li>
              <li className="hover:bg-danger p-1 transition-all duration-150 rounded-md">
                <button className="flex flex-row gap-1 h-5 ">
                  <TrashIcon className="h-full" />
                  <p>Delete</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
