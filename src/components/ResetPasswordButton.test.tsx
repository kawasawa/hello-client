import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ResetPasswordButton from './ResetPasswordButton';

import * as ReactRedux from 'react-redux';
import * as Auth from '../api/auth';
import * as Errors from '../errors';

describe('コンポーネントの処理', () => {
  let spy_useSelector: jest.SpyInstance;
  let spy_resetPassword: jest.SpyInstance;
  let spy_handleError: jest.SpyInstance;

  beforeEach(() => {
    spy_useSelector = jest.spyOn(ReactRedux, 'useSelector');
    spy_resetPassword = jest.spyOn(Auth, 'resetPassword');
    spy_handleError = jest.spyOn(Errors, 'handleError');
  });

  afterEach(() => {
    spy_useSelector.mockClear();
    spy_resetPassword.mockClear();
    spy_handleError.mockClear();
  });

  it('正常系: 初期表示', () => {
    spy_useSelector.mockReturnValue({ user: { email: 'test@example.com' } });

    render(<ResetPasswordButton />);
    expect(screen.getByTestId('button')).toBeVisible();
    expect(screen.queryByTestId('dialog')).toBe(null);
    expect(spy_useSelector.mock.calls.length).toBe(1);
  });

  it('正常系: ダイアログ表示', () => {
    spy_useSelector.mockReturnValue({ user: { email: 'test@example.com' } });

    render(<ResetPasswordButton />);
    spy_useSelector.mockClear();

    userEvent.click(screen.getByTestId('button'));
    expect(screen.getByTestId('dialog')).toBeVisible();
    expect(screen.getByTestId('cancel-button')).toBeVisible();
    expect(screen.getByTestId('submit-button')).toBeVisible();
    expect(spy_useSelector.mock.calls.length).toBe(1);
  });

  it('正常系: 処理実行', () => {
    spy_useSelector.mockReturnValue({ user: { email: 'test@example.com' } });
    spy_resetPassword.mockReturnValue(Promise.resolve());
    spy_handleError.mockImplementation();

    render(<ResetPasswordButton />);
    userEvent.click(screen.getByTestId('button'));

    userEvent.click(screen.getByTestId('submit-button'));
    expect(spy_resetPassword.mock.calls.length).toBe(1);
    expect(spy_handleError.mock.calls.length).toBe(0);
  });

  it('正常系: 処理キャンセル', () => {
    spy_useSelector.mockReturnValue({});
    spy_resetPassword.mockReturnValue(Promise.resolve());
    spy_handleError.mockImplementation();

    render(<ResetPasswordButton />);
    userEvent.click(screen.getByTestId('button'));

    userEvent.click(screen.getByTestId('cancel-button'));
    expect(spy_resetPassword.mock.calls.length).toBe(0);
    expect(spy_handleError.mock.calls.length).toBe(0);
  });

  it('異常系: 処理エラー(ユーザ情報の取得に失敗)', () => {
    spy_useSelector.mockReturnValue({});
    spy_resetPassword.mockReturnValue(Promise.resolve());
    spy_handleError.mockImplementation();

    render(<ResetPasswordButton />);
    userEvent.click(screen.getByTestId('button'));

    userEvent.click(screen.getByTestId('submit-button'));
    expect(spy_resetPassword.mock.calls.length).toBe(0);
    expect(spy_handleError.mock.calls.length).toBe(1);
  });
});
