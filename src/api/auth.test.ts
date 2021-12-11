import { identify, refresh, resetPassword, signin, signout, signup, withdraw } from './auth';

import * as ApiHelper from './apiHelper';

let spy_absoluteUri: jest.SpyInstance;
let spy_apiClientInstance: jest.SpyInstance;
let spy_setAccessToken: jest.SpyInstance;
let spy_clearAccessToken: jest.SpyInstance;

beforeEach(() => {
  spy_absoluteUri = jest.spyOn(ApiHelper, 'absoluteUri');
  spy_apiClientInstance = jest.spyOn(ApiHelper, 'apiClientInstance');
  spy_setAccessToken = jest.spyOn(ApiHelper, 'setAccessToken');
  spy_clearAccessToken = jest.spyOn(ApiHelper, 'clearAccessToken');
});

afterEach(() => {
  spy_absoluteUri.mockClear();
  spy_apiClientInstance.mockClear();
  spy_setAccessToken.mockClear();
  spy_clearAccessToken.mockClear();
});

describe('サインアップ', () => {
  it('正常系', async () => {
    const dummyData = { success: true };
    const mock_post = jest.fn().mockReturnValue({ data: dummyData });
    spy_apiClientInstance.mockReturnValue({ post: mock_post });
    spy_absoluteUri.mockReturnValue('');

    const data = await signup('TEST_name', 'test@example.com', 'TEST_password');
    expect(spy_absoluteUri.mock.calls.length).toBe(1);
    expect(spy_apiClientInstance.mock.calls.length).toBe(1);
    expect(mock_post.mock.calls.length).toBe(1);
    expect(data).toBe(dummyData);
  });
});

describe('サインイン', () => {
  it('正常系', async () => {
    const dummyData = { success: true, token: 'TEST_token' };
    const mock_post = jest.fn().mockReturnValue({ data: dummyData });
    spy_apiClientInstance.mockReturnValue({ post: mock_post });
    spy_absoluteUri.mockReturnValue('');
    spy_setAccessToken.mockImplementation(() => {});

    const data = await signin('test@example.com', 'TEST_password');
    expect(spy_absoluteUri.mock.calls.length).toBe(1);
    expect(spy_apiClientInstance.mock.calls.length).toBe(1);
    expect(mock_post.mock.calls.length).toBe(1);
    expect(spy_setAccessToken.mock.calls.length).toBe(1);
    expect(spy_setAccessToken).toBeCalledWith(dummyData.token);
    expect(data).toBe(dummyData);
  });

  it('異常系', async () => {
    const dummyData = { success: false, token: 'TEST_token' };
    const mock_post = jest.fn().mockReturnValue({ data: dummyData });
    spy_apiClientInstance.mockReturnValue({ post: mock_post });
    spy_absoluteUri.mockReturnValue('');
    spy_setAccessToken.mockImplementation(() => {});

    const data = await signin('test@example.com', 'TEST_password');
    expect(spy_absoluteUri.mock.calls.length).toBe(1);
    expect(spy_apiClientInstance.mock.calls.length).toBe(1);
    expect(mock_post.mock.calls.length).toBe(1);
    expect(spy_setAccessToken.mock.calls.length).toBe(0);
    expect(data).toBe(dummyData);
  });
});

describe('サインアウト', () => {
  it('正常系', async () => {
    const dummyData = { success: true };
    const mock_post = jest.fn().mockReturnValue({ data: dummyData });
    spy_apiClientInstance.mockReturnValue({ post: mock_post });
    spy_absoluteUri.mockReturnValue('');
    spy_clearAccessToken.mockImplementation(() => {});

    const data = await signout();
    expect(spy_absoluteUri.mock.calls.length).toBe(1);
    expect(spy_apiClientInstance.mock.calls.length).toBe(1);
    expect(mock_post.mock.calls.length).toBe(1);
    expect(spy_clearAccessToken.mock.calls.length).toBe(1);
    expect(data).toBe(dummyData);
  });
});

describe('退会', () => {
  it('正常系', async () => {
    const dummyData = { success: true };
    const mock_delete = jest.fn().mockReturnValue({ data: dummyData });
    spy_apiClientInstance.mockReturnValue({ delete: mock_delete });
    spy_absoluteUri.mockReturnValue('');
    spy_clearAccessToken.mockImplementation(() => {});

    const data = await withdraw('TEST_password');
    expect(spy_absoluteUri.mock.calls.length).toBe(1);
    expect(spy_apiClientInstance.mock.calls.length).toBe(1);
    expect(mock_delete.mock.calls.length).toBe(1);
    expect(spy_clearAccessToken.mock.calls.length).toBe(1);
    expect(data).toBe(dummyData);
  });

  it('異常系', async () => {
    const dummyData = { success: false };
    const mock_delete = jest.fn().mockReturnValue({ data: dummyData });
    spy_apiClientInstance.mockReturnValue({ delete: mock_delete });
    spy_absoluteUri.mockReturnValue('');
    spy_clearAccessToken.mockImplementation(() => {});

    const data = await withdraw('TEST_password');
    expect(spy_absoluteUri.mock.calls.length).toBe(1);
    expect(spy_apiClientInstance.mock.calls.length).toBe(1);
    expect(mock_delete.mock.calls.length).toBe(1);
    expect(spy_clearAccessToken.mock.calls.length).toBe(0);
    expect(data).toBe(dummyData);
  });
});

describe('本人確認メールの送信', () => {
  it('正常系', async () => {
    const dummyData = { success: true };
    const mock_post = jest.fn().mockReturnValue({ data: dummyData });
    spy_apiClientInstance.mockReturnValue({ post: mock_post });
    spy_absoluteUri.mockReturnValue('');

    const data = await identify();
    expect(spy_absoluteUri.mock.calls.length).toBe(1);
    expect(spy_apiClientInstance.mock.calls.length).toBe(1);
    expect(mock_post.mock.calls.length).toBe(1);
    expect(data).toBe(dummyData);
  });
});

describe('パスワード再設定リンクの送信', () => {
  it('正常系', async () => {
    const dummyData = { success: true };
    const mock_post = jest.fn().mockReturnValue({ data: dummyData });
    spy_apiClientInstance.mockReturnValue({ post: mock_post });
    spy_absoluteUri.mockReturnValue('');

    const data = await resetPassword('test@example.com');
    expect(spy_absoluteUri.mock.calls.length).toBe(1);
    expect(spy_apiClientInstance.mock.calls.length).toBe(1);
    expect(mock_post.mock.calls.length).toBe(1);
    expect(data).toBe(dummyData);
  });
});

describe('認証トークンの再生成', () => {
  it('正常系', async () => {
    const dummyData = { success: true, token: 'TEST_token' };
    const mock_get = jest.fn().mockReturnValue({ data: dummyData });
    spy_apiClientInstance.mockReturnValue({ get: mock_get });
    spy_absoluteUri.mockReturnValue('');
    spy_setAccessToken.mockImplementation(() => {});

    const data = await refresh();
    expect(mock_get.mock.calls.length).toBe(1);
    expect(spy_setAccessToken.mock.calls.length).toBe(1);
    expect(spy_setAccessToken).toBeCalledWith(dummyData.token);
    expect(data).toBe(dummyData);
  });

  it('異常系', async () => {
    const dummyData = { success: false, token: 'TEST_token' };
    const mock_get = jest.fn().mockReturnValue({ data: dummyData });
    spy_apiClientInstance.mockReturnValue({ get: mock_get });
    spy_absoluteUri.mockReturnValue('');
    spy_setAccessToken.mockImplementation(() => {});

    await expect(refresh()).rejects.toThrow();
  });
});
