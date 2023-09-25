import React, { useReducer } from 'react';
import { AppContext, AppDispatchContext } from './context';

export default function AppProvider({ children }) {
  const [store, dispatch] = useReducer(appReducer, {
    firstName: '',
    lastName: '',
    mobile: '',
    products: [],
    tipax: false,
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
      return { ...data, ...action.data };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
