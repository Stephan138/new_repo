import { TreeNode } from "../components/TreeNode";
import { ENodeType, TNode } from "../api/models/nodes-model";
import { useNode } from "../api/hooks/useNode";
import { useAtomValue } from "jotai";
import { folderAtom } from "../store/folder-atom";
import { useNavigate } from "react-router-dom";
import { filterNodes } from "../utils/filterNodes";

type Props = {
  root: TNode;
};

export const Folders: React.FC<Props> = ({ root }) => {
  const current = useAtomValue(folderAtom);
  const { node } = useNode(root.id);
  const navigate = useNavigate();

  return (
    <TreeNode
      label={root.name}
      selected={current?.parentId === root.id}
      onSelect={() => navigate(`/folders/${root.id}`)}
      defaultExpanded
    >
      {node &&
        filterNodes(node.nodes, ENodeType.FOLDER).map((node) => (
          <Folders key={node.id} root={node} />
        ))}
    </TreeNode>
  );
};
