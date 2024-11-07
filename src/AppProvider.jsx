import React, { useReducer, useEffect } from 'react';
import { AppContext, AppDispatchContext } from './context';

const LOCAL_STORAGE_KEY = 'appState';

// Helper function to load state from local storage
function loadState() {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.warn('Could not load state from local storage:', error);
    return undefined;
  }
}

export default function AppProvider({ children }) {
  // Initialize the state, loading from local storage if available
  const initialState = loadState() || {
    customer: {
      firstName: 'خانم ',
      lastName: '',
      mobile: '',
      address: '',
    },
    pricing: {
      try: '0',
      fee: '300',
      subtotal: '',
      invoiceTotal: '',
      description: '',
      discountVal: '',
      discount: false,
      firstOrder: false,
      date: null,
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

  const [store, dispatch] = useReducer(appReducer, initialState);

  // Sync state to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
    } catch (error) {
      console.warn('Could not save state to local storage:', error);
    }
  }, [store]); // Depend on `store`, so it updates whenever the state changes

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
