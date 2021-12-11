import axios from 'axios';

import { constants } from '../constants';
import {
  absoluteUri,
  apiClientInstance,
  clearAccessToken,
  initilizeApiClient,
  invokeAxios,
  setAccessToken,
} from './apiHelper';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    defaults: {
      withCredentials: true,
      headers: { common: [] },
    },
    create: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

let spy_create: jest.SpyInstance;
let spy_get: jest.SpyInstance;
let spy_post: jest.SpyInstance;
let spy_patch: jest.SpyInstance;
let spy_delete: jest.SpyInstance;

beforeEach(() => {
  spy_create = jest.spyOn(axios, 'create');
  spy_get = jest.spyOn(axios, 'get');
  spy_post = jest.spyOn(axios, 'post');
  spy_patch = jest.spyOn(axios, 'patch');
  spy_delete = jest.spyOn(axios, 'delete');
  axios.defaults.headers.common[constants.value.authHeader] = undefined;
});

afterEach(() => {
  spy_create.mockClear();
  spy_get.mockClear();
  spy_post.mockClear();
  spy_patch.mockClear();
  spy_delete.mockClear();
});

describe('API クライアントの初期化', () => {
  it('正常系', () => {
    axios.defaults.withCredentials = false;

    initilizeApiClient();
    expect(axios.defaults.withCredentials).toBe(true);
  });
});

describe('API クライアントのインスタンス取得', () => {
  it('正常系', () => {
    const use = jest.fn();
    const dummyClient = { interceptors: { response: { use } } };
    spy_create.mockReturnValue(dummyClient);

    const client = apiClientInstance();
    expect(spy_create.mock.calls.length).toBe(1);
    expect(use.mock.calls.length).toBe(1);
    expect(client).toBe(dummyClient);
  });

  it('正常系: 明示的なリトライの設定', () => {
    const use = jest.fn();
    const dummyClient = { interceptors: { response: { use } } };
    spy_create.mockReturnValue(dummyClient);

    const client = apiClientInstance(false);
    expect(spy_create.mock.calls.length).toBe(1);
    expect(use.mock.calls.length).toBe(1);
    expect(client).toBe(dummyClient);
  });

  it('正常系: 明示的なリトライの解除', () => {
    const use = jest.fn();
    const dummyClient = { interceptors: { response: { use } } };
    spy_create.mockReturnValue(dummyClient);

    const client = apiClientInstance(true);
    expect(spy_create.mock.calls.length).toBe(1);
    expect(use.mock.calls.length).toBe(0);
    expect(client).toBe(dummyClient);
  });
});

describe('axios の呼び出し', () => {
  it('正常系: GET', async () => {
    const dummyResponse = { data: {} };
    spy_get.mockReturnValue(dummyResponse);

    const response = await invokeAxios('GET', 'example.com');
    expect(spy_get.mock.calls.length).toBe(1);
    expect(response).toBe(dummyResponse);
  });

  it('正常系: get', async () => {
    const dummyResponse = { data: {} };
    spy_get.mockReturnValue(dummyResponse);

    const response = await invokeAxios('get', 'example.com');
    expect(spy_get.mock.calls.length).toBe(1);
    expect(response).toBe(dummyResponse);
  });

  it('正常系: POST', async () => {
    const dummyResponse = { data: {} };
    spy_post.mockReturnValue(dummyResponse);

    const response = await invokeAxios('POST', 'example.com');
    expect(spy_post.mock.calls.length).toBe(1);
    expect(response).toBe(dummyResponse);
  });

  it('正常系: post', async () => {
    const dummyResponse = { data: {} };
    spy_post.mockReturnValue(dummyResponse);

    const response = await invokeAxios('post', 'example.com');
    expect(spy_post.mock.calls.length).toBe(1);
    expect(response).toBe(dummyResponse);
  });

  it('正常系: PATCH', async () => {
    const dummyResponse = { data: {} };
    spy_patch.mockReturnValue(dummyResponse);

    const response = await invokeAxios('PATCH', 'example.com');
    expect(spy_patch.mock.calls.length).toBe(1);
    expect(response).toBe(dummyResponse);
  });

  it('正常系: patch', async () => {
    const dummyResponse = { data: {} };
    spy_patch.mockReturnValue(dummyResponse);

    const response = await invokeAxios('patch', 'example.com');
    expect(spy_patch.mock.calls.length).toBe(1);
    expect(response).toBe(dummyResponse);
  });

  it('正常系: DELETE', async () => {
    const dummyResponse = { data: {} };
    spy_delete.mockReturnValue(dummyResponse);

    const response = await invokeAxios('DELETE', 'example.com');
    expect(spy_delete.mock.calls.length).toBe(1);
    expect(response).toBe(dummyResponse);
  });

  it('正常系: delete', async () => {
    const dummyResponse = { data: {} };
    spy_delete.mockReturnValue(dummyResponse);

    const response = await invokeAxios('delete', 'example.com');
    expect(spy_delete.mock.calls.length).toBe(1);
    expect(response).toBe(dummyResponse);
  });

  it('異常系', async () => {
    expect(() => invokeAxios('OPTIONS', 'example.com')).toThrow();
  });
});

describe('絶対 URI への変換', () => {
  it('正常系', () => {
    const relativeUri = 'example.com';
    const uri = absoluteUri(relativeUri);
    expect(uri).toBe(`${process.env.REACT_APP_API_URL}/${relativeUri}`);
  });

  it('正常系: スラッシュ付き', () => {
    const relativeUri = '/example.com';
    const uri = absoluteUri(relativeUri);
    expect(uri).toBe(`${process.env.REACT_APP_API_URL}${relativeUri}`);
  });
});

describe('認証トークンの設定', () => {
  it('正常系', () => {
    const dummyToken = 'TEST_token';
    setAccessToken(dummyToken);
    expect(axios.defaults.headers.common[constants.value.authHeader]).toBe(dummyToken);
  });
});

describe('認証トークンの削除', () => {
  it('正常系', () => {
    axios.defaults.headers.common[constants.value.authHeader] = 'TEST_token';
    clearAccessToken();
    expect(axios.defaults.headers.common[constants.value.authHeader]).toBe(null);
  });
});
