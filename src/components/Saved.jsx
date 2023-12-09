import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

const Saved = () => {
    const favorites = useSelector((state) => state.favorites.collection || []);
    return (
      <>
        <p className="text-center text-neutral-500 mt-10">
          Showing {favorites.length} Results
        </p>
        <div className="flex flex-wrap p-7 gap-8 justify-center">
          {favorites.map((pet) => {
            return (
              <Card
                key={pet.id}
                id={pet.id}
                name={pet.name}
                price={pet.price}
                image={pet.image}
              />
            );
          })}
        </div>
      </>
    );
};

export default Saved;
