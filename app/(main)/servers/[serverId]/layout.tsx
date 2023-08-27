import ChannelSidebar from "@/components/Channel/ChannelSidebar";
import { db } from "@/lib/db";
import { profile } from "@/lib/profileId";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const ServerLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const currentProfile = await profile();

  if (!currentProfile) {
    redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: currentProfile?.id,
        },
      },
    },
  });
  if (!server) {
    redirect("/");
  }
  return (
    <div className="h-full">
      <div className="hidden md:flex flex-col w-60 z-20 h-full inset-y-0 fixed">
        <ChannelSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerLayout;
