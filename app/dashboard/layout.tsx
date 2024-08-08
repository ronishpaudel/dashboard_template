"use client";

import { ThemeProvider } from "../component/theme-provider";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex h-screen ">{children}</div>
      </ThemeProvider>
    </>
  );
}
