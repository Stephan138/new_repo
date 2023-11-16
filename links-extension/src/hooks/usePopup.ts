import { useState } from "react";

export type TPosition = {
  left: number;
  top: number;
};

export type TUsePopup = {
  visible: boolean;
  position: TPosition;
  close: () => void;
  open: (e: React.MouseEvent<Element, MouseEvent>) => void;
};

export const usePopup = (): TUsePopup => {
  const [position, setPosition] = useState<TPosition>({ left: 0, top: 0 });
  const [visible, setVisible] = useState<boolean>(false);

  const close = () => {
    setPosition({ top: 0, left: 0 });
    setVisible(false);
  };
  const open = (e: React.MouseEvent<Element, MouseEvent>) => {
    const w = window.innerWidth;
    const ox = e.clientX + 300 > w ? e.clientX - 300 : e.clientX;
    setPosition({ top: e.clientY, left: ox });
    setVisible(true);
  };

  return { position, visible, open, close };
};
