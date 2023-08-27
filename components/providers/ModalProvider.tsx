"use client";

import React, { useEffect, useState } from "react";
import CreateServer from "@/components/Modals/CreateServerModal";
import InvitePeople from "@/components/Modals/InvitePeople";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServer />
      <InvitePeople />
    </>
  );
};

export default ModalProvider;
