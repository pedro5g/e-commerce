"use client";

import { useCallback, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { Avatar } from "../Avatar";
import Link from "next/link";
import { MenuItem } from "./MenuItem";
import { signOut } from "next-auth/react";
import { BackDrop } from "./BackDrop";
import { User } from "@/@types/user-type";

interface UserMenuProps {
  currentUser: User | null | undefined;
}

export const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div className="relative z-50">
        <div
          data-open={isOpen}
          onClick={toggleOpen}
          className="bg-transparent cursor-pointer flex flex-row items-center py-1 px-2 gap-2
        data-[open=false]:border-[1.5px] border-zinc-400 bg-zinc-800 rounded-full hover:shadow-md transition text-zinc-200
        ">
          <Avatar src={currentUser?.image} />
          <BiSolidDownArrow
            data-open={isOpen}
            size={12}
            className="data-[open=true]:rotate-180 ease-in-out transition-all duration-500 "
          />
        </div>
        <div>
          {isOpen && (
            <div
              className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden 
              right-0 top-12 text-sm flex flex-col cursor-pointer">
              {currentUser ? (
                <div>
                  <Link href={"/orders"}>
                    <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                  </Link>
                  <Link href={"/admin"}>
                    <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                  </Link>
                  <hr />
                  <MenuItem
                    onClick={() => {
                      toggleOpen(), signOut();
                    }}>
                    Logout
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <Link href={"/login"}>
                    <MenuItem onClick={toggleOpen}>Login</MenuItem>
                  </Link>
                  <Link href={"/register"}>
                    <MenuItem onClick={toggleOpen}>Register</MenuItem>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  );
};
