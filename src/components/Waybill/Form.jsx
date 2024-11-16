import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { AppContext, AppDispatchContext } from '../../context';
import CustomerFields from '../Form/CustomerFields';
import Input from '../Form/Input';
import Copyright from '../Copyright';
import Waybill from './';

const schema = yup
  .object({
    customer: yup.object().shape({
      firstName: yup.string().required('نام الزامی است.'),
      lastName: yup.string().required('نام خانوادگی الزامی است.'),
      address: yup.string().required('آدرس الزامی است.'),
    }),
    qrcode: yup.string().required('بارکد الزامی است.'),
    barcode: yup.string().required('بارکد الزامی است.'),
  })
  .required();

export default function WaybillForm() {
  const { dispatch } = useContext(AppDispatchContext);
  const { customer, waybill } = useContext(AppContext);
  const [editMode, setEditMode] = useState(true);
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { customer, ...waybill },
  });

  const onSubmit = ({ customer, ...data }) => {
    dispatch({ type: 'set_waybill', customer, data });
    setEditMode(false);
  };

  if (!editMode) return <Waybill onEdit={() => setEditMode(true)} />;

  return (
    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <ReceiptIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        صدور بارنامه
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}
        noValidate
      >
        <Grid container spacing={2}>
          <CustomerFields control={control} setValue={setValue} />
          <Grid item xs={12}>
            <Input
              control={control}
              name="qrcode"
              id="qrcode"
              label="QR code"
              inputProps={{ dir: 'ltr' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              control={control}
              name="barcode"
              id="barcode"
              label="بارکد"
              inputProps={{ dir: 'ltr' }}
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          sx={{ my: 2 }}
        >
          صدور
        </Button>
        <Button
          fullWidth
          LinkComponent={Link}
          variant="outlined"
          size="large"
          href="/shipping"
        >
          محاسبه گر هزینه باربری
        </Button>
      </Box>
      <Copyright />
    </Box>
  );
}
