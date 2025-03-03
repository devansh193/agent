import { Navbar } from "@/modules/landing/ui/components/landing-navbar/navbar";

interface HomeLayoutProps {
  children: React.ReactNode;
}
export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="w-full ">
      <Navbar />
      <div className="flex min-h-screen pt-[4rem]">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
