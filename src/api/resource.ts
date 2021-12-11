import { absoluteUri, apiClientInstance } from './apiHelper';
import { Response } from './responses';

/**
 * データを取得します。
 * @param uri URI
 * @returns レスポンスデータ
 */
export const read = async <T extends Response>(uri: string) => {
  const client = apiClientInstance();
  const response = await client.get<T>(absoluteUri(uri));
  return response.data;
};

/**
 * データを作成します。
 * @param uri URI
 * @param data リクエストデータ
 * @returns レスポンスデータ
 */
/* eslint-disable-next-line */
export const create = async <T extends Response>(uri: string, data?: any) => {
  const client = apiClientInstance();
  const response = await client.post<T>(absoluteUri(uri), data);
  return response.data;
};

/**
 * データを更新します。
 * @param uri URI
 * @param data リクエストデータ
 * @returns レスポンスデータ
 */
/* eslint-disable-next-line */
export const update = async <T extends Response>(uri: string, data?: any) => {
  const client = apiClientInstance();
  const response = await client.patch<T>(absoluteUri(uri), data);
  return response.data;
};
