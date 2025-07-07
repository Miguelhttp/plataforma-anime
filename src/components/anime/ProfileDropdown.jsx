import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  useUser,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isSignedIn } = useUser();

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Usuário não logado — botão para abrir modal de login Clerk
  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button
          aria-label="Entrar"
          className="text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
        >
          {/* Ícone genérico quando não está logado */}
          <User size={20} className="rounded-full border-2 border-indigo-500 w-8 h-8" />
        </button>
      </SignInButton>
    );
  }

  // Usuário logado — dropdown com avatar, perfil e logout
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Menu do perfil"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
      >
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-8 h-8 rounded-full border-2 border-indigo-500",
              userProfileCard: "bg-gray-900 text-white rounded-lg shadow-xl",
              userProfileHeader: "bg-indigo-700",
              userProfileDetails: "text-gray-300",
              userProfileFooter: "bg-indigo-800",
              userProfileSignOutButton: "bg-red-600 hover:bg-red-700",
              userProfileButtonPrimary: "bg-indigo-600 hover:bg-indigo-700",
            },
          }}
        />
      </button>

      {open && (
        <div
          tabIndex={-1}
          className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#1a1a2e] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        >
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-indigo-600 hover:text-white transition"
            onClick={() => setOpen(false)}
          >
            Meu Perfil
          </Link>

          <SignOutButton>
            <button
              className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-indigo-600 hover:text-white transition flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <LogOut size={16} />
              Sair
            </button>
          </SignOutButton>
        </div>
      )}
    </div>
  );
}
