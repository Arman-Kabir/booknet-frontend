import { IBook } from '@/types/globalTypes'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface listState {
    books: IBook[],
    total: number
}

const initialState: listState = {
    books: [],
    total: 0
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<IBook>) => {
            const existing = state.books.find((book) => book._id === action.payload._id)
            // console.log(existing);
            if (existing) {
                console.log("already added");
            } else {
                state.books.push({ ...action.payload });
                state.total += 1
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToWishlist } = listSlice.actions

export default listSlice.reducer