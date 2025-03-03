import Link from "next/link";
import { NavbarRoutes } from "./navbar-routes";
import { AuthButton } from "../../../../auth/ui/components/auth-button";
import { Logo } from "@/components/logot";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 flex items-center px-6 z-50 backdrop-blur-lg border">
      {/* Logo */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
        <div className="hidden md:flex items-center gap-4 w-fit">
          <Link href="/" className="flex items-center shrink-0">
            <Logo />
          </Link>
        </div>

        {/* Navigation Routes */}
        <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
          <NavbarRoutes />
        </div>

        {/* Auth Button */}
        <div className="flex flex-shrink-0 items-center gap-4">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
