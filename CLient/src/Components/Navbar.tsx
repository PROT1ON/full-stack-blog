
import { Image } from "@imagekit/react";
import {
  Show,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/react";

import {
  Link,
  NavLink,
} from "react-router-dom";

import { useState } from "react";
import {
  Menu,
  X,
  BookOpen,
  Bookmark,
} from "lucide-react";

import SearchComponent from "./SearchComponent";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useAuth();

  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
  ];

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-full transition-all duration-200 ${
      isActive
        ? "bg-[#EEE6FF] text-purple-700"
        : "hover:bg-gray-100 text-gray-700"
    }`;

  return (
    <nav className="w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-8 relative border-b border-gray-100">

      {/* LOGO */}
      <Link
        to="/"
        onClick={closeMenu}
        className="flex items-center gap-2 shrink-0"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={30}
          height={30}
        />

        <span className="text-xl font-bold">
          Blogify
        </span>
      </Link>

      {/* DESKTOP NAVIGATION */}
      <div className="hidden md:flex items-center gap-3">

        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={linkStyle}
          >
            {link.name}
          </NavLink>
        ))}

      </div>

      {/* DESKTOP AUTHENTICATED LINKS */}
      {isLoaded && isSignedIn && (
        <div className="hidden lg:flex items-center gap-2">

          <Link
            to="/my-blogs"
            className="flex items-center gap-2 px-3 py-2 rounded-full border hover:bg-gray-100"
          >
            <BookOpen size={18} />
            My Blogs
          </Link>

          <Link
            to="/saved-posts"
            className="flex items-center gap-2 px-3 py-2 rounded-full border hover:bg-gray-100"
          >
            <Bookmark size={18} />
            Saved Posts
          </Link>

        </div>
      )}

      {/* SEARCH AND AUTH */}
      <div className="hidden md:flex items-center gap-4">

        <SearchComponent page="Home" />

        <Show when="signed-out">
          <div className="flex items-center gap-2">
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-full border hover:bg-gray-100">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </Show>

        <Show when="signed-in">
          <UserButton />
        </Show>

      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        type="button"
        className="md:hidden p-2"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50 transition-all duration-300 ${
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-3 pointer-events-none"
        }`}
      >

        <div className="flex flex-col gap-4 p-5">

          {/* NAV LINKS */}
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={closeMenu}
              className={linkStyle}
            >
              {link.name}
            </NavLink>
          ))}

          {/* AUTHENTICATED LINKS */}
          {isLoaded && isSignedIn && (
            <>
              <Link
                to="/my-blogs"
                onClick={closeMenu}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100"
              >
                <BookOpen size={18} />
                My Blogs
              </Link>

              <Link
                to="/saved-posts"
                onClick={closeMenu}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100"
              >
                <Bookmark size={18} />
                Write  Blog
              </Link>
            </>
          )}

          {/* SEARCH */}
          <SearchComponent page="Home" />

          {/* MOBILE AUTH */}
          <div className="flex items-center gap-3 pt-3 border-t">

            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-full border">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="px-4 py-2 rounded-full bg-purple-600 text-white">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <UserButton />
            </Show>

          </div>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;
