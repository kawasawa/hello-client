import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import Loading from './Loading';

describe('ページの処理', () => {
  it('正常系: 初期表示', () => {
    render(<Loading />);
    expect(screen.getByTestId('progress')).toBeVisible();
  });
});
