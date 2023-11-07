import React, { useContext } from 'react';
import moment from 'moment-jalaali';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { AppContext } from '../../context';
import { getQRCode } from '../../utils';

moment.loadPersian({ usePersianDigits: true });

export default function Waybill({ onEdit }) {
  const { customer, waybill } = useContext(AppContext);
  const qrValue = getQRCode(waybill.qrcode);

  return (
    <Box p={1}>
      <Stack direction="row">
        <Stack alignItems="center" onClick={onEdit} p={2}>
          <img src="/logo-2x-000.png" width={128} />
          <Typography variant="h6" textAlign="center" fontWeight={200} mt={1}>
            بارنامه
          </Typography>
        </Stack>
        <img src={qrValue} width={128} height={128} />
      </Stack>
      <Typography variant="subtitle2" textAlign="center" fontWeight={200}>
        {moment().zone('+0330').format('dddd jD jMMMM jYYYY - HH:mm')}
      </Typography>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ mt: 1, borderRadius: 0, borderColor: '#000' }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ th: { borderColor: '#000', fontWeight: 200 } }}>
              <TableCell>نام مشتری</TableCell>
              <TableCell>شماره تماس</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                td: { borderColor: '#000', fontWeight: 200 },
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell>آقای مهرداد مهرعلیان</TableCell>
              <TableCell>۰۹۲۰۰۷۴۲۵۴۷</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
