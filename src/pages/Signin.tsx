import { yupResolver } from '@hookform/resolvers/yup';
import { Email, VpnKey } from '@mui/icons-material';
import { Button, FormControl, Grid, InputAdornment, LinearProgress, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link as RrLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signin } from '../api/auth';
import { handleError } from '../errors';
import Yup from '../locales/yup.ja';
import { getRoute } from '../routes';
import { signedIn } from '../stores/slices/authSlice';
import AuthTemplate from '../templates/AuthTemplate';

export const Signin = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      })
    ),
  });

  const submit = handleSubmit(async (data) => {
    try {
      const response = await signin(data.email, data.password);
      toast.success(t('message.info.signedIn'));
      dispatch(signedIn(response.user));
    } catch (err) {
      handleError(err);
    }
  });

  return (
    <AuthTemplate title={t('title.signin')}>
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
        <TextField
          {...register('password')}
          error={'password' in formState.errors}
          helperText={formState.errors.password?.message}
          label={t('label.password')}
          type="password"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKey />
              </InputAdornment>
            ),
          }}
          inputProps={{ 'data-testid': 'password' }}
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
          {t('label.signin')}
        </Button>
      </FormControl>

      <Grid container>
        <Grid item xs>
          <Button
            component={RrLink}
            to={getRoute('resetPassword').path}
            variant="text"
            color="inherit"
            disabled={formState.isSubmitting}
            data-testid="reset-password-button"
          >
            {t('label.forgetPassword')}
          </Button>
        </Grid>
        <Grid item>
          <Button
            component={RrLink}
            to={getRoute('signup').path}
            variant="text"
            color="inherit"
            disabled={formState.isSubmitting}
            data-testid="create-account-button"
          >
            {t('label.createAccount')}
          </Button>
        </Grid>
      </Grid>
    </AuthTemplate>
  );
};

export default Signin;
