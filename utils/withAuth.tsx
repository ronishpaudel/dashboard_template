"use client";
import React, { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
