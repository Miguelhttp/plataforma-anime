import { SignIn, useUser } from "@clerk/clerk-react";

export default function SignInPage() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size={32} color />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-800 via-indigo-600 to-blue-700 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
              card: "shadow-none border border-gray-200 rounded-lg",
              headerTitle: "text-gray-800 text-xl font-semibold",
              headerSubtitle: "text-gray-500 text-sm",
              socialButtonsBlockButton:
                "bg-gray-100 text-black hover:bg-gray-200",
              footerActionLink: "text-blue-600 hover:underline",
            },
            variables: {
              colorPrimary: "#3B82F6", // azul tailwind
              colorText: "#1F2937", // cinza escuro
            },
          }}
        />
      </div>
    </div>
  );
}
