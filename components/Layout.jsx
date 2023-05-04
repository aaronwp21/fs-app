import React, { useContext } from 'react';
import Header from './Header';
import {
  Container,
  Alert,
  Snackbar,
  IconButton,
  CloseIcon,
} from '@/components/mui';

function Layout({children}) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="md">
          {children}
        </Container>
      </main>
    </>
  );
}

export default Layout;

// import { UIContext } from "./contexts/UI.context";

      {/* <Snackbar
        open={open}
        autoHideDuration={hideDuration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
          {action}
        </Alert>
      </Snackbar> */}

// const action = (props) => {
  //   console.log(props);
  //   return (
  //     <React.Fragment>
  //       <IconButton
  //         size="small"
  //         aria-label="close"
  //         color="inherit"
  //         onClick={handleClose}
  //       >
  //         <CloseIcon fontSize="small" />
  //       </IconButton>
  //     </React.Fragment>
  //   );
  // };

    //   const {
  //     isOpen: open,
  //     severity,
  //     onClose: handleClose,
  //     message,
  //     hideDuration,
  //   } = useContext(UIContext);