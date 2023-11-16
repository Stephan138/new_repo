import { ArrowLeftIcon } from "../../assets/icons";
import { classNames } from "../../utils/classNames";
import { IconButton } from "../IconButton";
import styles from "./Form.module.css";

type Props = {
  gap?: number;
  title?: string;
  compact?: boolean;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onBack?: () => void;
};

export const Form: React.FC<Props> = ({
  gap,
  title,
  footer,
  children,
  compact,
  onSubmit,
  onBack,
}) => {
  return (
    <form
      className={classNames(styles.Form, compact && styles.Compact)}
      onSubmit={onSubmit}
    >
      {!!title && <h2 className={styles.Title}>{title}</h2>}
      <div className={styles.Content} style={{ gap }}>
        {children}
      </div>
      {!!footer && <div className={styles.Footer}>{footer}</div>}
      {!!onBack && (
        <IconButton onClick={onBack}>
          <ArrowLeftIcon fill="#ffffff" />
        </IconButton>
      )}
    </form>
  );
};
