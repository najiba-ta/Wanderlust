"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { Compass, Plane, PlusCircle, User, LogOut, Menu, X } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#081120]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link href="/">
          <Image
            src={"/assets/Wanderlast.png"}
            className="h-[34px] w-[140px] object-contain"
            width={140}
            height={34}
            alt="wanderlust"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-6 text-sm text-gray-300 md:flex">

          <li>
            <Link href="/destination" className="flex items-center gap-2 hover:text-cyan-400">
              <Compass size={16} />
              Destinations
            </Link>
          </li>

          <li>
            <Link href="/my-bookings" className="flex items-center gap-2 hover:text-cyan-400">
              <Plane size={16} />
              My Bookings
            </Link>
          </li>

          <li>
            <Link href="/add-destination" className="flex items-center gap-2 hover:text-cyan-400">
              <PlusCircle size={16} />
              Add Destination
            </Link>
          </li>

          <li>
            <Link href="/profile" className="flex items-center gap-2 hover:text-cyan-400">
              <User size={16} />
              Profile
            </Link>
          </li>

        </ul>

        {/* Right side (desktop) */}
        <div className="hidden items-center gap-4 md:flex">

          {user ? (
            <>
              <Avatar className="h-9 w-9 border border-cyan-400/20">
                <Avatar.Image src={user?.image} alt={user.name} />
                <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
              </Avatar>

              <Button
                onClick={handleSignOut}
                className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 text-rose-300 hover:bg-rose-500/20"
              >
                <LogOut size={16} />
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-cyan-400">
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 hover:bg-cyan-400/20"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#081120] px-5 py-4 space-y-4 text-sm text-gray-300">

          <Link href="/destination" className="block hover:text-cyan-400">Destinations</Link>
          <Link href="/my-bookings" className="block hover:text-cyan-400">My Bookings</Link>
          <Link href="/add-destination" className="block hover:text-cyan-400">Add Destination</Link>
          <Link href="/profile" className="block hover:text-cyan-400">Profile</Link>

          {user ? (
            <button
              onClick={handleSignOut}
              className="mt-2 flex items-center gap-2 text-rose-300"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <div className="flex gap-4 pt-2">
              <Link href="/login" className="hover:text-cyan-400">Login</Link>
              <Link href="/signup" className="hover:text-cyan-400">Sign Up</Link>
            </div>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;