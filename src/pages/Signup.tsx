import { yupResolver } from '@hookform/resolvers/yup';
import { Email, Person, VpnKey } from '@mui/icons-material';
import { Button, FormControl, Grid, InputAdornment, LinearProgress, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RrLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signup } from '../api/auth';
import { handleError } from '../errors';
import Yup from '../locales/yup.ja';
import { getRoute } from '../routes';
import AuthTemplate from '../templates/AuthTemplate';

export const Signup = () => {
  const [t] = useTranslation();
  const history = useHistory();
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmed: '',
    },
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
        passwordConfirmed: Yup.string()
          .required()
          .oneOf([Yup.ref('password')], t('message.error.passwordMismatch')),
      })
    ),
  });

  const submit = handleSubmit(async (data) => {
    try {
      await signup(data.name, data.email, data.password);
      toast.success(t('message.info.identifyMailSent'));
      history.push(getRoute('home').path);
    } catch (err) {
      handleError(err);
    }
  });

  return (
    <AuthTemplate title={t('title.signup')}>
      {formState.isSubmitting && <LinearProgress />}

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
        <TextField
          {...register('passwordConfirmed')}
          error={'passwordConfirmed' in formState.errors}
          helperText={formState.errors.passwordConfirmed?.message}
          label={t('label.passwordConfirmed')}
          type="password"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKey />
              </InputAdornment>
            ),
          }}
          inputProps={{ 'data-testid': 'passwordConfirmed' }}
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
          {t('label.signup')}
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

export default Signup;
