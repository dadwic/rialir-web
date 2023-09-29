import React, { useContext } from 'react';
import moment from 'moment-jalaali';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { numFormat, persianNumber } from '../../utils';
import { AppContext } from '../../context';
import Logo from '../../Logo';
import URL from '../../URL';

moment.loadPersian({ usePersianDigits: true });

export default function PricingInvoice({ onEdit }) {
  const { customer, pricing } = useContext(AppContext);
  const rate = parseInt(pricing.try) + parseInt(pricing.fee);
  const invoiceTotal = rate * parseFloat(pricing.subtotal);

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={2}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          onClick={onEdit}
        >
          <img src="/logo-2x.png" width={216} />
          <URL />
        </Box>
        <Typography
          variant="h6"
          textAlign="center"
          fontWeight={700}
          sx={{ mt: 2 }}
          gutterBottom
        >
          پیش فاکتور
        </Typography>
        <Typography
          variant="subtitle2"
          textAlign="center"
          color="text.secondary"
        >
          {moment().format('dddd jD jMMMM jYYYY - HH:mm')}
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
          <Table size="small">
            <caption>
              تاریخ بروزرسانی‌ قیمت لیر:&nbsp;
              {moment.unix(pricing.date).format('jYYYY/jMM/jDD - HH:mm:ss')}
            </caption>
            <TableHead>
              <TableRow>
                <TableCell align="center">قیمت لحظه ای لیر</TableCell>
                <TableCell align="center">کارمزد خرید کالا</TableCell>
                <TableCell align="center">قیمت نهایی</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell align="center">
                  {numFormat(pricing.try)} تومان
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2">
                    {persianNumber(pricing.fee)} تومان
                  </Typography>
                  <Typography
                    component="s"
                    variant="subtitle2"
                    color="text.secondary"
                  >
                    ۴۰۰ تومان
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2">
                    {numFormat(invoiceTotal)} تومان
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {parseFloat(pricing.subtotal)} لیر
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container>
          <Grid item xs sx={{ pb: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              مشخصات خریدار
            </Typography>
            <Typography gutterBottom>
              {customer.firstName} {customer.lastName}
            </Typography>
            <Typography gutterBottom>
              {persianNumber(customer.mobile)}
            </Typography>
            <Typography>{customer.address}</Typography>
          </Grid>
          <Divider flexItem orientation="vertical">
            <Logo />
          </Divider>
          <Grid item xs sx={{ pb: 2, pl: 2.5 }}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              روش پرداخت
            </Typography>
            <Typography gutterBottom>شماره کارت بانک سامان</Typography>
            <Typography fontWeight={700} gutterBottom>
              6219&nbsp;8619&nbsp;0609&nbsp;8149
            </Typography>
            <Typography>بنام مهرداد مهرعلیان</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mb: 2 }} />
        <Typography fontWeight={700} gutterBottom>
          توضیحات:
        </Typography>
        <ul>
          <Typography component="li" fontWeight={700} gutterBottom>
            حتما در توضیحات تراکنش ذکر شود: بابت پرداخت قرض و تادیه دیون
          </Typography>
          <Typography component="li" fontWeight={700}>
            مشتری گرامی بعد از پرداخت، لطفاً تصویر فیش واریزی را برای پشتیبانی
            ریالیر ارسال کنید.
          </Typography>
        </ul>
      </Box>
    </Container>
  );
}
