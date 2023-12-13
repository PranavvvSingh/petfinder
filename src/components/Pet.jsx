import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRupeeSign as RupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../features/favorites";
import { fetchPet } from "../config/firebase";
import { auth, addToStore, removeFromStore } from "../config/firebase";

const Pet = () => {
  const [pet, setPet] = useState();
  const dispatch = useDispatch();
  const { petId } = useParams();
  const navigate = useNavigate();
  const numericPetId = parseInt(petId, 10);
  useEffect(() =>{
    (async()=>{
      fetchPet(petId).then((data) => setPet(data));
    })()
  }, [petId]);
  const favorites = useSelector((state) => state.favorites.collection);
  const favoriteStatus = favorites.some((item) => item.id === numericPetId);
  async function ToggleFavorite() {
    if (!numericPetId) {
      console.log("not logged in");
      console.log(auth.currentUser);
      navigate("/login");
    } else {
      if (favoriteStatus) {
        await removeFromStore(pet);
        dispatch(remove(pet?.id));
      } else {
        await addToStore(pet);
        dispatch(add(pet?.id));
      }
    }
  }
  return (
    <div className="flex flex-row flex-wrap justify-center items-center mt-[50px] p-5 gap-5">
      <img
        src={pet?.image}
        alt=""
        className="w-[400px] h-[250px] md:w-[550px] md:h-[350px] rounded-lg"
      />
      <div className="flex  flex-col  p-2 h-max gap-5 w-[450px]">
        <h1 className="text-4xl md:text-6xl">{pet?.name}</h1>
        <h5 className="text-neutral-500 text-base md:text-xl">
          {pet?.subtype}
        </h5>
        <div className="text-xl md:text-3xl">
          <RupeeSign className="inline-block" />
          {pet?.price}
        </div>
        <p className="md:text-lg">{pet?.description}</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="bg-amber-400 rounded-xl p-1 md:p-3"
            onClick={ToggleFavorite}
          >
            {favoriteStatus ? "Remove from Favorites" : "Add To Favorites"}
          </button>
          <button className="bg-amber-400 rounded-xl p-1 md:p-3">
            Inquire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pet;
