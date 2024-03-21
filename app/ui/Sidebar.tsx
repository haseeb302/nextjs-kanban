"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

import LogoDark from "@/public/assets/logo-dark.svg";
import BoardIcon from "@/public/assets/icon-board.svg";

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <aside className="flex h-full flex-col">
      <Link className="mb-2 flex h-22 p-8" href="/home">
        <div className="w-32 text-white md:w-40">
          <Image src={LogoDark} width={150} height={25} alt="logo" />
        </div>
      </Link>
      <div className="flex grow flex-row pr-4 justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="space-y-2">
          <p className="pl-8 pb-5 text-[#828FA3] uppercase text-xs tracking-widest">
            All boards (3)
          </p>
          <Link
            href={"/home/board-1"}
            className={clsx(
              "flex h-[48px] grow items-center text-[#828FA3] justify-center gap-2 rounded-r-full p-3 text-sm font-medium hover:opacity-30 hover:bg-[#635FC7] md:flex-none md:justify-start md:p-3 md:pl-8",
              {
                "bg-[#635FC7] text-white": pathname === "/home/board-1",
              }
            )}
          >
            <Image
              src={BoardIcon}
              width={16}
              height={16}
              alt="board-icon"
              className="text-white"
            />
            <p className="hidden md:block">Board Active</p>
          </Link>
          <Link
            href={"/home/board-2"}
            className={clsx(
              "flex h-[48px] grow items-center text-[#828FA3] justify-center gap-2 rounded-r-full p-3 text-sm font-medium hover:opacity-30 hover:bg-[#635FC7] hover:text-white md:flex-none md:justify-start md:p-3 md:pl-8",
              {
                "bg-[#635FC7] text-white": pathname === "/home/board-2",
              }
            )}
          >
            <Image src={BoardIcon} width={16} height={16} alt="board-icon" />
            <p className="hidden md:block">Board Inactive</p>
          </Link>
          <Button
            className="flex grow items-center justify-center gap-2 p-3 text-sm font-medium md:pl-8"
            variant="link"
          >
            <Image src={BoardIcon} width={16} height={16} alt="board-icon" />
            <p className="text-[#635FC7] hidden md:block">+ Create New Board</p>
          </Button>
        </div>
      </div>
    </aside>
  );
}
