import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { AppDispatchContext } from './context';

export default function Invoice({ store }) {
  const dispatch = useContext(AppDispatchContext);

  const handleClick = () => {
    dispatch({ type: 'edit_mode' });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={2}>
        <Box display="flex" justifyContent="center" onClick={handleClick}>
          <img src="/logo-2x.png" height={96} />
        </Box>
        <Typography variant="h6" fontWeight={700} sx={{ mt: 2 }}>
          صورتحساب هزینه باربری از ترکیه به ایران
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>نام محصول</TableCell>
                <TableCell align="right">وزن محصول</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.products.map((product) => (
                <TableRow
                  key={product.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">{product.weight} گرم</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              مشخصات مشتری
            </Typography>
            <Typography gutterBottom>
              {store.firstName} {store.lastName}
            </Typography>
            <Typography gutterBottom>{store.mobile}</Typography>
            <Typography gutterBottom>{store.address}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              نحوه پرداخت
            </Typography>
            <Typography fontWeight={700} gutterBottom>
              شماره کارت
            </Typography>
            <Typography gutterBottom>6219-8619-0609-8149</Typography>
            <Typography gutterBottom>بنام مهرداد مهرعلیان</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
