import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

export default function AppContainer({ children }) {
  return (
    <Container component="main" maxWidth="xs">
      <Stack alignItems="center" justifyContent="center" minHeight="100vh">
        {children}
      </Stack>
    </Container>
  );
}
