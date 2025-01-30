import {Product} from "@/models/Favourite";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FavouriteState {
    favourites: Product[]
}

const initialState: FavouriteState ={
    favourites: []
}

const favouriteSlice = createSlice({
    name: "favourites",
    initialState,
    reducers:{
        addFavourite: (state, action: PayloadAction<Product>) => {
            state.favourites.push(action.payload);
        },
        removeFavourite: (state, action: PayloadAction<number>) => {
            state.favourites = state.favourites.filter(product => product.id !== action.payload);
        },
        updateFavourite: (state, action: PayloadAction<Product>) => {
            const index = state.favourites.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.favourites[index] = action.payload;
            }
        }
    }
})

export const  {addFavourite, updateFavourite, removeFavourite} = favouriteSlice.actions
export default favouriteSlice.reducer