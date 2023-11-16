import { classNames } from "../../utils/classNames";

import Logo from "../../assets/logo.svg?react";
import styles from "./Header.module.css";

type Props = {
  loading?: boolean;
  children?: React.ReactNode;
};

export const Header: React.FC<Props> = ({ loading, children }) => {
  return (
    <div className={classNames(styles.Header)}>
      <Logo />
      {loading && <p>ЗагрузОчка...</p>}
      {children}
    </div>
  );
};
