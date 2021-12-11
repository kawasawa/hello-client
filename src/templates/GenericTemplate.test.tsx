import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GenericTemplate from './GenericTemplate';

import * as ReactRedux from 'react-redux';

jest.mock('../components/Copyright', () => {
  return () => <div data-testid="copyright"></div>;
});

describe('ページの処理', () => {
  let spy_useSelector: jest.SpyInstance;

  beforeEach(() => {
    spy_useSelector = jest.spyOn(ReactRedux, 'useSelector');
  });

  afterEach(() => {
    spy_useSelector.mockClear();
  });

  it('正常系: 初期表示', () => {
    const pageTitle = 'TEST_title';
    const user = { name: 'TEST_name', email: 'test@example.com', verified: true };
    spy_useSelector.mockReturnValue({ user });

    render(
      <BrowserRouter>
        <GenericTemplate title={pageTitle}>
          <div data-testid="children"></div>
        </GenericTemplate>
      </BrowserRouter>
    );

    expect(screen.getByTestId('title')).not.toBeVisible();
    expect(screen.getByTestId('hamburger-button')).toBeVisible();
    expect(screen.getByTestId('close-drawer-button')).toBeVisible();
    expect(screen.getByTestId('account-button')).toBeVisible();
    expect(screen.queryByTestId('account-popup')).toBe(null);
    expect(screen.queryByTestId('user-name')).toBe(null);
    expect(screen.queryByTestId('user-email')).toBe(null);
    expect(screen.getByTestId('drawer')).toBeVisible();
    expect(screen.getByTestId('menu-item')).toBeVisible();
    expect(screen.getByTestId('page-title')).toBeVisible();
    expect(screen.getByTestId('children')).toBeVisible();
    expect(screen.getByTestId('copyright')).toBeVisible();
    expect(screen.getByTestId('page-title')).toHaveTextContent(pageTitle);
  });

  it('正常系: ドロワーオープン', async () => {
    const pageTitle = 'TEST_title';
    const user = { name: 'TEST_name', email: 'test@example.com', verified: true };
    spy_useSelector.mockReturnValue({ user });

    render(
      <BrowserRouter>
        <GenericTemplate title={pageTitle}>
          <div data-testid="children"></div>
        </GenericTemplate>
      </BrowserRouter>
    );

    userEvent.click(screen.getByTestId('hamburger-button'));
    await waitFor(() => expect(screen.getByTestId('hamburger-button')).not.toBeVisible());

    userEvent.click(screen.getByTestId('close-drawer-button'));
    await waitFor(() => expect(screen.getByTestId('hamburger-button')).toBeVisible());
  });

  it('正常系: アカウント情報表示', async () => {
    const pageTitle = 'TEST_title';
    const user = { name: 'TEST_name', email: 'test@example.com', verified: true };
    spy_useSelector.mockReturnValue({ user });

    render(
      <BrowserRouter>
        <GenericTemplate title={pageTitle}>
          <div data-testid="children"></div>
        </GenericTemplate>
      </BrowserRouter>
    );

    userEvent.click(screen.getByTestId('account-button'));
    await waitFor(() => expect(screen.getByTestId('account-popup')).toBeVisible());
    await waitFor(() => expect(screen.getByTestId('user-verified-icon')).toBeVisible());
    await waitFor(() => expect(screen.queryByTestId('user-unverified-icon')).toBe(null));
    await waitFor(() => expect(screen.getByTestId('user-name')).toBeVisible());
    await waitFor(() => expect(screen.getByTestId('user-email')).toBeVisible());
    expect(screen.getByTestId('user-name')).toHaveTextContent(user.name);
    expect(screen.getByTestId('user-email')).toHaveTextContent(user.email);
  });

  it('正常系: アカウント情報表示 (未認証)', async () => {
    const pageTitle = 'TEST_title';
    const user = { name: 'TEST_name', email: 'test@example.com', verified: false };
    spy_useSelector.mockReturnValue({ user });

    render(
      <BrowserRouter>
        <GenericTemplate title={pageTitle}>
          <div data-testid="children"></div>
        </GenericTemplate>
      </BrowserRouter>
    );

    userEvent.click(screen.getByTestId('account-button'));
    await waitFor(() => expect(screen.getByTestId('account-popup')).toBeVisible());
    await waitFor(() => expect(screen.queryByTestId('user-verified-icon')).toBe(null));
    await waitFor(() => expect(screen.getByTestId('user-unverified-icon')).toBeVisible());
    await waitFor(() => expect(screen.getByTestId('user-name')).toBeVisible());
    await waitFor(() => expect(screen.getByTestId('user-email')).toBeVisible());
    expect(screen.getByTestId('user-name')).toHaveTextContent(user.name);
    expect(screen.getByTestId('user-email')).toHaveTextContent(user.email);
  });
});
