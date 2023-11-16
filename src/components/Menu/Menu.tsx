import styles from "./Menu.module.css";

type Props = {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
};

export const Menu: React.FC<Props> = ({ icon, title, onClick }) => {
  return (
    <div className={styles.Menu} onClick={onClick}>
      {icon}
      <span className={styles.Title}>{title}</span>
    </div>
  );
};
