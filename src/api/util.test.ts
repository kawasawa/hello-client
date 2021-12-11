import { apiVersion } from './util';

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

describe('API バージョン情報の取得', () => {
  it('正常系', async () => {
    const dummyData = { success: true };
    const mock_get = jest.fn().mockReturnValue({ data: dummyData });
    spy_apiClientInstance.mockReturnValue({ get: mock_get });
    spy_absoluteUri.mockReturnValue('');

    const data = await apiVersion();
    expect(spy_absoluteUri.mock.calls.length).toBe(1);
    expect(spy_apiClientInstance.mock.calls.length).toBe(1);
    expect(mock_get.mock.calls.length).toBe(1);
    expect(data).toBe(dummyData);
  });
});
