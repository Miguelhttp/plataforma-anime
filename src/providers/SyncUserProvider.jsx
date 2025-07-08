import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFavoritesStore } from "../store/favoritesStore";

export function SyncUserProvider({ children }) {
  const { user, isLoaded } = useUser();
  const setUserId = useFavoritesStore((state) => state.setUserId);

  useEffect(() => {
    if (isLoaded) {
      setUserId(user?.id ?? null);
    }
  }, [user, isLoaded, setUserId]);

  return children;
}