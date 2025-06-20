import { FilesList } from "@/components/drive/explorer/FilesList";
import { useGetShared } from "@/hooks/useGetShared";
import DefaultLayout from "@/layouts/default";

export const SharedPade = () => {
  const { data: files, isLoading } = useGetShared();

  return (
    <DefaultLayout>
      <FilesList files={files ? files : []} isLoading={isLoading} />
    </DefaultLayout>
  );
};
