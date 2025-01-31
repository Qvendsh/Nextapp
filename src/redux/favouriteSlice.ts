import { db } from "@/firebaseConfig";
import { Product } from "@/models/Favourite";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

interface FavouriteState {
  favourites: Product[];
}

const initialState: FavouriteState = {
  favourites: [],
};

export const addFavouriteToFirestore = createAsyncThunk(
  "favourites/addFavouriteToFirestore",
  async (product: Product, { rejectWithValue }: any) => {
    try {
      const docRef = await addDoc(collection(db, "favourites"), product);
      return { ...product, id: docRef.id };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const removeFavouriteFromFirestore = createAsyncThunk(
  "favourites/removeFavouriteFromFirestore",
  async (id: string, { rejectWithValue }: any) => {
    try {
      await deleteDoc(doc(db, "favourites", id));
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateFavouriteInFirestore = createAsyncThunk(
  "favourites/updateFavouriteInFirestore",
  async (product: Product, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "favourites", product.id.toString());
      await updateDoc(docRef, { name: product.name });
      return product;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<Product>) => {
      state.favourites.push(action.payload);
    },
    removeFavourite: (state, action: PayloadAction<number>) => {
      state.favourites = state.favourites.filter(
        (product) => product.id !== action.payload.toString(),
      );
    },
    updateFavourite: (state, action: PayloadAction<Product>) => {
      const index = state.favourites.findIndex(
        (product) => product.id === action.payload.id,
      );
      if (index !== -1) {
        state.favourites[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addFavouriteToFirestore.fulfilled, (state, action) => {
      state.favourites.push(action.payload);
    });
    builder.addCase(removeFavouriteFromFirestore.fulfilled, (state, action) => {
      state.favourites = state.favourites.filter(
        (fav) => fav.id !== action.payload,
      );
    });
    builder.addCase(updateFavouriteInFirestore.fulfilled, (state, action) => {
      const index = state.favourites.findIndex(
        (fav) => fav.id === action.payload.id,
      );
      if (index !== -1) {
        state.favourites[index] = action.payload;
      }
    });
  },
});

export const { addFavourite, updateFavourite, removeFavourite } =
  favouriteSlice.actions;
export default favouriteSlice.reducer;
