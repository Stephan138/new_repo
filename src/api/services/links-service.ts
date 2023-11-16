import axios from "axios";
import { api } from "../api";
import { TLink, TLinksForm } from "../models/link-model";

export const getLink = async (id: string) => {
  try {
    const { data } = await api.get<TLink>(`/links/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw Error("getNodes - ошибка на стороне сервера");
  }
};

export const editLink = async (id: string, link: TLinksForm) => {
  try {
    await api.put(`/links/${id}`, link);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw Error("token - ошибка на стороне сервера");
  }
};

export const createLink = async (parent: string, link: TLinksForm) => {
  try {
    await api.post("/links", { parentId: parent, ...link });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw Error("token - ошибка на стороне сервера");
  }
};
