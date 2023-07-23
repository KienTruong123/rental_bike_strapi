import { TSignInBody } from "../../redux/reducers/auth";
import { get, post, put } from "./common";

export const signin = () => {
  return {
    post: async (body: TSignInBody, params?: Record<string, any>) =>
      await post<any>(`/auth/local`, params, body),
  };
};

export const bikes = () => {
  return {
    get: async (params?: Record<string, any>) =>
      await get<any>(`bikes?populate=*`, params),
  };
};

export const banner = () => {
  return {
    get: async (params?: Record<string, any>) =>
      await get<any>(`banners?populate=*`, params),
  };
};