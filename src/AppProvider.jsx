import React, { useReducer } from 'react';
import { AppContext, AppDispatchContext } from './context';

export default function AppProvider({ children }) {
  const [store, dispatch] = useReducer(appReducer, {
    pricing: {
      firstName: '',
      lastName: '',
      mobile: '',
      address: '',
      try: '0',
      fee: '200',
      shipping: '0',
      date: null,
    },
    shipping: {
      firstName: '',
      lastName: '',
      mobile: '',
      address: '',
      products: [{ name: '', weight: '' }],
      tipax: true,
      courier: '0',
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
      return { ...data, pricing: action.data };
    }
    case 'set_shipping': {
      return { ...data, shipping: action.data };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
