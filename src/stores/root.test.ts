import { User } from '../api/models';
import { signedInSelector, verifiedSelector } from './root';

describe('signedInSelector', () => {
  it('正常系', () => {
    const state = { auth: { user: {} as unknown as User } };
    const result = signedInSelector(state);
    expect(result).toBe(true);
  });

  it('異常系', () => {
    const state = { auth: { user: null as unknown as User } };
    const result = signedInSelector(state);
    expect(result).toBe(false);
  });
});

describe('verifiedSelector', () => {
  it('正常系', () => {
    const state = { auth: { user: { verified: true } as unknown as User } };
    const result = verifiedSelector(state);
    expect(result).toBe(true);
  });

  it('異常系 (未認証)', () => {
    const state = { auth: { user: { verified: false } as unknown as User } };
    const result = verifiedSelector(state);
    expect(result).toBe(false);
  });

  it('異常系 (ユーザ情報取得エラー)', () => {
    const state = { auth: { user: null as unknown as User } };
    const result = verifiedSelector(state);
    expect(result).toBe(false);
  });
});
