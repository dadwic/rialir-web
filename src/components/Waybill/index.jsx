import React, { useContext } from 'react';
import moment from 'moment-jalaali';
import Barcode from 'react-jsbarcode';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { AppContext } from '../../context';
import './styles.css';

moment.loadPersian({ usePersianDigits: true });

export default function Waybill({ onEdit }) {
  const { customer, waybill } = useContext(AppContext);

  return (
    <Container component="main" maxWidth="md">
      <Box p={1}>
        <Stack direction="row">
          <Stack alignItems="center" onClick={onEdit} p={2}>
            <img src="/logo-2x-000.png" width={100} />
            <Typography variant="h6" textAlign="center" fontWeight={700} mt={1}>
              بارنامه
            </Typography>
          </Stack>
          <Barcode value="www.rialir.com" />
        </Stack>
        <Typography variant="subtitle2" textAlign="center">
          {moment().zone('+0330').format('dddd jD jMMMM jYYYY - HH:mm')}
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ mt: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>نام مشتری</TableCell>
                <TableCell>شماره تماس</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
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
    </Container>
  );
}
