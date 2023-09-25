import React, { useContext } from 'react';
import { AppContext } from './context';
import Form from './Form';
import Invoice from './Invoice';

export default function App() {
  const store = useContext(AppContext);
  return store.products.length > 0 ? <Invoice store={store} /> : <Form />;
}
