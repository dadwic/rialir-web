import React, { useContext } from 'react';
import { AppContext } from './context';
import Invoice from './Invoice';
import Form from './Form';

export default function App() {
  const store = useContext(AppContext);
  return store.edit ? <Form /> : <Invoice store={store} />;
}
