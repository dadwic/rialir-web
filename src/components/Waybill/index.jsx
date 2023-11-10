import React, { useContext } from 'react';
import moment from 'moment-jalaali';
import Barcode from 'react-barcode';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { persianNumber } from '../../utils';
import { AppContext } from '../../context';
import { getQRCode } from '../../utils';

moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' });

export default function Waybill({ onEdit }) {
  const { customer, waybill } = useContext(AppContext);
  const qrValue = getQRCode(waybill.qrcode);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" onClick={onEdit}>
        <div>
          <img src="/logo-2x-000.png" width={128} />
          <Typography variant="body2" textAlign="center" fontWeight={300}>
            خرید از ترکیه با ریالیر
          </Typography>
          <Typography variant="body2" textAlign="center">
            www.rialir.com
          </Typography>
        </div>
        <img src={qrValue} width={120} height={120} />
      </Box>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ borderRadius: 0, borderColor: '#000' }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ th: { borderColor: '#000', fontWeight: 200 } }}>
              <TableCell>تاریخ:</TableCell>
              <TableCell>
                {moment().zone('+0330').format('dddd jD jMMMM jYYYY - HH:mm')}
              </TableCell>
            </TableRow>
            <TableRow sx={{ th: { borderColor: '#000', fontWeight: 200 } }}>
              <TableCell>گیرنده:</TableCell>
              <TableCell>
                {customer.firstName} {customer.lastName}
              </TableCell>
            </TableRow>
            <TableRow sx={{ th: { borderColor: '#000', fontWeight: 200 } }}>
              <TableCell>آدرس:</TableCell>
              <TableCell>{persianNumber(customer.address)}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <center>
        <Barcode value={waybill.barcode} height={32} />
      </center>
    </Box>
  );
}
