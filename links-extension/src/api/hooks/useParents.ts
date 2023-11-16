import { useQuery } from "react-query";
import { getParents } from "../services/nodes-service";

export const useParents = (nodeId?: string) => {
  const { data: parents } = useQuery(
    ["parents", nodeId],
    () => getParents(nodeId),
    { enabled: !!nodeId }
  );

  return { parents };
};
