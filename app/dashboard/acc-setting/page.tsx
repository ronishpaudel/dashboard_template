"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MailOpenIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserInfo } from "@/app/component/hooks/getHooks/useUserInfo";
import { Loading } from "@/app/loading";
import { withAuth } from "@/utils/withAuth";

function Page() {
  const { push } = useRouter();
  const { data, isLoading, isError } = useUserInfo();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background w-full">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="flex flex-col items-center justify-center h-screen bg-background w-full">
        Error fetching user info
      </p>
    );
  }

  if (!data) {
    return (
      <p className="flex flex-col items-center justify-center h-screen bg-background w-full">
        No user data found
      </p>
    );
  }

  const user = data;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background w-full">
      <Card className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <ArrowLeft
          onClick={() => push("/dashboard")}
          className="text-orange-500 w-6 h-6 hover:bg-orange-600 rounded cursor-pointer hover:bg-opacity-25"
        />
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage
              src={user.profilePic || "/placeholder-user.jpg"}
              alt="User Avatar"
            />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Separator />
        <CardContent className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col items-center">
            <UserIcon className="w-8 h-8 text-primary mb-2" />
            <span className="text-sm font-medium">Username</span>
            <p className="text-muted-foreground text-sm">
              {user.name || "Not set"}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <MailOpenIcon className="w-8 h-8 text-primary mb-2" />
            <span className="text-sm font-medium">Email</span>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(Page);
