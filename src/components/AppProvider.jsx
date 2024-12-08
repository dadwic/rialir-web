'use client';

import React, { useReducer, useEffect } from 'react';
import { AppContext, AppDispatchContext } from '@/context';

const LOCAL_STORAGE_KEY = 'appState';

const initialState = {
  customer: {
    firstName: 'خانم ',
    lastName: '',
    mobile: '',
    address: 'تهران',
  },
  pricing: {
    rate: '0',
    fee: '300',
    subtotal: '',
    invoiceTotal: '',
    description: '',
    discountVal: '',
    discount: false,
    firstOrder: false,
    rateTime: null,
  },
  shipping: {
    rate: '450',
    unitRate: '350',
    cosmeticRate: '450',
    courier: '30000',
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
};

// Helper function to load state from local storage
function loadState() {
  if (typeof window === 'undefined') return undefined;
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.warn('Could not load state from local storage:', error);
    return undefined;
  }
}

export default function AppProvider({ children }) {
  const [store, dispatch] = useReducer(appReducer, loadState() || initialState);

  // Sync state to local storage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
      } catch (error) {
        console.warn('Could not save state to local storage:', error);
      }
    }
  }, [store]);

  // Function to reset local storage and context state
  const resetApp = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear local storage
    }
    dispatch({ type: 'reset' }); // Reset state to initial values
  };

  return (
    <AppContext.Provider value={store}>
      <AppDispatchContext.Provider value={{ dispatch, resetApp }}>
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
    case 'reset': {
      return initialState;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
