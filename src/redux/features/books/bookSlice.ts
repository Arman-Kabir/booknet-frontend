import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IProduct {
  status: boolean;
  yearRange: number;
}

const initialState: IProduct = {
  status: false,
  yearRange: 2020,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status;
    },
    setYearRange: (state, action: PayloadAction<number>) => {
      state.yearRange = action.payload;
    },
  },
});

export const { toggleState, setYearRange } = bookSlice.actions;

export default bookSlice.reducer;
