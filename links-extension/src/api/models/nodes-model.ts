export enum ENodeType {
  FOLDER = "Folder",
  LINK = "Link",
}

export type TParent = {
  parentId: string;
  name: string;
  nodes: TNode[];
};

export type TNode = {
  id: string;
  name: string;
  type: ENodeType;
};
