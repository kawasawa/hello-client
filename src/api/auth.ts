import { constants } from '../constants';
import { absoluteUri, apiClientInstance, clearAccessToken, setAccessToken } from './apiHelper';
import { Response, TokenResponse, UserResponse } from './responses';

/**
 * サインアップします。
 * @param name ユーザ名
 * @param email メールアドレス
 * @param password パスワード
 * @returns レスポンスデータ
 */
export const signup = async (name: string, email: string, password: string) => {
  const client = apiClientInstance(true);
  const response = await client.post<UserResponse>(absoluteUri(constants.url.auth.signup), { name, email, password });
  return response.data;
};

/**
 * サインインします。
 * @param email メールアドレス
 * @param password パスワード
 * @returns レスポンスデータ
 */
export const signin = async (email: string, password: string) => {
  const client = apiClientInstance(true);
  const response = await client.post<TokenResponse & UserResponse>(absoluteUri(constants.url.auth.signin), {
    email,
    password,
  });
  if (response.data.success) setAccessToken(response.data.token);
  return response.data;
};

/**
 * サインアウトします。
 * @returns レスポンスデータ
 */
export const signout = async () => {
  const client = apiClientInstance();
  try {
    const response = await client.post<Response>(absoluteUri(constants.url.auth.signout));
    return response.data;
  } finally {
    clearAccessToken();
  }
};

/**
 * 退会します。
 * @param password パスワード
 * @returns レスポンスデータ
 */
export const withdraw = async (password: string) => {
  const client = apiClientInstance();
  const response = await client.delete<Response>(absoluteUri(constants.url.auth.withdraw), { data: { password } });
  if (response.data.success) clearAccessToken();
  return response.data;
};

/**
 * 本人確認メールを送信します。
 * @returns レスポンスデータ
 */
export const identify = async () => {
  const client = apiClientInstance();
  const response = await client.post<Response>(absoluteUri(constants.url.auth.identify));
  return response.data;
};

/**
 * パスワード再設定リンクを送信します。
 * @param email メールアドレス
 * @returns レスポンスデータ
 */
export const resetPassword = async (email: string) => {
  // サインイン前に実行されるルートがあるためリトライしない
  const client = apiClientInstance(true);
  const response = await client.post<Response>(absoluteUri(constants.url.auth.resetPassword), { email });
  return response.data;
};

/**
 * 認証トークンを再生成します。
 * @returns レスポンスデータ
 */
export const refresh = async () => {
  const client = apiClientInstance(true);
  const response = await client.get<TokenResponse>(absoluteUri(constants.url.auth.refresh));
  if (response?.data?.success !== true) throw new Error('Cannot refresh auth token');
  setAccessToken(response.data.token);
  return response.data;
};
