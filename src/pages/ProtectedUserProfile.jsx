import { SignedIn, SignedOut, useUser , SignInButton} from "@clerk/clerk-react";
import UserProfile from "./UserProfile";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function ProtectedUserProfile() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size={32} color />
      </div>
    );
  }

  return (
    <>
      <SignedIn>
        <UserProfile />
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h2 className="text-lg sm:text-2xl mb-4 text-gray-700 font-bold">
            Você precisa estar logado para acessar o perfil.
          </h2>
          <SignInButton mode="modal">
            <button className="btn-primary px-6 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition">
              Fazer login
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
}
