import { useAtomValue } from "jotai";
import { ENodeType, TParent } from "../api/models/nodes-model";
import { TreeNode } from "../components/TreeNode";
import { Side } from "../layouts";
import { filterNodes } from "../utils/filterNodes";
import { Folders } from "./Folders";
import { folderAtom } from "../store/folder-atom";
import { useNavigate } from "react-router-dom";
import { ActionButton } from "../components/ActionButton";
import { PlusIcon } from "../assets/icons";
import { usePopup } from "../hooks/usePopup";
import { NodePopup } from "../forms/NodePopup";
import { useModal } from "../hooks/useModal";
import { FolderForm } from "../forms/FolderForm";
import { LinkForm } from "../forms/LinkForm";

type Props = {
  root: TParent | null;
  onUpdate?: () => void;
};

export const FoldersPanel: React.FC<Props> = ({ root, onUpdate }) => {
  const nodes = (root && filterNodes(root.nodes, ENodeType.FOLDER)) || [];
  const current = useAtomValue(folderAtom);
  const navigate = useNavigate();

  const actionsPopup = usePopup();
  const folderModal = useModal();
  const linkModal = useModal();

  return (
    <Side>
      <ActionButton
        icon={<PlusIcon width={32} height={32} />}
        label="Создать"
        onClick={actionsPopup.open}
      />
      <TreeNode
        label="Мой диск"
        defaultExpanded
        selected={current?.parentId === root?.parentId || !current}
        onSelect={() => navigate("/drive")}
      >
        {root &&
          nodes.map((folder) => <Folders key={folder.id} root={folder} />)}
      </TreeNode>

      <NodePopup
        state={actionsPopup}
        createFolder={folderModal.open}
        createLink={linkModal.open}
      />

      <FolderForm
        state={folderModal}
        parent={current?.parentId || root?.parentId || ""}
        onUpdate={onUpdate}
      />
      <LinkForm
        state={linkModal}
        parent={current?.parentId || root?.parentId || ""}
        onUpdate={onUpdate}
      />
    </Side>
  );
};
