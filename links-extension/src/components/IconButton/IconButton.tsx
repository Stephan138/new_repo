import styles from "./IconButton.module.css";

type Props = {
  background?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const IconButton: React.FC<Props> = ({
  children,
  background,
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
      className={styles.IconButton}
      onClick={handleClick}
      style={{ backgroundColor: background }}
    >
      {children}
    </button>
  );
};
