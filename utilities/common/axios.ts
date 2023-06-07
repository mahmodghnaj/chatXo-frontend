import { store } from "@/store";
import { setAccessToken, setRefreshToken } from "@/store/features/auth";
import Axios, { AxiosResponse } from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const axios = Axios.create({ baseURL: API_BASE_URL, withCredentials: true });

axios.interceptors.request.use(
  (config) => {
    const token = store.getState().Auth.accessToken;
    const refresh = store.getState().Auth.refreshToken;
    if (config.url?.includes("info-session") && refresh) {
      // should send in cookie but don't use please write commit in line 37 in file _app
      config.headers.Authorization = `Bearer ${refresh}`;
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    const refreshToken = store.getState().Auth.refreshToken;
    const config = error.config;
    if (error?.response?.status == 401 && !config._retry && refreshToken) {
      config._retry = true;
      config.headers = {};
      const refresh = await refreshAccessToken(refreshToken);
      if (refresh.accessToken && refresh.refreshToken) {
        store.dispatch(setAccessToken(refresh.accessToken));
        store.dispatch(setRefreshToken(refresh.refreshToken));
        return axios(config);
      } else return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
export type Refresh = {
  accessToken: string;
  refreshToken: string;
};

const refreshAccessToken = async (refreshToken: string): Promise<Refresh> => {
  try {
    const res: AxiosResponse = await Axios.post(
      "/auth/refresh-token",
      {
        refreshToken: refreshToken,
      },
      {
        baseURL: API_BASE_URL,
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
export default axios;
