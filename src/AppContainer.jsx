import React from 'react';
import Container from '@mui/material/Container';
import Copyright from './Copyright';

export default function AppContainer({ children }) {
  return (
    <Container component="main" maxWidth="xs">
      {children}
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
