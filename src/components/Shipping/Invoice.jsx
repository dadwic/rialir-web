import React, { useContext } from 'react';
import moment from 'moment-jalaali';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ccyFormat, numFormat, persianNumber } from '../../utils';
import { AppContext } from '../../context';
import Logo from '../Logo';
import URL from '../URL';

moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' });

export default function ShippingInvoice({ onEdit }) {
  const { customer, shipping, pricing } = useContext(AppContext);

  return (
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
        صورتحساب هزینه ارسال
      </Typography>
      <Typography variant="subtitle2" textAlign="center" color="text.secondary">
        {moment().zone('+0330').format('dddd jD jMMMM jYYYY - HH:mm')}
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width={40}>ردیف</TableCell>
              <TableCell>نام محصول</TableCell>
              <TableCell align="right">مقدار محصول</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              'tr:nth-of-type(odd)': {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            {shipping.products.map((product, index) => (
              <TableRow key={product.name}>
                <TableCell>{persianNumber(index + 1)}</TableCell>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">
                  {numFormat(product.weight)} {product.unit ? 'عدد' : 'گرم'}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="subtitle2">
                  مجموع هزینه ارسال: {numFormat(shipping.invoiceTotal)} ریال
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell colSpan={3}>
                {shipping.tipax ? (
                  <Typography variant="subtitle2" color="text.secondary">
                    هزینه تیپاکس پس‌کرایه بر عهده مشتری می باشد.
                  </Typography>
                ) : (
                  <Typography variant="subtitle2" color="text.secondary">
                    مجموع صورتحساب شامل {numFormat(shipping.courier)} تومان
                    هزینه پیک می باشد.
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs sx={{ py: 2 }}>
          <Typography variant="h6" gutterBottom>
            مشخصات خریدار
          </Typography>
          <Typography gutterBottom>
            {customer.firstName} {customer.lastName}
          </Typography>
          <Typography gutterBottom>{persianNumber(customer.mobile)}</Typography>
          <Typography>{customer.address}</Typography>
        </Grid>
        <Divider flexItem orientation="vertical">
          <Logo />
        </Divider>
        <Grid item xs sx={{ py: 2 }}>
          <Typography align="center" variant="h6" gutterBottom>
            روش پرداخت
          </Typography>
          <Typography align="center" gutterBottom>
            شماره کارت بانک سامان
          </Typography>
          <Typography align="center" fontWeight={700} gutterBottom>
            6219&nbsp;8619&nbsp;0609&nbsp;8149
          </Typography>
          <Typography align="center">بنام مهرداد مهرعلیان</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mb: 2 }} />
      {pricing.invoiceTotal ? (
        <Typography
          fontWeight={900}
          align="center"
          color="primary"
          gutterBottom
        >
          مبلغ نهایی قابل پرداخت:&nbsp;
          {ccyFormat(shipping.invoiceTotal + pricing.invoiceTotal)} ریال
        </Typography>
      ) : (
        <Typography fontWeight={700} gutterBottom>
          توضیحات: {persianNumber(shipping.description)}
        </Typography>
      )}
      <ul style={{ paddingInlineStart: '1em' }}>
        <Typography component="li" fontWeight={700} gutterBottom>
          با ثبت سفارش، با شرایط و قوانین سایت موافقت می‌کنید.
        </Typography>
        <Typography component="li" fontWeight={700} gutterBottom>
          در علت تراکنش ذکر شود: بابت پرداخت قرض و تادیه دیون
        </Typography>
        <Typography component="li" align="justify" fontWeight={700}>
          مشتری گرامی بعد از پرداخت، لطفاً تصویر فیش واریزی را برای پشتیبانی
          ریالیر ارسال کنید.
        </Typography>
      </ul>
    </Box>
  );
}
