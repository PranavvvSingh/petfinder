import React from "react";
import { useParams } from "react-router-dom";
import data from "../data/pets.json";
import { FaRupeeSign as RupeeSign } from "react-icons/fa";

const Pet = () => {
  const { petId } = useParams();
  const numericPetId = parseInt(petId, 10);
  const pet = data.pets.find((item) => item.id === numericPetId);
  return (
    <div className="flex flex-row flex-wrap justify-center items-center mt-[50px] p-5 gap-5">
      <img src={pet?.image} alt="" className="w-[550px] h-[350px] rounded-lg" />
      <div className="flex  flex-col  p-2 h-max gap-5 w-[450px]">
        <h1 className="text-6xl">{pet?.name}</h1>
        <h5 className="text-neutral-500 text-xl">{pet?.subtype}</h5>
        <div className="text-3xl">
          <RupeeSign className="inline-block" />
          {pet?.price}
        </div>
        <p className="text-lg">{pet?.description}</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-amber-400 rounded-xl p-3">
            Add To Favorites
          </button>
          <button className="bg-amber-400 rounded-xl p-3">Inquire</button>
        </div>
      </div>
    </div>
  );
};

export default Pet;
