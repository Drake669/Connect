import { db } from "@/lib/db";
import { profile } from "@/lib/profileId";
import { redirect } from "next/navigation";
import React from "react";
import ChannelsHeader from "@/components/Channel/ChannelsHeaders";

type ChannelSidebarProps = {
  serverId: string;
};

const ChannelSidebar = async ({ serverId }: ChannelSidebarProps) => {
  const currentProfile = await profile();
  if (!currentProfile) {
    redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        orderBy: {
          memeberRole: "asc",
        },
        include: {
          profile: true,
        },
      },
    },
  });

  if (!server) {
    redirect("/");
  }

  const { channels, members } = server;

  const textChannels = channels.filter(
    (channel) => channel.channelType === "TEXT"
  );
  const audioChannels = channels.filter(
    (channel) => channel.channelType === "AUDIO"
  );
  const videoChannels = channels.filter(
    (channel) => channel.channelType === "VIDEO"
  );

  const role = members.filter(
    (member) => member.profileId === currentProfile.id
  )?.[0].memeberRole;
  return (
    <div className="flex flex-col items-center text-primary dark:bg-[#2b2d31] h-full w-full bg-gray-200">
      <ChannelsHeader role={role} server={server} />
    </div>
  );
};

export default ChannelSidebar;
