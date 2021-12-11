import { yupResolver } from '@hookform/resolvers/yup';
import { Email, Person } from '@mui/icons-material';
import { Button, FormControl, Grid, InputAdornment, LinearProgress, TextField, Tooltip } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { identify } from '../api/auth';
import { update } from '../api/resource';
import { UserResponse } from '../api/responses';
import ResetPasswordButton from '../components/ResetPasswordButton';
import WithdrawButton from '../components/WithdrawButton';
import { constants } from '../constants';
import { handleError } from '../errors';
import Yup from '../locales/yup.ja';
import { AppState } from '../stores/root';
import { signedIn } from '../stores/slices/authSlice';
import GenericTemplate from '../templates/GenericTemplate';

export const Account = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.auth);
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required().email(),
      })
    ),
  });

  const submit = handleSubmit(async (data) => {
    try {
      // user インスタンスが存在しない状態で呼ばれることは無い
      /* eslint-disable-next-line */
      const emailUpdated = user!.email !== data.email;
      const response = await update<UserResponse>(constants.url.resource.user, data);
      dispatch(signedIn(response.user));

      if (emailUpdated) toast.success(t('message.info.identifyMailSent'));
      else toast.success(t('message.info.accountUpdated'));
    } catch (err) {
      handleError(err);
    }
  });

  const sendMail = async () => {
    try {
      await identify();
      toast.success(t('message.info.identifyMailSent'));
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <GenericTemplate title={t('title.account')}>
      <FormControl fullWidth margin="normal">
        <TextField
          {...register('name')}
          error={'name' in formState.errors}
          helperText={formState.errors.name?.message}
          label={t('label.name')}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
          inputProps={{ 'data-testid': 'name' }}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          {...register('email')}
          error={'email' in formState.errors}
          helperText={formState.errors.email?.message}
          label={t('label.email')}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          inputProps={{ 'data-testid': 'email' }}
        />
      </FormControl>

      {!user?.verified && (
        <Tooltip title={<>{t('message.info.resendMail')}</>} placement="right" arrow>
          <Button onClick={sendMail} variant="text" color="secondary" data-testid="send-mail-button">
            {t('message.error.accountUnverified')}
          </Button>
        </Tooltip>
      )}

      <FormControl fullWidth margin="normal">
        <Button
          onClick={submit}
          variant="contained"
          color="primary"
          disabled={!formState.isDirty || !formState.isValid || formState.isSubmitting || !user}
          data-testid="submit-button"
        >
          {t('label.updateAccount')}
        </Button>
      </FormControl>

      <Grid container>
        <Grid item xs>
          <ResetPasswordButton />
        </Grid>
        <Grid item>
          <WithdrawButton />
        </Grid>
      </Grid>

      {formState.isSubmitting && <LinearProgress />}
    </GenericTemplate>
  );
};

export default Account;
