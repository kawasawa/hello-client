import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Home from './Home';

import * as Resource from '../api/resource';
import * as Util from '../api/util';
import * as Errors from '../errors';

jest.mock('../templates/GenericTemplate', () => {
  return ({ children, title }: { children: React.ReactNode; title: string }) => (
    <>
      {title}
      {children}
    </>
  );
});

describe('ページの処理', () => {
  let spy_apiVersion: jest.SpyInstance;
  let spy_read: jest.SpyInstance;
  let spy_handleError: jest.SpyInstance;

  beforeEach(() => {
    spy_apiVersion = jest.spyOn(Util, 'apiVersion');
    spy_read = jest.spyOn(Resource, 'read');
    spy_handleError = jest.spyOn(Errors, 'handleError');
  });

  afterEach(() => {
    spy_apiVersion.mockClear();
    spy_read.mockClear();
    spy_handleError.mockClear();
  });

  it('正常系: 初期表示', async () => {
    render(<Home />);
    expect(screen.getByTestId('api-version-button')).toBeVisible();
    expect(screen.getByTestId('user-record-button')).toBeVisible();
  });

  it('正常系: API バージョン情報の取得', async () => {
    spy_apiVersion.mockReturnValue(Promise.resolve());
    spy_handleError.mockImplementation();

    render(<Home />);
    userEvent.click(screen.getByTestId('api-version-button'));
    await waitFor(() => expect(spy_apiVersion.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(0);
  });

  it('異常系: API バージョン情報の取得エラー', async () => {
    spy_apiVersion.mockImplementation(() => {
      throw new Error();
    });
    spy_handleError.mockImplementation();

    render(<Home />);
    userEvent.click(screen.getByTestId('api-version-button'));
    await waitFor(() => expect(spy_apiVersion.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(1);
  });

  it('正常系: ユーザ情報の取得', async () => {
    spy_read.mockReturnValue(Promise.resolve());
    spy_handleError.mockImplementation();

    render(<Home />);
    userEvent.click(screen.getByTestId('user-record-button'));
    await waitFor(() => expect(spy_read.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(0);
  });

  it('異常系: ユーザ情報の取得エラー', async () => {
    spy_read.mockImplementation(() => {
      throw new Error();
    });
    spy_handleError.mockImplementation();

    render(<Home />);
    userEvent.click(screen.getByTestId('user-record-button'));
    await waitFor(() => expect(spy_read.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(1);
  });
});
