import React from "react";
import { FaRupeeSign as RupeeSign } from "react-icons/fa";
import { MdFavoriteBorder as FavoriteBorder } from "react-icons/md";
import { MdFavorite as Favorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Card = ({ image, name, price, id }) => {
  // function HandleClick() {
  //   const navigate = useNavigate();
  //   console.log("/pet/" + id);
  //   navigate("/pet/"+id)
  // }
  const navigate = useNavigate();
  return (
    <div
      className="overflow-hidden rounded-lg bg-white shadow-1 duration-300 border border-amber-400 hover:ring-2 hover:ring-yellow-400 cursor-pointer"
      onClick={() => {
        navigate("pet/" + id);
      }}
    >
      <img src={image} alt="" className="w-[280px]" />
      <div className="p-2 text-center">
        <h3 className="mb-2 block text-xl font-semibold text-black">{name}</h3>
        <div className="flex justify-between items-center p-1">
          <div className="flex items-center text-lg">
            <RupeeSign className="inline-block" />
            <p>{price}</p>
          </div>
          <FavoriteBorder className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Card;
