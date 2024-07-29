import React from "react";
import Link from "next/link";
import { Package2Icon, HomeIcon, PackageIcon } from "lucide-react";
const NavBar = () => {
  return (
    <nav className="grid gap-6 text-lg font-medium">
      <Link
        href="#"
        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
        prefetch={false}
      >
        <Package2Icon className="h-5 w-5 transition-all group-hover:scale-110" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <Link
        href="/dashboard"
        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        prefetch={false}
      >
        <HomeIcon className="h-5 w-5" />
        Dashboard
      </Link>

      <Link
        href="/dashboard/add-product"
        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
        prefetch={false}
      >
        <PackageIcon className="h-5 w-5" />
        Products
      </Link>
    </nav>
  );
};

export default NavBar;
