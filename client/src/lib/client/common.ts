import axios, { ResponseType } from "axios";
import axiosRetry from 'axios-retry';

const defaltHeaders = {
  "Content-Type": "application/json",
};


const client = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: defaltHeaders,
  timeout: 5000,
});

axiosRetry(client, { retries: 5 })

const get = async <T>(
  path: string,
  params: Record<string, any> = {},
  headers: Record<string, string> = {},
  responseType: ResponseType = "json"
): Promise<T> => {
  try {
    const resp = await client.get<T>(path, { params, headers, responseType });
    return resp.data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

const post = async <T>(
  path: string,
  params: Record<string, any> = {},
  data: string | Record<string, any> = {},
  headers: Record<string, string> = {}
): Promise<T> => {
  try {
    if (typeof data === "string") {
      data = JSON.stringify(data);
      headers["content-type"] = "text/plain";
    }
    const resp = await client.post<T>(path, data, { headers, params });
    return resp.data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

const put = async <T>(
  path: string,
  params: Record<string, any> = {},
  data: Record<string, any> = {},
  headers: Record<string, string> = {}
): Promise<T> => {
  try {
    const resp = await client.put<T>(path, data, { headers, params });
    return resp.data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export { get, post, put };
