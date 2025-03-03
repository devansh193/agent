"use client";
import { Button } from "@/components/ui/button";
import { useAuth, useClerk } from "@clerk/nextjs";
import Link from "next/link";

export const LandingButtons = () => {
  const clerk = useClerk();
  const { isSignedIn } = useAuth();

  const handleClick = (e: React.MouseEvent) => {
    if (!isSignedIn) {
      e.preventDefault();
      clerk.openSignIn();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-x-4 max-w-xl mx-auto mt-8">
      <Button
        className="w-full sm:w-auto min-w-[160px] bg-blue-700 hover:bg-blue-600 text-white font-medium transition-colors"
        onClick={handleClick}
      >
        <Link href="/dashboard" className="w-full">
          Get started
        </Link>
      </Button>

      <Button
        variant="outline"
        className="w-full sm:w-auto min-w-[160px] border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
        onClick={handleClick}
      >
        <Link href="#testimonials" className="w-full">
          View Testimonials
        </Link>
      </Button>
    </div>
  );
};
