"use client";
import React, { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import { authStore } from "./authStore";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();

    const { loggedIn } = useSnapshot(authStore);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
      } else {
        authStore.setLoggedIn();
      }
    }, [router]);

    if (!loggedIn) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
