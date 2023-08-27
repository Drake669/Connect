import NavigationSidebar from "@/components/Navigation/NavigationSidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-full md:flex hidden flex-col fixed w-[72px] inset-y-0 divide-zinc-300">
        <NavigationSidebar />
      </div>
      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
};

export default MainLayout;
