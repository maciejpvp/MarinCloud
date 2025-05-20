import { Navbar } from "@/components/navbar";
import { ThemeSwitch } from "@/components/theme-switch";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <div className="absolute bottom-3 right-4">
        <ThemeSwitch />
      </div>
    </div>
  );
}
