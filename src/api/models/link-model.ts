import { ENodeType } from "./nodes-model";

export type TLinksForm = {
  name: string;
  description: string;
  url: string;
};

export type TLink = {
  id: string;
  name: string;
  description: string;
  url: string;
  type: ENodeType;
};
