"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Product } from "@/models/Favourite";
import {
  removeFavourite,
  removeFavouriteFromFirestore,
  updateFavourite,
  updateFavouriteInFirestore,
} from "@/redux/favouriteSlice";
import Link from "next/link";

const FavouritePage = () => {
  const favourites = useSelector(
    (state: RootState) => state.favourites.favourites,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState<Product | null>(null);

  const handleRemove = (id: string) => {
    dispatch(removeFavourite(+id));
    dispatch(removeFavouriteFromFirestore(id));
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    dispatch(updateFavouriteInFirestore(product));
  };

  const handleSave = () => {
    if (editing) {
      dispatch(updateFavourite(editing));
      setEditing(null);
    }
  };

  return (
    <div className="flex items-center flex-col p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Favourites
      </h1>
      <div className="w-full max-w-lg">
        {favourites.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              {editing?.id === product.id ? (
                <input
                  type="text"
                  value={editing.name}
                  className="p-2 border border-gray-300 rounded-md w-full bg-red-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                />
              ) : (
                <span className="text-lg font-semibold">{product.name}</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleRemove(product.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Remove
              </button>
              {editing?.id === product.id ? (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(product)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/Pokemon"
        className="mt-6 text-blue-500 hover:text-blue-700 transition"
      >
        Go back
      </Link>
    </div>
  );
};

export default FavouritePage;
