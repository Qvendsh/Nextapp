import React, { FC, useState } from "react";
import { Product } from "@/models/Favourite";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavourite,
  addFavouriteToFirestore,
  removeFavouriteFromFirestore,
} from "@/redux/favouriteSlice";
import { AppDispatch, RootState } from "@/redux/store";

const ProductCard: FC<Product> = ({ id, name, url }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [red, setRed] = useState<boolean>(false);

  const isFavourite = useSelector((state: RootState) =>
    state.favourites.favourites.some((fav) => fav.id === id),
  );

  const toggleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFavouriteFromFirestore(id));
    } else {
      dispatch(addFavouriteToFirestore({ id, name, url }));
    }
  };

  const toggleHeart = () => {
    setRed(!red);
  };

  return (
    <div className=" flex justify-center m-2.5  ">
      <p>{name}</p>
      <img src={url} alt="" />
      <button
        onClick={() => {
          toggleFavourite();
          toggleHeart();
        }}
      >
        {red || isFavourite ? <span>❤️</span> : <span>🤍</span>}
      </button>
    </div>
  );
};

export default ProductCard;
