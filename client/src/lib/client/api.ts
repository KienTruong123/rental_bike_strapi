import { TSignInBody } from "../../redux/reducers/auth";
import { get, post, put } from "./common";

export const signin = () => {
  return {
    post: async (body: TSignInBody, params?: Record<string, any>) =>
      await post<any>(`/auth/local`, params, body),
  };
};

export const bikes = (locale = "vi") => {
  return {
    get: async (params?: Record<string, any>) =>
      await get<any>(`bikes?populate=*&locale=${locale}`, params),
  };
};

export const banner = (locale = "vi") => {
  return {
    get: async (params?: Record<string, any>) =>
      await get<any>(`banners?populate=*&locale=${locale}`, params),
  };
};

export const chats = (token?: string) => {
  const headers = { Authorization: `Bearer ${token}` } 
  return {
    get: async (params?: Record<string, any>) =>
      await get<any>(`users/me?populate=*`, params, headers),
  };
};
