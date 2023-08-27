import { db } from "@/lib/db";
import { profile } from "@/lib/profileId";
import { redirect } from "next/navigation";
import React from "react";
import NavigationAction from "@/components/Navigation/NavigationAction";
import NavigationSeperator from "@/components/Navigation/NavigationSeperator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationItem from "@/components/Navigation/NavigationItem";
import { ModeToggle } from "../ui/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const NavigationSidebar = async () => {
  const currentProfile = await profile();

  if (!currentProfile) {
    redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      profileId: currentProfile.id,
    },
  });

  return (
    <div className="dark:bg-[#1e1f22] flex flex-col space-y-4 items-center h-full py-3 w-full z-30">
      <NavigationAction />
      <NavigationSeperator />
      <ScrollArea className="flex-1 w-full mb-4">
        <div>
          {servers.map((server) => (
            <NavigationItem
              key={server.id}
              name={server.name}
              id={server.id}
              serverLogo={server.serverLogo}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="flex flex-col items-center justify-between mt-auto pb-3 gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
