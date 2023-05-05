import Axios, { AxiosResponse } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const axios = Axios.create({ baseURL: API_BASE_URL, withCredentials: true });
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    const config = error.config;
    if (error?.response?.status == 401 && !config._retry) {
      config._retry = true;
      config.headers = {};
      try {
        await refreshAccessToken().catch(() => {
          // location.reload();
        });
        return axios(config);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
const refreshAccessToken = async (): Promise<any> => {
  await Axios.get("/auth/refresh-token", {
    baseURL: API_BASE_URL,
    withCredentials: true,
  });
};

export default axios;
