import axios from "axios";
import { api } from "../api";
import { TParent } from "../models/nodes-model";
import { TFolderForm } from "../models/folders-model";

export const foldersRoot = async () => {
  try {
    const { data } = await api.get<TParent>("/folders/root");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw Error("token - ошибка на стороне сервера");
  }
};

export const createFolder = async (folder: TFolderForm) => {
  try {
    await api.post("/folders", folder);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw Error("token - ошибка на стороне сервера");
  }
};

export const renameFolder = async (folder: TFolderForm) => {
  try {
    await api.put(`/folders/${folder.parentId}`, { name: folder.name });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw Error("token - ошибка на стороне сервера");
  }
};
