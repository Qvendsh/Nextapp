import React, { FC, useState } from "react";
import { Product } from "@/models/Favourite";
import { useDispatch } from "react-redux";
import { addFavourite } from "@/redux/favouriteSlice";

const ProductCard: FC<Product> = ({ id, name, url }) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const dispatch = useDispatch();
  const toogleFavourite = () => {
    setIsFavourite(!isFavourite);
    if (!isFavourite) {
      dispatch(addFavourite({ id, name, url }));
    }
  };

  return (
    <div className="card">
      <p>{name}</p>
      <img src={url} alt="" />
      <button onClick={toogleFavourite}>
        {isFavourite ? <span>❤️</span> : <span>🤍</span>}
      </button>
    </div>
  );
};

export default ProductCard;
