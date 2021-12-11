import { constants } from '../constants';
import { absoluteUri, apiClientInstance } from './apiHelper';
import { VersionResponse } from './responses';

/**
 * API のバージョン情報を取得します。
 * @returns バージョン情報
 */
export const apiVersion = async () => {
  const client = apiClientInstance(true);
  const response = await client.get<VersionResponse>(absoluteUri(constants.url.version));
  return response.data;
};
