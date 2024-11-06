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
import { numFormat, persianNumber, tryFormat } from '../../utils';
import { AppContext } from '../../context';
import Logo from '../Logo';
import URL from '../URL';

moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' });

export default function PricingInvoice({ onEdit }) {
  const { customer, pricing } = useContext(AppContext);
  const { firstOrder, discount, fee } = pricing;
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
        پیش فاکتور
      </Typography>
      <Typography variant="subtitle2" textAlign="center" color="text.secondary">
        {moment().zone('+0330').format('dddd jD jMMMM jYYYY - HH:mm')}
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">قیمت لحظه‌ای لیر</TableCell>
              <TableCell align="center">کارمزد هر لیر</TableCell>
              <TableCell align="center">قابل پرداخت</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              'tr:nth-of-type(odd)': {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  borderRight: '1px solid #e0e0e0',
                }}
              >
                <Typography variant="subtitle2">
                  {numFormat(pricing.try)} تومان
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{ borderRight: '1px solid #e0e0e0' }}
              >
                <Typography variant="subtitle2">
                  {persianNumber(fee)} تومان
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle2" fontWeight={700}>
                  {numFormat(pricing.invoiceTotal)} ریال
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={firstOrder || discount ? 2 : 3}>
                <Typography variant="subtitle2">
                  قیمت کالاها: {tryFormat(pricing.subtotal)} لیر
                </Typography>
              </TableCell>
              {discount && (
                <TableCell sx={{ borderLeft: '1px solid #e0e0e0', px: 1 }}>
                  <Typography variant="subtitle2">
                    تخفیف: {numFormat(pricing.discountVal)} تومان
                  </Typography>
                </TableCell>
              )}
              {firstOrder && (
                <TableCell sx={{ borderLeft: '1px solid #e0e0e0', px: 1 }}>
                  <Typography variant="subtitle2" align="center">
                    سفارش اول بدون کارمزد
                  </Typography>
                </TableCell>
              )}
            </TableRow>
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell colSpan={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  تاریخ بروزرسانی‌ قیمت لیر:&nbsp;
                  {moment(pricing.date || new Date().getTime())
                    .zone('+0330')
                    .subtract(moment().minute() % 30, 'minutes')
                    .startOf('minute')
                    .format('jYYYY/jMM/jDD - HH:mm')}
                </Typography>
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
          <Typography>{persianNumber(customer.address)}</Typography>
        </Grid>
        <Divider flexItem orientation="vertical">
          <Logo />
        </Divider>
        <Grid item xs sx={{ py: 2 }}>
          <Typography variant="h6" align="center" gutterBottom>
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
      <Typography fontWeight={700} gutterBottom>
        توضیحات: {persianNumber(pricing.description)}
      </Typography>
      <ul style={{ paddingInlineStart: '1em' }}>
        <Typography component="li" fontWeight={700} gutterBottom>
          با ثبت سفارش، با شرایط و قوانین سایت موافقت می‌کنید.
        </Typography>
        <Typography component="li" fontWeight={700} gutterBottom>
          در علت تراکنش ذکر شود: بابت پرداخت قرض و تادیه دیون
        </Typography>
        <Typography
          component="li"
          align="justify"
          fontWeight={700}
          gutterBottom
        >
          مشتری گرامی بعد از پرداخت، لطفاً تصویر فیش واریزی را برای پشتیبانی
          ریالیر ارسال کنید.
        </Typography>
        <Typography component="li" align="justify" fontWeight={700}>
          مدت زمان تحویل سفارش: ۲ تا ۳ هفته کاری ترکیه بعد از تحویل کالا توسط
          فروشنده به دفتر ریالیر در استانبول
        </Typography>
      </ul>
    </Box>
  );
}
