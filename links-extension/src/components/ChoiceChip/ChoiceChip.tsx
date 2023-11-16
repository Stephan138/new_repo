import { DropExpandedIcon } from "../../assets/icons";
import { classNames } from "../../utils/classNames";
import styles from "./ChoiceChip.module.css";

type Props = {
  label: string;
  current?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const ChoiceChip: React.FC<Props> = ({ label, current, onClick }) => {
  return (
    <div onClick={onClick}>
      <span
        className={classNames(styles.ChoiceChip, current && styles.Current)}
      >
        {label}
        {current && <DropExpandedIcon width={48} height={48} />}
      </span>
    </div>
  );
};
