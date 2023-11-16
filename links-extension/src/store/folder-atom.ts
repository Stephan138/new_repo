import { atom } from "jotai";
import { TNode, TParent } from "../api/models/nodes-model";

export const rootAtom = atom<TParent | null>(null);
export const folderAtom = atom<TParent | null>(null);
export const selectionAtom = atom<TNode | null>(null);
