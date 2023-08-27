"use client";

import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

type NavigationItemProps = {
  id: string;
  serverLogo: string;
  name: string;
};

import { ActionTooltip } from "@/components/ActionTooltip/Tooltip";
import { cn } from "@/lib/utils";

const NavigationItem = ({ id, serverLogo, name }: NavigationItemProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <ActionTooltip
      text={name}
      element={
        <button className="flex items-center group relative" onClick={() => {}}>
          <div
            className={cn(
              "absolute left-0 rounded-r-full transition-all w-[4px] bg-white",
              params?.serverId !== id && "group-hover:h-[20px]",
              params?.serverId === id ? "h-[36px]" : "h-[8px]"
            )}
          />
          <div
            className={cn(
              "relative flex items-center justify-center bg-primary rounded-[24px] group-hover:rounded-[16px] w-[48px] h-[48px] transition-all overflow-hidden mx-3",
              params?.serverId === id && "rounded-[16px] bg-primary/10"
            )}
          >
            <Image fill src={serverLogo} alt="Server" />
          </div>
        </button>
      }
      side="right"
    />
  );
};

export default NavigationItem;
