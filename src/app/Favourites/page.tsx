"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Product } from "@/models/Favourite";
import { removeFavourite, updateFavourite } from "@/redux/favouriteSlice";
import Link from "next/link";

const FavouritePage = () => {
  const favourites = useSelector(
    (state: RootState) => state.favourites.favourites,
  );
  const dispatch = useDispatch();
  const [editing, setEditing] = useState<Product | null>(null);

  const handleRemove = (id: number) => {
    dispatch(removeFavourite(id));
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
  };

  const handleSave = () => {
    if (editing) {
      dispatch(updateFavourite(editing));
      setEditing(null);
    }
  };
  return (
    <div>
      <h1>Favourites</h1>
      <div>
        {favourites.map((product) => (
          <div key={product.id}>
            <div>
              {editing?.id === product.id ? (
                <>
                  <input
                    type="text"
                    value={editing.name}
                    className={`${editing?.id === product.id ? "bg-[red]" : "pointer-events-none"}`}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                  />
                </>
              ) : (
                <>
                  <span>{product.name}</span>
                </>
              )}
            </div>
            <div>
              <button onClick={() => handleRemove(product.id)}>Remove</button>
              {editing?.id === product.id ? (
                <button onClick={handleSave}>Save</button>
              ) : (
                <button onClick={() => handleEdit(product)}>Edit</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Link href="/Pokemon">go back</Link>
    </div>
  );
};

export default FavouritePage;
