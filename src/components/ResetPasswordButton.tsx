import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { resetPassword } from '../api/auth';
import { handleError } from '../errors';
import { AppState } from '../stores/root';

export const ResetPasswordButton = () => {
  const [t] = useTranslation();
  const { user } = useSelector((state: AppState) => state.auth);

  const [dialogOpened, setDialogOpened] = useState(false);
  const openDialog = () => setDialogOpened(true);
  const closeDialog = () => setDialogOpened(false);

  const submit = async () => {
    try {
      if (!user?.email) throw new Error(t('message.error.userDataUnavailable'));
      await resetPassword(user.email);
      closeDialog();
      toast.success(t('message.info.resetPasswordMailSent'));
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Box>
      <Button onClick={openDialog} variant="text" color="primary" data-testid="button">
        {t('title.resetPassword')}
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
          <DialogContentText id="dialog-description">{t('text.resetPassword')}</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog} variant="text" color="inherit" autoFocus data-testid="cancel-button">
            {t('label.cancel')}
          </Button>
          <Button onClick={submit} variant="text" color="primary" data-testid="submit-button">
            {t('label.sendResetPasswordMail')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default React.memo(ResetPasswordButton);
