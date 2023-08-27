"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/UseModal";
import { Copy } from "lucide-react";

const InvitePeople = () => {
  const { isOpen, type, onClose, data } = useModal();

  const isModalOpen = isOpen && type === "invitePeople";
  const [isCopied, setIsCopied] = useState(false);

  const handleClose = () => {
    setIsCopied(false);
    onClose();
  };

  const inviteUrl = `${window.location.origin}/invite/${data?.inviteUrl}`;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black">
        <DialogHeader className="pt-8 px-5 text-center">
          <DialogTitle className="text-center font-bold text-3xl">
            Invite friends to {data?.name}
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Send a server invite link to a friend
          </DialogDescription>

          <div className="flex items-center gap-x-2 pt-10">
            <Input
              className="bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0 border-0"
              defaultValue={inviteUrl}
            />
            <Button
              className=" hover:bg-indigo-600 hover:text-white  bg-indigo-600 text-white "
              onClick={() => {
                if (data) {
                  navigator.clipboard.writeText(inviteUrl);
                  setIsCopied(true);
                }
              }}
            >
              Copy
            </Button>
          </div>
          {isCopied && (
            <div className="text-green-400 flex items-center gap-x-2">
              <Copy size={20} /> Copied to clipboard
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InvitePeople;
