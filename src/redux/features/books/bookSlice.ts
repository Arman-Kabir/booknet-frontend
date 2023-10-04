import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IProduct {

  yearRange: number;
  genre: string;
}

const initialState: IProduct = {

  yearRange: 2020,
  genre: ''
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {

    setYearRange: (state, action: PayloadAction<number>) => {
      state.yearRange = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    }
  },
});

export const { setYearRange, setGenre } = bookSlice.actions;

export default bookSlice.reducer;
