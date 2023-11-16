import axios from "axios";
import { api } from "../api";
import { TNode, TParent } from "../models/nodes-model";

export const getNode = async (nodeId: string) => {
  try {
    const { data } = await api.get<TParent>(`/nodes/${nodeId}/childs`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw Error("getNodes - ошибка на стороне сервера");
  }
};

export const getParents = async (nodeId?: string) => {
  try {
    const { data } = await api.get<TNode[]>(`/nodes/${nodeId}/parents`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw Error("getParents - ошибка на стороне сервера");
  }
};

export const deleteNode = async (nodeId: string) => {
  try {
    await api.delete(`/nodes/${nodeId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw Error("deleteNode - ошибка на стороне сервера");
  }
};
