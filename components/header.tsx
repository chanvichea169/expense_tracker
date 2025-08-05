"use client";

import { useRouter } from "next/router";
import { WelcomeMsg } from "./welcome-msg";
import { UserButton, ClerkLoading, ClerkLoaded, useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { HeaderLogo } from "@/components/header-logo";
import { Navigation } from "@/components/navigation";
import { Filters } from "@/components/filters";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { isSignedIn } = useUser();

  const handleRestart = () => {
    // Perform any actions needed before reload, such as state reset

    // Reload the page
    window.location.reload();
  };
  return (
    <header className="bg-gradient-to-b from-blue-900 to-blue-500 px-4 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <Link href={"/sign-in"}>
                <Button className="w-full bg-blue-950 hover:bg-blue-90/70">
                  Back to Login
                </Button>
              </Link>
            )}
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-slate-400" />
          </ClerkLoading>
        </div>
        <WelcomeMsg />
        <Filters />
      </div>
    </header>
  );
};
