import { read, create, update } from './resource';

import * as ApiHelper from './apiHelper';

let spy_absoluteUri: jest.SpyInstance;
let spy_apiClientInstance: jest.SpyInstance;

beforeEach(() => {
  spy_absoluteUri = jest.spyOn(ApiHelper, 'absoluteUri');
  spy_apiClientInstance = jest.spyOn(ApiHelper, 'apiClientInstance');
});

afterEach(() => {
  spy_absoluteUri.mockClear();
  spy_apiClientInstance.mockClear();
});

describe('データの取得', () => {
  it('正常系', async () => {
    const dummyData = { success: true };
    const mock_get = jest.fn().mockReturnValue({ data: dummyData });
    spy_apiClientInstance.mockReturnValue({ get: mock_get });
    spy_absoluteUri.mockReturnValue('');

    const data = await read('example.com');
    expect(spy_absoluteUri.mock.calls.length).toBe(1);
    expect(spy_apiClientInstance.mock.calls.length).toBe(1);
    expect(mock_get.mock.calls.length).toBe(1);
    expect(data).toBe(dummyData);
  });
});

describe('データの作成', () => {
  it('正常系', async () => {
    const dummyData = { success: true };
    const mock_post = jest.fn().mockReturnValue({ data: dummyData });
    spy_apiClientInstance.mockReturnValue({ post: mock_post });
    spy_absoluteUri.mockReturnValue('');

    const data = await create('example.com');
    expect(spy_absoluteUri.mock.calls.length).toBe(1);
    expect(spy_apiClientInstance.mock.calls.length).toBe(1);
    expect(mock_post.mock.calls.length).toBe(1);
    expect(data).toBe(dummyData);
  });
});

describe('データの更新', () => {
  it('正常系', async () => {
    const dummyData = { success: true };
    const mock_patch = jest.fn().mockReturnValue({ data: dummyData });
    spy_apiClientInstance.mockReturnValue({ patch: mock_patch });
    spy_absoluteUri.mockReturnValue('');

    const data = await update('example.com');
    expect(spy_absoluteUri.mock.calls.length).toBe(1);
    expect(spy_apiClientInstance.mock.calls.length).toBe(1);
    expect(mock_patch.mock.calls.length).toBe(1);
    expect(data).toBe(dummyData);
  });
});
