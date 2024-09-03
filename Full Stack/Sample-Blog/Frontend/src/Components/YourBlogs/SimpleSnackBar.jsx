import * as React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function SimpleSnackbar({ open, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert
      onClose={handleClose}
      severity="success"
      variant="filled"
      sx={{ width: '100%' }}
    >
      Blog Successfully Deleted!
    </Alert>
  </Snackbar>
  );
}
