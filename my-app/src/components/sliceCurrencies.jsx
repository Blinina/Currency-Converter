import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const url = 'https://www.cbr-xml-daily.ru/daily_json.js'
export const getData = createAsyncThunk('currencies/getData', async (_, { dispatch }) => {
  const res = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
  dispatch(setCurrentCurrencies(res.data.Valute))
});

const sliceCurrencies = createSlice({
    name: "currencies",
    initialState: {
      currencies: [],
    },
    reducers: {
      setCurrentCurrencies: (state, action) => {
        state.currencies = action.payload
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getData.fulfilled, (state) => {
            
            state.isLoading = false;
            state.loadingError = null;
          })
          .addCase(getData.pending, (state) => {
            state.isLoading = true;
            state.loadingError = null;
          })
          .addCase(getData.rejected, (state, action) => {
            console.log('rejected');
            state.isLoading = false;
            state.loadingError = action.error;
          });
      }
    });
    


export const { setCurrentCurrencies } = sliceCurrencies.actions
// export const getLoading = ((state) => state.story.isLoading);

export default sliceCurrencies.reducer;