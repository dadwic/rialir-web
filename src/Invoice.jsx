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
import { numFormat, persianNumber } from './utils';

export default function Invoice({ store }) {
  const dispatch = useContext(AppDispatchContext);
  const subtotal =
    store.products.reduce((acc, object) => {
      return acc + parseInt(object.weight);
    }, 0) * 250;
  const invoiceTotal = subtotal + parseInt(store.cargo);

  const handleClick = () => {
    dispatch({ type: 'edit_mode' });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={4}>
        <Box display="flex" justifyContent="center" onClick={handleClick}>
          <img src="/logo-2x.png" height={96} />
        </Box>
        <Typography variant="h6" fontWeight={700} sx={{ mt: 2 }}>
          صورتحساب هزینه باربری
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
          <Table size="small">
            {store.tipax ? (
              <caption>هزینه تیپاکس پس‌کرایه بر عهده مشتری می باشد.</caption>
            ) : (
              <caption>هزینه پیک: {numFormat(store.cargo)} تومان</caption>
            )}
            <TableHead>
              <TableRow>
                <TableCell>نام محصول</TableCell>
                <TableCell align="right">وزن محصول</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.products.map((product) => (
                <TableRow key={product.name}>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">
                    {numFormat(product.weight)} گرم
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography component="span" fontWeight={700}>
                    مجموع:&nbsp;
                  </Typography>
                  <Typography component="span">
                    {numFormat(invoiceTotal)} تومان
                  </Typography>
                </TableCell>
              </TableRow>
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
            <Typography gutterBottom>{persianNumber(store.mobile)}</Typography>
            <Typography gutterBottom>{store.address}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              نحوه پرداخت
            </Typography>
            <Typography gutterBottom>شماره کارت</Typography>
            <Typography gutterBottom>6219-8619-0609-8149</Typography>
            <Typography gutterBottom>بنام مهرداد مهرعلیان</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
