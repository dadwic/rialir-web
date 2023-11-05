import React, { useContext } from 'react';
import { QRCodeSVG } from 'qrcode.react';
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

moment.loadPersian({ usePersianDigits: true });

export default function Waybill({ onEdit }) {
  const { customer, waybill } = useContext(AppContext);

  return (
    <Box p={1}>
      <Stack direction="row">
        <Stack alignItems="center" onClick={onEdit} p={2}>
          <img src="/logo-2x-000.png" width={100} />
          <Typography variant="h6" textAlign="center" fontWeight={700} mt={1}>
            بارنامه
          </Typography>
        </Stack>
        <QRCodeSVG value="https://www.rialir.com/" />
      </Stack>
      <Typography variant="subtitle2" textAlign="center">
        {moment().zone('+0330').format('dddd jD jMMMM jYYYY - HH:mm')}
      </Typography>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ mt: 1, borderRadius: 0, borderColor: '#000' }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ th: { borderColor: '#000' } }}>
              <TableCell>نام مشتری</TableCell>
              <TableCell>شماره تماس</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                td: { borderColor: '#000' },
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell>
                <Typography variant="subtitle2">
                  آقای مهرداد مهرعلیان
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">۰۹۲۰۰۷۴۲۵۴۷</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
