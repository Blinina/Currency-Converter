/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import currenciesReduser from './sliceCurrencies';

export default configureStore({
  reducer: {
    currencies: currenciesReduser,
  },
});