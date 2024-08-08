"use client";
import { SideNavBar } from "../component/side-nabar";
import Header from "../component/header";
import { Main } from "../component/main";
import withAuth from "@/utils/withAuth";

function page() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default withAuth(page);
