import React, { useReducer } from 'react';
import { AppContext, AppDispatchContext } from './context';

export default function AppProvider({ children }) {
  const [store, dispatch] = useReducer(appReducer, {
    edit: true,
    tipax: true,
    courier: '0',
    firstName: '',
    lastName: '',
    mobile: '',
    address: '',
    products: [{ name: '', weight: '' }],
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
    case 'set_data': {
      return { ...action.data, edit: false };
    }
    case 'edit_mode': {
      return { ...data, edit: true };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
