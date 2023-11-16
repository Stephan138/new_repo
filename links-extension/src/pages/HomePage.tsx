import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FoldersChain } from "../containers/FoldersChain";
import { useDeleteNode, useNode } from "../api/hooks/useNode";
import { Content } from "../layouts";
import { NodesList } from "../containers/NodesList";
import { separateNodes } from "../utils/filterNodes";
import { ENodeType } from "../api/models/nodes-model";
import { folderAtom, rootAtom, selectionAtom } from "../store/folder-atom";
import { usePopup } from "../hooks/usePopup";
import { useModal } from "../hooks/useModal";
import { NodePopup } from "../forms/NodePopup";
import { FolderForm } from "../forms/FolderForm";
import { LinkForm } from "../forms/LinkForm";
import { ContextPopup } from "../forms/ContextPopup";
import { useIsMutating } from "react-query";

export const HomePage = () => {
  const { folder } = useParams();
  const { node, fetchNodes } = useNode(folder);
  const root = useAtomValue(rootAtom);
  const setCurrentFolder = useSetAtom(folderAtom);
  const navigate = useNavigate();

  const [selection, select] = useAtom(selectionAtom);

  const navigateToFolder = (id: string | null): void => {
    navigate(id ? `/folders/${id}` : "/drive");
  };

  const navigateToLink = (id: string): void => {
    navigate(`/link/${id}`, { replace: true });
  };

  useEffect(() => {
    setCurrentFolder(node || root);
    return () => select(null);
  }, [folder, node]);

  const [folders, items] = separateNodes(
    node?.nodes || root?.nodes || [],
    ENodeType.FOLDER
  );

  const actionsPopup = usePopup();
  const contextPopup = usePopup();
  const folderModal = useModal();
  const linkModal = useModal();

  const deleteNode = useDeleteNode(() => {
    fetchNodes();
  });

  const isMutating = useIsMutating();

  useEffect(() => {
    fetchNodes();
  }, [isMutating]);

  return (
    <>
      <Content layout>
        <FoldersChain
          parent={node}
          onClick={navigateToFolder}
          onAction={(e) => {
            actionsPopup.open(e);
            select(null);
          }}
        />
        {!!folders.length && (
          <NodesList
            nodes={folders}
            onNavigate={navigateToFolder}
            onContext={contextPopup.open}
          />
        )}
        {!!items.length && (
          <NodesList
            nodes={items}
            onNavigate={navigateToLink}
            onContext={contextPopup.open}
          />
        )}
      </Content>

      <NodePopup
        state={actionsPopup}
        createFolder={folderModal.open}
        createLink={linkModal.open}
      />

      <ContextPopup
        state={contextPopup}
        deleteNode={() => selection && deleteNode(selection.id)}
        renameNode={() => {
          if (selection) {
            selection.type === ENodeType.FOLDER && folderModal.open();
            selection.type === ENodeType.LINK && linkModal.open();
          }
        }}
      />

      <FolderForm
        state={folderModal}
        parent={node?.parentId || ""}
        onUpdate={fetchNodes}
        name={selection?.name}
        edit={selection?.id}
      />
      <LinkForm
        state={linkModal}
        parent={node?.parentId || ""}
        onUpdate={fetchNodes}
        edit={selection?.id}
      />
    </>
  );
};
