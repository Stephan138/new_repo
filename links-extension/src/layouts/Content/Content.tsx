import { classNames } from "../../utils/classNames";
import styles from "./Content.module.css";

type Props = {
  layout?: boolean;
  centered?: boolean;
  children?: React.ReactNode;
};

export const Content: React.FC<Props> = ({ layout, centered, children }) => {
  return (
    <div
      className={classNames(
        styles.Content,
        centered && styles.Center,
        layout && styles.Layout
      )}
    >
      {children}
    </div>
  );
};
