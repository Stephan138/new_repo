import { useEffect } from "react";
import { useAtom } from "jotai";
import { useMutation, useQuery } from "react-query";

import {
  createFolder,
  foldersRoot,
  renameFolder,
} from "../services/folders-service";
import { TFolderForm } from "../models/folders-model";
import { rootAtom } from "../../store/folder-atom";

export const useFolder = () => {
  const [_, setRootFolder] = useAtom(rootAtom);

  const { data: root, refetch } = useQuery("root", foldersRoot);

  useEffect(() => {
    if (root) {
      setRootFolder(root);
    }
  }, [root, setRootFolder]);

  return { root, refetch };
};

export const useCreateFolder = (onUpdate?: () => void) => {
  const { mutate: newFolder } = useMutation(
    (folder: TFolderForm) => createFolder(folder),
    { onSuccess: onUpdate }
  );
  return { newFolder };
};

export const useRenameFolder = (onUpdate?: () => void) => {
  const { mutate: updateFolder } = useMutation(
    (folder: TFolderForm) => renameFolder(folder),
    { onSuccess: onUpdate }
  );
  return { updateFolder };
};
