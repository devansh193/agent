"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    title: "Dashboard",
    href: "/dashboard",
    auth: true,
  },
  {
    title: "Review",
    href: "/review",
    auth: true,
  },
  {
    title: "Analytics",
    href: "/analytics",
    auth: true,
  },
  {
    title: "Chat",
    href: "/chat",
    auth: true,
  },
];

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const clerk = useClerk();
  const { isSignedIn } = useAuth();

  return (
    <div className="flex items-center justify-between gap-x-2 sm:gap-x-4">
      {routes.map((item, i) => (
        <Button
          key={i}
          className={cn(
            "px-2 sm:px-4 h-8 sm:h-10 text-xs sm:text-sm font-medium transition-all",
            pathname === item.href && "bg-muted"
          )}
          variant={"ghost"}
          onClick={(e) => {
            if (!isSignedIn && item.auth) {
              e.preventDefault();
              clerk.openSignIn();
            }
          }}
        >
          <Link href={item.href}>{item.title}</Link>
        </Button>
      ))}
    </div>
  );
};
