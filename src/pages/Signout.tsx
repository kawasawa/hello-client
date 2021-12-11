import { LinearProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { signout } from '../api/auth';
import { handleError } from '../errors';
import { signedOut } from '../stores/slices/authSlice';

export const Signout = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const func = async () => {
      try {
        await signout();
        toast.success(t('message.info.signedOut'));
      } catch (err) {
        handleError(err);
      } finally {
        dispatch(signedOut());
      }
    };
    func();
  }, [t, dispatch]);

  return <LinearProgress data-testid="progress" />;
};

export default Signout;
