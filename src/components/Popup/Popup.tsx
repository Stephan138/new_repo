import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./Popup.module.css";
import { classNames } from "../../utils/classNames";
import { TPosition } from "../../hooks/usePopup";

type Props = {
  isVisible?: boolean;
  title?: string;
  className?: string;
  children?: React.ReactNode;
  position?: TPosition;
  onClose?: () => void;
};

export const Popup: React.FC<Props> = ({
  isVisible,
  title,
  children,
  position,
  className,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = () => onClose && onClose();

  useOnClickOutside(ref, handleClose);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={ref}
          className={classNames(styles.Popup, className)}
          style={{
            left: position?.left || undefined,
            top: position?.top || undefined,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          {!!title && <span className={styles.Title}>{title}</span>}
          <div>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
