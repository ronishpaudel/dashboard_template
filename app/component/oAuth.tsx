import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/utils/firebase";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "./hooks/postHooks/useAuth";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

initializeApp(firebaseConfig);

export function OAuth() {
  const { mutate: login, isPending, isError } = useGoogleLogin();

  const handleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      login(token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in to your account
          </CardTitle>
          <CardDescription className="text-center">
            Or register for a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Button
              variant="outline"
              onClick={handleLogin}
              disabled={isPending}
              className="w-full"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <FcGoogle className="w-5 h-5 mr-2" />
              )}
              {isPending ? "Signing in..." : "Sign in with Google"}
            </Button>
            {isError && (
              <p className="text-sm text-center text-red-500">
                Login failed. Please try again.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
