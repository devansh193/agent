"use client";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { MoveUpRightIcon } from "lucide-react";

export const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Action label="manageAccount" />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant={"outline"} className="px-4 py-2 text-sm gap-x-0">
            Sign in
            <MoveUpRightIcon className="size-4 mt-0.5 rotate-[-10deg]" />
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
