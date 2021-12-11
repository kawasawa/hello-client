import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ResetPassword from './ResetPassword';
import { getRoute } from '../routes';

import * as Auth from '../api/auth';
import * as Errors from '../errors';

jest.mock('../templates/AuthTemplate', () => {
  return ({ children, title }: { children: React.ReactNode; title: string }) => (
    <>
      {title}
      {children}
    </>
  );
});

const mock_push = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({ push: mock_push }),
}));

describe('ページの処理', () => {
  let spy_resetPassword: jest.SpyInstance;
  let spy_handleError: jest.SpyInstance;

  beforeEach(() => {
    spy_resetPassword = jest.spyOn(Auth, 'resetPassword');
    spy_handleError = jest.spyOn(Errors, 'handleError');
  });

  afterEach(() => {
    spy_resetPassword.mockClear();
    spy_handleError.mockClear();
    mock_push.mockClear();
  });

  it('正常系: 初期表示', async () => {
    render(
      <BrowserRouter>
        <ResetPassword />
      </BrowserRouter>
    );
    expect(screen.getByTestId('email')).toBeVisible();
    expect(screen.getByTestId('submit-button')).toBeVisible();
    expect(screen.getByTestId('account-created-button')).toBeVisible();
    expect(screen.getByTestId('submit-button')).not.toBeEnabled();
  });

  it('正常系: パスワードの再設定', async () => {
    spy_resetPassword.mockReturnValue(Promise.resolve());
    spy_handleError.mockImplementation();

    render(
      <BrowserRouter>
        <ResetPassword />
      </BrowserRouter>
    );
    userEvent.type(screen.getByTestId('email'), 'test@example.com');
    await waitFor(() => expect(screen.getByTestId('submit-button')).toBeEnabled());
    userEvent.click(screen.getByTestId('submit-button'));
    await waitFor(() => expect(spy_resetPassword.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(0);
    expect(mock_push).toBeCalledWith(getRoute('home').path);
  });

  it('異常系: パスワードの再設定エラー', async () => {
    spy_resetPassword.mockImplementation(() => {
      throw new Error();
    });
    spy_handleError.mockImplementation();

    render(
      <BrowserRouter>
        <ResetPassword />
      </BrowserRouter>
    );
    userEvent.type(screen.getByTestId('email'), 'test@example.com');
    await waitFor(() => expect(screen.getByTestId('submit-button')).toBeEnabled());
    userEvent.click(screen.getByTestId('submit-button'));
    await waitFor(() => expect(spy_resetPassword.mock.calls.length).toBe(1));
    expect(spy_handleError.mock.calls.length).toBe(1);
  });
});
