import { useEffect, useState } from "react";
import { DropDownIcon, DropExpandedIcon, FolderIcon } from "../../assets/icons";
import { classNames } from "../../utils/classNames";
import styles from "./TreeNode.module.css";

type Props = {
  label: string;
  selected?: boolean;
  expand?: boolean;
  defaultExpanded?: boolean;
  onSelect?: () => void;
  onExpand?: () => void;
  children?: React.ReactNode;
};

export const TreeNode: React.FC<Props> = ({
  label,
  children,
  expand,
  selected,
  onSelect,
  onExpand,
  defaultExpanded,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded || false);

  useEffect(() => {
    if (expand) {
      setExpanded(true);
      onExpand && onExpand();
    }
  }, [expand]);

  const dropDown = () => {
    setExpanded((prev) => !prev);
    onExpand && onExpand();
  };

  return (
    <div className={styles.TreeNode}>
      <div
        className={classNames(styles.Info, selected && styles.Selected)}
        onDoubleClick={dropDown}
        onClick={onSelect}
      >
        {expanded ? (
          <DropExpandedIcon width={24} height={24} />
        ) : (
          <DropDownIcon width={24} height={24} />
        )}
        <FolderIcon />
        <span>{label}</span>
      </div>
      {expanded && <div className={styles.Nodes}>{children}</div>}
    </div>
  );
};
