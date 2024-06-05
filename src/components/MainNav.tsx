"use client";

import Link from "next/link";
import { AlignRight, Plus, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

const AvatarMenu = () => {
  const { user } = useKindeBrowserClient();

  if (!user) return <></>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Avatar>
          <AvatarImage src={user?.picture ? user?.picture : ""} alt="@shadcn" />
          <AvatarFallback>
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {user?.given_name} {user?.family_name}
          <div className="font-normal text-xs ">{user?.email}</div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/profile/${user?.id}`}>Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          {" "}
          <LogoutLink>Logout</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MainNav = ({ children }: { children: React.ReactNode }) => {
  const { user } = useKindeBrowserClient();
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  return !isMenuToggled ? (
    <>
      <nav className="px-4 py-4 relative md:px-16">
        <div className="flex justify-between items-center">
          <span className="font-bold">
            <Link href={"/"}>Live Apps</Link>
          </span>
          <div className="md:hidden">
            <div
              className="p-2 rounded border "
              onClick={() => setIsMenuToggled((prev) => !prev)}
            >
              {!isMenuToggled ? <AlignRight /> : <X />}
            </div>
          </div>
          <div className="hidden md:flex gap-4 text-sm items-center">
            {user ? (
              <span>
                <Link href={"/dashboard"}>
                  <div>
                    <span>Dashboard</span>
                  </div>
                </Link>
              </span>
            ) : (
              <LoginLink>Sign in</LoginLink>
            )}
            <span>
              <Link href={"/add-project"}>
                <div>
                  <span>Add New Project</span>
                </div>
              </Link>
            </span>

            <AvatarMenu />
          </div>
        </div>
        <Separator className="mt-2" />
      </nav>
      {children}
    </>
  ) : (
    <div className="h-screen overflow-hidden">
      <nav className="px-4 py-4 relative md:px-16">
        <div className="px-4 py-4 absolute left-0 top-0 h-screen w-full bg-background overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="font-bold">
              <Link href={"/"}>Live Apps</Link>
            </span>
            <div
              className="p-2 rounded border "
              onClick={() => setIsMenuToggled((prev) => !prev)}
            >
              {!isMenuToggled ? <AlignRight /> : <X />}
            </div>
          </div>
          <Separator className="my-2" />
          <div className="mt-6 ">
            <div className="flex flex-col gap-3  ">
              {user ? (
                <span>
                  <Link href={"/dashboard"}>
                    <div>
                      <span>Dashboard</span>
                    </div>
                  </Link>
                </span>
              ) : (
                <LoginLink>Sign in</LoginLink>
              )}

              <span>
                <Link href={"/add-project"}>
                  <div>
                    <span>Add New Project</span>
                  </div>
                </Link>
              </span>

              <div className="mt-6">
                <Avatar>
                  <AvatarImage
                    src={user?.picture ? user?.picture : ""}
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <Button variant={"secondary"} className="mt-2">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default MainNav;
