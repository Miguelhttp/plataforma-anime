import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import UserProfile from "../UserProfile";
import { Button } from "../../components/ui/Button";

export default function ProtectedUserProfile() {
  const { isLoaded } = useUser();

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
            <Button />
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
}
