import { yupResolver } from '@hookform/resolvers/yup';
import { Email } from '@mui/icons-material';
import { Button, FormControl, Grid, InputAdornment, LinearProgress, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RrLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { resetPassword } from '../api/auth';
import { handleError } from '../errors';
import Yup from '../locales/yup.ja';
import { getRoute } from '../routes';
import AuthTemplate from '../templates/AuthTemplate';

export const ResetPassword = () => {
  const [t] = useTranslation();
  const history = useHistory();
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().email().required(),
      })
    ),
  });

  const submit = handleSubmit(async (data) => {
    try {
      await resetPassword(data.email);
      toast.success(t('message.info.resetPasswordMailSent'));
      history.push(getRoute('home').path);
    } catch (err) {
      handleError(err);
    }
  });

  return (
    <AuthTemplate title={t('title.resetPassword')}>
      {formState.isSubmitting && <LinearProgress />}

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

      <FormControl fullWidth margin="normal">
        <Button
          onClick={submit}
          variant="contained"
          color="primary"
          disabled={!formState.isValid || formState.isSubmitting}
          style={{ marginTop: '0.5em' }}
          data-testid="submit-button"
        >
          {t('label.sendResetPasswordMail')}
        </Button>
      </FormControl>

      <Grid container>
        <Grid item xs />
        <Grid item>
          <Button
            component={RrLink}
            to={getRoute('signin').path}
            variant="text"
            color="inherit"
            disabled={formState.isSubmitting}
            data-testid="account-created-button"
          >
            {t('label.accountCreated')}
          </Button>
        </Grid>
      </Grid>
    </AuthTemplate>
  );
};

export default ResetPassword;
