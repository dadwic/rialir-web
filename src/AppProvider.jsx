import React, { useReducer } from 'react';
import { AppContext, AppDispatchContext } from './context';

export default function AppProvider({ children }) {
  const [store, dispatch] = useReducer(appReducer, {
    customer: {
      firstName: 'خانم ',
      lastName: '',
      mobile: '',
      address: '',
    },
    pricing: {
      try: '0',
      fee: '350',
      subtotal: '',
      invoiceTotal: '',
      description: '',
      discountVal: '',
      discount: false,
      date: null,
    },
    shipping: {
      rate: '400',
      unitRate: '350',
      cosmeticRate: '400',
      courier: '25000',
      subtotal: '',
      invoiceTotal: '',
      products: [{ name: '', weight: '', unit: false }],
      description: '',
      tipax: true,
    },
    waybill: {
      subtotal: '',
      qrcode: 'https://www.rialir.com/',
      barcode: '09200742547',
    },
  });

  return (
    <AppContext.Provider value={store}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

function appReducer(data, action) {
  switch (action.type) {
    case 'set_pricing': {
      return { ...data, pricing: action.data, customer: action.customer };
    }
    case 'set_shipping': {
      return { ...data, shipping: action.data, customer: action.customer };
    }
    case 'set_waybill': {
      return { ...data, waybill: action.data, customer: action.customer };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
