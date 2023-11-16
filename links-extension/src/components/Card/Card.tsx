import { classNames } from "../../utils/classNames";
import styles from "./Card.module.css";

type Props = {
  label: string;
  icon?: React.ReactNode;
  color?: string;
  selected?: boolean;
  onSelect?: () => void;
  onDoubleClick?: () => void;
  onContext?: (e: React.MouseEvent<Element, MouseEvent>) => void;
};

export const Card: React.FC<Props> = ({
  label,
  icon,
  color,
  selected,
  onSelect,
  onDoubleClick,
  onContext,
}) => {
  return (
    <div className={styles.Container}>
      <div
        className={classNames(styles.Card, selected && styles.Selected)}
        style={{ backgroundColor: color }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect && onSelect();
        }}
        onDoubleClick={() => onDoubleClick && onDoubleClick()}
        onContextMenu={(e) => {
          e.preventDefault();
          onSelect && onSelect();
          onContext && onContext(e);
        }}
      >
        {icon}
        <span className={styles.Label}>{label}</span>
      </div>
    </div>
  );
};
