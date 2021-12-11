import '@testing-library/jest-dom';

import { Redirect, Route } from 'react-router-dom';

import routes, { getRoute, SignedRoute, UnsignedRoute, VerifiedRoute } from './routes';

import * as ReactRedux from 'react-redux';

describe('getRoute', () => {
  it('正常系', () => {
    const route = routes[0];
    const result = getRoute(route.id);
    expect(result).toBe(route);
  });

  it('異常系', () => {
    expect(() => getRoute('TEST_unreachable' as unknown as any)).toThrow();
  });
});

describe('UnsignedRoute', () => {
  let spy_useSelector: jest.SpyInstance;

  beforeEach(() => {
    spy_useSelector = jest.spyOn(ReactRedux, 'useSelector');
  });

  afterEach(() => {
    spy_useSelector.mockClear();
  });

  it('正常系', () => {
    spy_useSelector.mockReturnValue(true);
    const result = UnsignedRoute({} as unknown as any);
    expect(result).toEqual(<Redirect to={getRoute('home').path} />);
  });

  it('異常系', () => {
    spy_useSelector.mockReturnValue(false);
    const result = UnsignedRoute({} as unknown as any);
    expect(result).toEqual(<Route />);
  });
});

describe('SignedRoute', () => {
  let spy_useSelector: jest.SpyInstance;

  beforeEach(() => {
    spy_useSelector = jest.spyOn(ReactRedux, 'useSelector');
  });

  afterEach(() => {
    spy_useSelector.mockClear();
  });

  it('正常系', () => {
    spy_useSelector.mockReturnValue(false);
    const result = SignedRoute({} as unknown as any);
    expect(result).toEqual(<Redirect to={getRoute('signin').path} />);
  });

  it('異常系', () => {
    spy_useSelector.mockReturnValue(true);
    const result = SignedRoute({} as unknown as any);
    expect(result).toEqual(<Route />);
  });
});

describe('VerifiedRoute', () => {
  let spy_useSelector: jest.SpyInstance;

  beforeEach(() => {
    spy_useSelector = jest.spyOn(ReactRedux, 'useSelector');
  });

  afterEach(() => {
    spy_useSelector.mockClear();
  });

  it('正常系', () => {
    spy_useSelector.mockReturnValue(false);
    const result = VerifiedRoute({} as unknown as any);
    expect(result).toEqual(<Redirect to={getRoute('account').path} />);
  });

  it('異常系', () => {
    spy_useSelector.mockReturnValue(true);
    const result = VerifiedRoute({} as unknown as any);
    expect(result).toEqual(<Route />);
  });
});
