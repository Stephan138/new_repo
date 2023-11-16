import { useMutation, useQuery } from "react-query";
import { foldersRoot, getNode } from "../services";
import { deleteNode } from "../services/nodes-service";

export const useNode = (parent?: string) => {
  const { data: node, refetch: fetchNodes } = useQuery(
    ["nodes", parent],
    () => (parent ? getNode(parent) : foldersRoot()),
    {
      retry: false,
    }
  );

  return { node, fetchNodes };
};

export const useGetNode = () => {
  const { data: node, mutate: fetchNode } = useMutation({
    mutationFn: (id: string) => getNode(id),
  });
  return { node, fetchNode };
};

export const useDeleteNode = (onUpdate?: () => void) => {
  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteNode(id),
    onSuccess: onUpdate,
  });
  return mutate;
};
