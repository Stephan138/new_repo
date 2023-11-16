import { classNames } from "../../utils/classNames";
import styles from "./Button.module.css";

type Props = {
  label: string;
  primary?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button: React.FC<Props> = ({
  label,
  primary,
  disabled,
  onClick,
}) => {
  const handleClick: React.MouseEventHandler = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      className={classNames(
        styles.Button,
        primary && styles.Primary,
        disabled && styles.Disabled
      )}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};
