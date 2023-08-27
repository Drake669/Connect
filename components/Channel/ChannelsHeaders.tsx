"use client";

import { ServerWithMembersAndProfiles } from "@/types";
import { MemberRoles } from "@prisma/client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  Plus,
  Settings,
  Trash,
  UserPlus,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/UseModal";

type ChannelHeaderProps = {
  server: ServerWithMembersAndProfiles;
  role?: MemberRoles;
};

const ChannelsHeader = ({ server, role }: ChannelHeaderProps) => {
  const { onOpen } = useModal();
  const isAdmin = role === "ADMIN";
  const isModerator = isAdmin || role === "MODERATOR";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button className="flex items-center w-full px-3 text-md h-12 border-neutral-200 dark:border-neutral-800 hover:bg-zinc-700/10 transition dark:hover:bg-zinc-700/50 ">
          {server.name}
          <ChevronDown className="ml-auto h-[15px] w-[15px]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {isModerator && (
          <DropdownMenuItem>
            <button
              className="flex items-center w-56 px-3 text-sm text-[#8087d5] hover:bg-indigo-600 hover:text-white p-1 hover:rounded-sm"
              onClick={() => {
                onOpen("invitePeople", server);
              }}
            >
              Invite People
              <UserPlus className="ml-auto h-[15px] w-[15px]" />
            </button>
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem>
            <button className="flex items-center w-56 px-3 text-sm dark:text-white text-[#8087d5] hover:bg-indigo-600 hover:text-white p-1 hover:rounded-sm">
              Create Channel
              <Plus className="ml-auto h-[15px] w-[15px]" />
            </button>
          </DropdownMenuItem>
        )}
        <Separator orientation="horizontal" className="bg-gray-500 my-2" />
        {isAdmin && (
          <DropdownMenuItem>
            <button className="flex items-center w-56 px-3 text-sm dark:text-white text-[#8087d5] hover:bg-indigo-600 hover:text-white p-1 hover:rounded-sm">
              Server Settings
              <Settings className="ml-auto h-[15px] w-[15px]" />
            </button>
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem>
            <button className="flex items-center w-56 px-3 text-sm text-rose-500 hover:bg-rose-500 hover:text-white p-1 hover:rounded-sm">
              Delete Server
              <Trash className="ml-auto h-[15px] w-[15px]" />
            </button>
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem>
            <button className="flex items-center w-56 px-3 text-sm  text-rose-500 hover:bg-rose-500 hover:text-white p-1 hover:rounded-sm">
              Leave Server
              <LogOut className="ml-auto h-[15px] w-[15px]" />
            </button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChannelsHeader;
