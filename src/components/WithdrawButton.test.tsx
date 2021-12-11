import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import WithdrawButton from './WithdrawButton';

import * as ReactRedux from 'react-redux';
import * as Auth from '../api/auth';
import * as Errors from '../errors';

describe('コンポーネントの処理', () => {
  let spy_useDispatch: jest.SpyInstance;
  let spy_withdraw: jest.SpyInstance;
  let spy_handleError: jest.SpyInstance;

  beforeEach(() => {
    spy_useDispatch = jest.spyOn(ReactRedux, 'useDispatch');
    spy_withdraw = jest.spyOn(Auth, 'withdraw');
    spy_handleError = jest.spyOn(Errors, 'handleError');
  });

  afterEach(() => {
    spy_useDispatch.mockClear();
    spy_withdraw.mockClear();
    spy_handleError.mockClear();
  });

  it('正常系: 初期表示', async () => {
    spy_useDispatch.mockReturnValue(() => jest.fn());

    render(<WithdrawButton />);
    expect(screen.getByTestId('button')).toBeVisible();
    expect(screen.queryByTestId('dialog')).toBe(null);
    expect(spy_useDispatch.mock.calls.length).toBe(1);
  });

  it('正常系: ダイアログ表示', async () => {
    spy_useDispatch.mockReturnValue(() => jest.fn());

    render(<WithdrawButton />);
    spy_useDispatch.mockClear();

    userEvent.click(screen.getByTestId('button'));
    expect(screen.getByTestId('dialog')).toBeVisible();
    expect(screen.getByTestId('password')).toBeVisible();
    expect(screen.getByTestId('cancel-button')).toBeVisible();
    expect(screen.getByTestId('submit-button')).toBeVisible();
    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
    expect(spy_useDispatch.mock.calls.length).toBe(1);
  });

  it('正常系: 退会ボタンの活性化', async () => {
    spy_useDispatch.mockReturnValue(() => jest.fn());

    render(<WithdrawButton />);
    userEvent.click(screen.getByTestId('button'));

    const password = 'TEST_password';
    userEvent.type(screen.getByTestId('password'), password);
    await waitFor(() => expect((screen.getByTestId('password') as HTMLInputElement).value).toBe(password));
    expect(screen.getByTestId('submit-button')).toBeEnabled();
  });

  it('正常系: 処理実行', async () => {
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_withdraw.mockReturnValue(Promise.resolve());
    spy_handleError.mockImplementation();

    render(<WithdrawButton />);
    userEvent.click(screen.getByTestId('button'));

    userEvent.type(screen.getByTestId('password'), 'TEST_password');
    await waitFor(() => expect(screen.getByTestId('submit-button')).toBeEnabled());
    userEvent.click(screen.getByTestId('submit-button'));
    await waitFor(() => expect(spy_withdraw.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(0);
  });

  it('正常系: 処理キャンセル', async () => {
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_withdraw.mockReturnValue(Promise.resolve());

    render(<WithdrawButton />);
    userEvent.click(screen.getByTestId('button'));

    userEvent.click(screen.getByTestId('cancel-button'));
    expect(spy_withdraw.mock.calls.length).toBe(0);
    expect(spy_handleError.mock.calls.length).toBe(0);
  });

  it('異常系: 処理エラー(ユーザ情報の取得に失敗)', async () => {
    spy_useDispatch.mockReturnValue(() => jest.fn());
    spy_withdraw.mockImplementation(() => {
      throw new Error();
    });
    spy_handleError.mockImplementation();

    render(<WithdrawButton />);
    userEvent.click(screen.getByTestId('button'));

    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
    userEvent.type(screen.getByTestId('password'), 'TEST_password');
    await waitFor(() => expect(screen.getByTestId('submit-button')).toBeEnabled());
    userEvent.click(screen.getByTestId('submit-button'));
    await waitFor(() => expect(spy_withdraw.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(1);
  });
});
