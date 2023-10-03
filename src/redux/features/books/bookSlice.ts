import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IProduct {
  status: boolean;
  yearRange: number;
  genre:string;
}

const initialState: IProduct = {
  status: false,
  yearRange: 2020,
  genre:''
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
    setGenre:(state,action: PayloadAction<string>)=>{
      state.genre = action.payload;
    }
  },
});

export const { toggleState, setYearRange,setGenre } = bookSlice.actions;

export default bookSlice.reducer;
