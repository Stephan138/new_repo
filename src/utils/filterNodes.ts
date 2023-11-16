import { ENodeType, TNode } from "../api/models/nodes-model";

export const filterNodes = (nodes: TNode[], filter: ENodeType) => {
  return nodes.filter((node) => node.type === filter);
};

export const separateNodes = (nodes: TNode[], separator: ENodeType) => {
  const left = nodes.filter((node) => node.type === separator);
  const right = nodes.filter((node) => node.type !== separator);

  return [left, right];
};
