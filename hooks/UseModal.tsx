import { Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createServer" | "invitePeople";

type ModalStore = {
  isOpen: boolean;
  type: ModalType | null;
  data?: Server | null;
  onOpen: (type: ModalType, data?: Server) => void;
  onClose: () => void;
};

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  type: null,
  data: null,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false }),
}));
