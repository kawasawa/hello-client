import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { read } from '../api/resource';
import { UserResponse } from '../api/responses';
import { apiVersion } from '../api/util';
import { constants } from '../constants';
import { handleError } from '../errors';
import GenericTemplate from '../templates/GenericTemplate';

export const Account = () => {
  const [t] = useTranslation();

  const getApiVersion = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    try {
      const response = await apiVersion();
      toast.success(JSON.stringify(response));
    } catch (err) {
      handleError(err);
    }
  };

  const getUserInfo = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    try {
      const response = await read<UserResponse>(constants.url.resource.user);
      toast.success(JSON.stringify(response));
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <GenericTemplate title={t('title.home')}>
      <Button color="primary" onClick={getApiVersion} data-testid="api-version-button">
        API バージョン情報
      </Button>
      <Button color="secondary" onClick={getUserInfo} data-testid="user-record-button">
        ユーザ情報
      </Button>
    </GenericTemplate>
  );
};

export default Account;
