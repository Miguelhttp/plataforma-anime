import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

export function ClerkProviderWrapper({ children }) {
  return (
    <ClerkProvider
      appearance={{ baseTheme: dark, signIn: { baseTheme: dark } }}
      publishableKey={PUBLISHABLE_KEY}
    >
      {children}
    </ClerkProvider>
  );
}
