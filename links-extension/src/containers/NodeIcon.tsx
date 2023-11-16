import { ENodeType } from "../api/models/nodes-model";
import { FolderItemIcon, LinkItemIcon } from "../assets/icons";

type Props = {
  nodeType: ENodeType;
};

const nodeIcons: Record<ENodeType, React.FC> = {
  [ENodeType.FOLDER]: FolderItemIcon,
  [ENodeType.LINK]: LinkItemIcon,
};

export const NodeIcon: React.FC<Props> = ({ nodeType }) => {
  const IconComponent = nodeIcons[nodeType];
  return <IconComponent />;
};
