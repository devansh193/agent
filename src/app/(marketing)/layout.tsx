import { Footer } from "@/modules/landing/ui/components/landing/footer";
import { Navbar } from "@/modules/landing/ui/components/landing-navbar/navbar";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
