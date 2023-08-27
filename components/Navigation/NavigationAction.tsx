import { Plus } from "lucide-react";
import React from "react";
import { ActionTooltip } from "@/components/ActionTooltip/Tooltip";

const NavigationAction = () => {
  return (
    <div>
      <button className="group">
        <ActionTooltip
          text="Add a Server"
          element={
            <div className="dark:bg-neutral-700 mx-3 flex items-center justify-center w-[48px] h-[48px] bg-background rounded-full group-hover:bg-emerald-500 group-hover:rounded-[16px] transition-all">
              <Plus
                className="text-emerald-500 transition  group-hover:text-white"
                size={25}
              />
            </div>
          }
          side="right"
        />
      </button>
    </div>
  );
};

export default NavigationAction;
