import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import { handleError } from './errors';

describe('handleError', () => {
  it('正常系: response.data.error', async () => {
    const err = { response: { data: { message: 'TEST_response.data.message' } }, message: 'TEST_message' };
    render(
      <>
        <button onClick={() => handleError(err)} data-testid="button" />
        <ToastContainer />
      </>
    );
    userEvent.click(screen.getByTestId('button'));
    await waitFor(() => expect(screen.getByText(err.response.data.message)).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(err.message)).toBe(null));
  });

  it('正常系: message', async () => {
    const err = { message: 'TEST_message' };
    render(
      <>
        <button onClick={() => handleError(err)} data-testid="button" />
        <ToastContainer />
      </>
    );
    userEvent.click(screen.getByTestId('button'));
    await waitFor(() => expect(screen.getByText(err.message)).toBeInTheDocument());
  });

  it('正常系: unknown', async () => {
    const err = {};
    render(
      <>
        <button onClick={() => handleError(err)} data-testid="button" />
        <ToastContainer />
      </>
    );
    userEvent.click(screen.getByTestId('button'));
    await waitFor(() => expect(screen.getByText('exception occurred.')).toBeInTheDocument());
  });

  it('正常系: null', async () => {
    render(
      <>
        <button onClick={() => handleError(null)} data-testid="button" />
        <ToastContainer />
      </>
    );
    userEvent.click(screen.getByTestId('button'));
    await waitFor(() => expect(screen.getByText('exception occurred.')).toBeInTheDocument());
  });
});
