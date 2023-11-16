import { AnimatePresence, motion } from "framer-motion";
import styles from "./Modal.module.css";
import { useOnClickOutside } from "usehooks-ts";
import { useRef } from "react";
import { classNames } from "../../utils/classNames";

type Props = {
  title?: string;
  isVisible?: boolean;
  children?: React.ReactNode;
  transparent?: boolean;
  onClose?: () => void;
};

export const Modal: React.FC<Props> = ({
  isVisible,
  title,
  children,
  onClose,
  transparent,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => onClose && onClose();

  useOnClickOutside(ref, handleClick);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.Overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={ref}
            className={classNames(!transparent && styles.Modal)}
            initial={{ translateY: 200 }}
            animate={{ translateY: 0 }}
            exit={{ translateY: -200 }}
          >
            {!!title && <span className={styles.Title}>{title}</span>}
            <div className={styles.Content}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
