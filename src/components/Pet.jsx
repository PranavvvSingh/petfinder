import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../data/pets.json";
import { FaRupeeSign as RupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../features/favorites";
import { db } from "../config/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth } from "../config/firebase";

const Pet = () => {
  const dispatch= useDispatch();
  const { petId } = useParams();
  const navigate = useNavigate()
  const numericPetId = parseInt(petId, 10);
  const pet = data.pets.find((item) => item.id === numericPetId);
  const favorites = useSelector((state) => state.favorites.collection);
  const favoriteStatus = favorites.some((item) => item.id === numericPetId);
  const addToStore = async () => {
    const docRef = doc(db, "favorites", auth.currentUser.uid.toString());
    await updateDoc(docRef, {
      favorites: arrayUnion({ id:pet?.id, name: pet?.name, price:pet?.price, image:pet?.image }),
    });
  };
  const removeFromStore = async () => {
    const docRef = doc(db, "favorites", auth.currentUser.uid.toString());
    await updateDoc(docRef, {
      favorites: arrayRemove({
        id: pet?.id,
        name: pet?.name,
        price: pet?.price,
        image: pet?.image,
      }),
    });
  };
  function ToggleFavorite() {
    if (!numericPetId) {
      console.log("not logged in");
      console.log(auth.currentUser);
      navigate("/login");
    } else {
      if (favoriteStatus) {
        removeFromStore();
        dispatch(remove(pet.id));
      } else {
        addToStore();
        dispatch(add(pet));
      }
    }
  }
  return (
    <div className="flex flex-row flex-wrap justify-center items-center mt-[50px] p-5 gap-5">
      <img src={pet?.image} alt="" className="w-[400px] h-[250px] md:w-[550px] md:h-[350px] rounded-lg" />
      <div className="flex  flex-col  p-2 h-max gap-5 w-[450px]">
        <h1 className="text-4xl md:text-6xl">{pet?.name}</h1>
        <h5 className="text-neutral-500 text-base md:text-xl">{pet?.subtype}</h5>
        <div className="text-xl md:text-3xl">
          <RupeeSign className="inline-block" />
          {pet?.price}
        </div>
        <p className="md:text-lg">{pet?.description}</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-amber-400 rounded-xl p-1 md:p-3" onClick={ToggleFavorite}>
            {favoriteStatus?"Remove from Favorites":"Add To Favorites"}
          </button>
          <button className="bg-amber-400 rounded-xl p-1 md:p-3">Inquire</button>
        </div>
      </div>
    </div>
  );
};

export default Pet;
