import debug from 'debug';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const log = {
  error: debug('go:http:error'),
  request: debug('go:http:request'),
  response: debug('go:http:response'),
};

export type HttpInstance = AxiosInstance & {
  setAccessToken: (token: string) => void;
  setAuthHeader: (token: string) => void;
  clearAuthHeader: () => void;
};

export default function create(opts: any = {}): HttpInstance {
  const http: any = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {},
    ...opts,
  }) as HttpInstance;

  http.accessToken = null;
  http.setAccessToken = (token: string) => {
    http.accessToken = token;
  };

  http.setAuthHeader = (token: string) => {
    http.defaults.headers.Authorization = `Bearer ${token}`;
  };
  http.clearAuthHeader = () => {
    http.defaults.headers.Authorization = null;
  };

  // Add logging interceptors to axios
  http.interceptors.request.use((reqConfig: AxiosRequestConfig) => {
    log.request(
      `${reqConfig.method && reqConfig.method.toUpperCase()} ${reqConfig.url}`,
      reqConfig.params,
      reqConfig.data
    );

    return reqConfig;
  });

  http.interceptors.response.use(
    (response: AxiosResponse) => {
      log.response(
        `${response.status} ${response.config.method && response.config.method.toUpperCase()} ${response.config.url}`,
        response.data
      );

      return response;
    },
    (error: AxiosError) => {
      if (error.config) {
        log.error(
          `${error.response && error.response.status} ${error.config.method && error.config.method.toUpperCase()} ${
            error.config.url
          }`
        );
      } else {
        log.error(`${error.name}: ${error.message}`);
      }
      throw error;
    }
  );

  return http;
}
