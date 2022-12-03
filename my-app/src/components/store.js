
import { configureStore } from '@reduxjs/toolkit';
import currenciesReduser from './sliceCurrencies';

export default configureStore({
  reducer: {
    currencies: currenciesReduser,
  },
})