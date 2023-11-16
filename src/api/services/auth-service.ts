import axios from "axios";
import { api } from "../api";
import { TToken } from "../models/token-model";
import { TCredentials } from "../models/credentials-model";

export const token = async (credentials: TCredentials) => {
  try {
    const { data: tokens } = await api.post<TToken>("/token", credentials);
    return tokens;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error("refresh - ошибка");
    }
    throw Error("token - ошибка на стороне сервера");
  }
};

export const register = async (credentials: TCredentials) => {
  try {
    await api.post("/register", credentials);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error("refresh - ошибка");
    }
    throw Error("register - ошибка на стороне сервера");
  }
};

export const refresh = async (token: string) => {
  try {
    const { data: tokens } = await api.post("/refresh", {
      refreshToken: token,
    });
    return tokens;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error("refresh - ошибка");
    }
    throw Error("refresh - ошибка на стороне сервера");
  }
};

export const check = async () => {
  try {
    return await api.get("/check");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    // throw error;
  }
};
