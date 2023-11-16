import styles from "./ActionButton.module.css";

type Props = {
  icon?: React.ReactNode;
  label: string;
  onClick?: React.MouseEventHandler<Element>;
};

export const ActionButton: React.FC<Props> = ({ icon, label, onClick }) => {
  const handleClick: React.MouseEventHandler = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <button className={styles.ActionButton} onClick={handleClick}>
      {icon}
      {label}
    </button>
  );
};
