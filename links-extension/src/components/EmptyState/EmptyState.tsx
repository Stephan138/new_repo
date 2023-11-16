import EmptyIllustration from "../../assets/empty.svg?react";

import styles from "./EmptyState.module.css";

type Props = {
  info?: string;
};

export const EmptyState: React.FC<Props> = ({ info }) => {
  return (
    <div className={styles.Empty}>
      <EmptyIllustration className={styles.Image} />
      <span className={styles.Text}>{info}</span>
    </div>
  );
};
