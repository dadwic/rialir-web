import React, { useContext, useState } from 'react';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ShippingIcon from '@mui/icons-material/LocalShipping';
import { AppContext, AppDispatchContext } from '../../context';
import CustomerFields from '../Form/CustomerFields';
import Checkbox from '../Form/Checkbox';
import Input from '../Form/Input';
import Copyright from '../Copyright';
import Invoice from './Invoice';

const schema = yup
  .object({
    customer: yup.object().shape({
      firstName: yup.string().required('نام الزامی است.'),
      lastName: yup.string().required('نام خانوادگی الزامی است.'),
      mobile: yup.string().required('شماره موبایل الزامی است.'),
      address: yup.string().required('آدرس الزامی است.'),
    }),
    rate: yup.string().required('نرخ باربری الزامی است.'),
    shoeRate: yup.string().required('نره باربری کفش الزامی است.'),
    cosmeticRate: yup.string().required('نرخ باربری آرایشی الزامی است.'),
    products: yup.array().of(
      yup.object().shape({
        name: yup.string().required('نام الزامی است.'),
        weight: yup.string().required('وزن/تعداد الزامی است.'),
      })
    ),
  })
  .required();

export default function ShippingForm() {
  const dispatch = useContext(AppDispatchContext);
  const { customer, shipping } = useContext(AppContext);
  const [editMode, setEditMode] = useState(true);
  const { control, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { customer, ...shipping },
  });
  const { tipax, products, shoeRate } = watch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const onSubmit = ({ customer, ...form }) => {
    const subtotal = form.products.reduce((acc, obj) => {
      if (obj.shoe) {
        return acc + parseInt(obj.weight) * shoeRate * 1000;
      }
      return acc + parseInt(obj.weight) * parseInt(form.rate);
    }, 0);
    const invoiceTotal =
      (form.tipax ? subtotal : subtotal + parseInt(form.courier)) * 10;
    const data = { ...form, subtotal, invoiceTotal };
    dispatch({ type: 'set_shipping', customer, data });
    setEditMode(false);
  };

  if (!editMode) return <Invoice onEdit={() => setEditMode(true)} />;

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
        <ShippingIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        محاسبه گر هزینه باربری
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}
        noValidate
      >
        <Grid container spacing={2}>
          <CustomerFields control={control} setValue={setValue} />
          <Grid item xs={6}>
            <Input
              control={control}
              label="نرخ باربری (تومان)"
              type="tel"
              name="rate"
              id="rate"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              control={control}
              label="نرخ باربری کفش (تومان)"
              type="tel"
              name="shoeRate"
              id="shoeRate"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              control={control}
              label="نرخ باربری آرایشی (تومان)"
              type="tel"
              name="cosmeticRate"
              id="cosmeticRate"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              disabled={tipax}
              control={control}
              type="tel"
              id="courier"
              name="courier"
              label="هزینه پیک (تومان)"
            />
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                paddingLeft: 2,
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, 0.23)',
              }}
            >
              <Checkbox
                id="tipax"
                name="tipax"
                color="primary"
                control={control}
                defaultChecked={tipax}
                label="تیپاکس"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => append({ name: '', weight: '', shoe: false })}
            >
              محصول جدید
            </Button>
          </Grid>
          {fields.map((field, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <Input
                  key={field.id}
                  id={field.id}
                  control={control}
                  name={`products.${index}.name`}
                  label="نام محصول"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: -1.5 }}>
                        <Tooltip title="کفش">
                          <Checkbox
                            edge="end"
                            color="primary"
                            id={`shoe-${index}`}
                            defaultChecked={products[index].shoe}
                            name={`products.${index}.shoe`}
                            control={control}
                          />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  key={field.id}
                  id={field.id}
                  control={control}
                  name={`products.${index}.weight`}
                  label={
                    products[index].shoe ? 'تعداد جفت کفش' : 'وزن محصول (گرم)'
                  }
                  type="tel"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => remove(index)}
                        disabled={index === 0 && fields.length === 1}
                      >
                        <CloseIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Input
              control={control}
              name="description"
              id="description"
              label="توضیحات"
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
          محاسبه
        </Button>
        <Button
          fullWidth
          LinkComponent={Link}
          variant="outlined"
          size="large"
          to="/"
        >
          محاسبه گر قیمت نهایی کالا
        </Button>
      </Box>
      <Copyright />
    </Box>
  );
}
