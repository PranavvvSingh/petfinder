import React from "react";
import { FaRupeeSign as RupeeSign } from "react-icons/fa";
import { MdFavoriteBorder as FavoriteBorder } from "react-icons/md";
import { MdFavorite as Favorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../features/favorites";
import { db } from "../config/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth } from "../config/firebase";

const Card = ({ image, name, price, id }) => {
  const favorites = useSelector((state) => state.favorites.collection);
  const userId= useSelector(state=>state.auth.user)
  const favoriteStatus = favorites.some((item) => item.id === id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addToStore = async () => {
    const docRef = doc(db, "favorites", auth.currentUser.uid.toString());
    await updateDoc(docRef, {
      favorites: arrayUnion({ id, name, price, image }),
    });
  };
  const removeFromStore = async () => {
    const docRef = doc(db, "favorites", auth.currentUser.uid.toString());
    await updateDoc(docRef, {
      favorites: arrayRemove({ id, name, price, image }),
    });
  };
  function ToggleFavorite() {
    if(!userId){
      console.log("not logged in")
      console.log(auth.currentUser)
      navigate("/login");
    } 
    else{
      if (favoriteStatus) {
        removeFromStore();
        dispatch(remove(id));
      } else {
        addToStore();
        dispatch(add({ id, name, price, image }));
      }
    }
  }
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-1 duration-300 border border-amber-400 hover:ring-2 hover:ring-yellow-400 cursor-pointer">
      <img
        src={image}
        alt=""
        className="w-[300px] aspect-[16/10] object-cover"
        onClick={() => {
          navigate("/pet/" + id);
        }}
      />
      <div className="p-2 text-center">
        <h3
          className="mb-2 block text-xl font-semibold text-black"
          onClick={() => {
            navigate("pet/" + id);
          }}
        >
          {name}
        </h3>
        <div className="flex justify-between items-center p-1">
          <div className="flex items-center text-lg">
            <RupeeSign className="inline-block" />
            <p>{price}</p>
          </div>
          {favoriteStatus ? (
            <Favorite
              className="text-2xl text-amber-400"
              onClick={ToggleFavorite}
            />
          ) : (
            <FavoriteBorder
              className="text-2xl hover:text-amber-400"
              onClick={ToggleFavorite}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
