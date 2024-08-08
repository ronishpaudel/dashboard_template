"use client";
import React, { ComponentType, useEffect } from "react";
import { useRouter } from "next/navigation";

interface WithAuthProps {
  isAuthenticated: boolean;
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P & WithAuthProps> => {
  const ComponentWithAuth = (props: P & WithAuthProps) => {
    const { isAuthenticated } = props;
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
