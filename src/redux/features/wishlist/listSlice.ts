// import { toast } from '@/components/ui/use-toast'
import { IBook } from '@/types/globalTypes'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

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
                toast("already added");
                // console.log("already added");
                
            } else {
                state.books.push({ ...action.payload });
                state.total += 1;
                toast("added to wishlist");
                
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToWishlist } = listSlice.actions

export default listSlice.reducer