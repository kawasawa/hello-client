import { yupResolver } from '@hookform/resolvers/yup';
import { VpnKey } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  LinearProgress,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { withdraw } from '../api/auth';
import { handleError } from '../errors';
import Yup from '../locales/yup.ja';
import { signedOut } from '../stores/slices/authSlice';

export const WithdrawButton = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(
      Yup.object().shape({
        password: Yup.string().required(),
      })
    ),
  });

  const [dialogOpened, setDialogOpened] = useState(false);
  const openDialog = () => setDialogOpened(true);
  const closeDialog = () => setDialogOpened(false);

  const submit = handleSubmit(async (data) => {
    try {
      await withdraw(data.password);
      toast.success(t('message.info.withdraw'));
      dispatch(signedOut());
    } catch (err) {
      handleError(err);
    }
  });

  return (
    <>
      <Button onClick={openDialog} variant="text" color="inherit" data-testid="button">
        {t('title.withdraw')}
      </Button>

      <Dialog
        open={dialogOpened}
        onClose={closeDialog}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        data-testid="dialog"
      >
        <DialogTitle id="dialog-title">{t('label.confirm')}</DialogTitle>

        <DialogContent>
          <DialogContentText id="dialog-description">{t('text.withdraw')}</DialogContentText>
          <FormControl fullWidth>
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
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog} variant="text" color="inherit" autoFocus data-testid="cancel-button">
            {t('label.cancel')}
          </Button>
          <Button
            onClick={submit}
            variant="text"
            color="secondary"
            disabled={!formState.isValid || formState.isSubmitting}
            data-testid="submit-button"
          >
            {t('label.withdraw')}
          </Button>
        </DialogActions>

        {formState.isSubmitting && <LinearProgress />}
      </Dialog>
    </>
  );
};

export default React.memo(WithdrawButton);
