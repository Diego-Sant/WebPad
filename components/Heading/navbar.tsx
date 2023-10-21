"use client";

import { useScrollTop } from "@/hooks/useScrollTop";
import { useConvexAuth } from "convex/react";
import { cn } from "@/lib/utils";

import { SignInButton, UserButton, useUser } from "@clerk/clerk-react"

import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

import { useState } from "react"

import Logo from "./logo";
import Link from "next/link";

const Navbar = () => {
  const {isAuthenticated, isLoading} = useConvexAuth();
  const scrolled = useScrollTop();

  const { user } = useUser();
  const [ firstName ] = useState(user?.firstName ? user.firstName : "");

  return (
    <div className={cn("z-50 bg-background dark:bg-[#121212] fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}>
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && (
          <Spinner />
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documentos">
                {firstName}
              </Link>
            </Button>
            <div className="mr-4 sm:mr-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar
