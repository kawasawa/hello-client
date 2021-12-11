import axios, { AxiosError, AxiosResponse, Method } from 'axios';

import { constants } from '../constants';
import { refresh } from './auth';

/**
 * API クライアントの設定を初期化します。
 */
export const initilizeApiClient = () => {
  axios.defaults.withCredentials = true;
};

/**
 * API クライアントのインスタンスを取得します。
 * @param once 実行は一度きりで、リトライしないことを表します。
 * @returns API クライアント
 */
export const apiClientInstance = <T>(once?: boolean) => {
  const client = axios.create();
  if (once) return client;

  let isRetry = false;
  client.interceptors.response.use(
    (value: AxiosResponse<T>) => value,
    async (error: AxiosError) => {
      // レスポンスとリトライ状況の確認
      if (error.response?.status !== 401 || isRetry) {
        console.error(error);
        return Promise.reject(error);
      }
      isRetry = true;

      // トークンのリフレッシュ
      await refresh();

      // リクエストの再試行
      const method = error.config.method;
      const url = error.config.url;
      const data = error.config.data != undefined ? JSON.parse(error.config.data) : undefined;
      /* eslint-disable-next-line */
      return invokeAxios<T>(method!, url!, data);
    }
  );
  return client;
};

/**
 * HTTP メソッドと URL を指定して、直接 Axios のメソッドを呼び出します。
 * @param method HTTP メソッド
 * @param url URL
 * @param data リクエストデータ
 * @returns レスポンス
 */
/* eslint-disable-next-line */
export const invokeAxios = <T>(method: Method, url: string, data?: any) => {
  switch (method) {
    case 'GET':
    case 'get':
      return axios.get<T>(url);
    case 'POST':
    case 'post':
      return axios.post<T>(url, data);
    case 'PATCH':
    case 'patch':
      return axios.patch<T>(url, data);
    case 'DELETE':
    case 'delete':
      return axios.delete<T>(url, { data });
    default:
      throw new Error(`Not implemented retry method: method=${method}`);
  }
};

/**
 * 相対 URI から絶対 URI を取得します。
 * @param relativeUri 相対 URI
 * @returns 絶対 URI
 */
export const absoluteUri = (relativeUri: string) =>
  `${process.env.REACT_APP_API_URL}${relativeUri.startsWith('/') ? relativeUri : `/${relativeUri}`}`;

/**
 * 既定のリクエストヘッダーに認証トークンを設定します。
 * @param accessToken 認証トークン
 */
export const setAccessToken = (accessToken: string) => {
  axios.defaults.headers.common[constants.value.authHeader] = accessToken;
};

/**
 * 既定のリクエストヘッダーに設定された認証トークンを削除します。
 */
export const clearAccessToken = () => {
  axios.defaults.headers.common[constants.value.authHeader] = null;
};
