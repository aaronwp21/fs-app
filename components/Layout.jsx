import React, { useContext, useCallback } from 'react';
import Header from '@/components/Header';
import Paragraph from '@/components/Paragraph';
import {
  Container,
  Alert,
  Snackbar,
  IconButton,
  CloseIcon,
} from '@/components/mui';
import { UIContext } from './contexts/UI.context';

function Layout({ children }) {
  const {
    isOpen: open,
    severity,
    onClose: handleClose,
    message,
    hideDuration,
  } = useContext(UIContext);

  const action = useCallback(
    (props) => {
      console.log(props);
      return (
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      );
    },
    [handleClose],
  );

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="md">{children}</Container>
      </main>
      <Snackbar
        open={open}
        autoHideDuration={hideDuration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          <Paragraph sx={{margin: 0}}>{message}</Paragraph>
          {action}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Layout;
