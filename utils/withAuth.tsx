"use client";
import React, { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import { authStore } from "./authStore";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();
    const { loggedIn } = useSnapshot(authStore);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            // Refresh the token to ensure it's valid
            const token = await currentUser.getIdToken(true);
            localStorage.setItem("token", token);
            authStore.setLoggedIn();
          } catch (error) {
            console.error("Failed to refresh token:", error);
            // Optionally handle the error (e.g., redirect to login)
            router.push("/");
          }
        } else {
          localStorage.removeItem("token");
          authStore.setLogOut();
          router.push("/");
        }

        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!loggedIn) {
      return <div>Access denied. Redirecting...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export { withAuth };
