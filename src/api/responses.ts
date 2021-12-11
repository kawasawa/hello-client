import { User } from './models';

/**
 * レスポンスの既定型を表します。
 */
export type Response = {
  success: boolean;
};

/**
 * バージョン情報のレスポンスを表します。
 */
export type VersionResponse = Response & {
  name: string;
  version: string;
  isProd: boolean;
};

/**
 * 認証トークンのレスポンスを表します。
 */
export type TokenResponse = Response & {
  token: string;
};

/**
 * ユーザ情報のレスポンスを表します。
 */
export type UserResponse = Response & {
  user: User;
};
