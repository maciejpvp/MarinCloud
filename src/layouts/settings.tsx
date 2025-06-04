export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-[10%] py-10 flex flex-col h-screen ">
      {children}
    </div>
  );
}
