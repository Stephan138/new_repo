import { useState } from "react";

export type TUseModal = {
  visible: boolean;
  selected?: string;
  close: () => void;
  open: () => void;
};

export const useModal = (): TUseModal => {
  const [visible, setVisible] = useState<boolean>(false);

  const close = () => {
    setVisible(false);
  };
  const open = () => {
    setVisible(true);
  };

  return { visible, close, open };
};
