import React, { useState } from "react";
import data from "../data/pets.json";
import Card from "./Card";
import Search from "./Search";

const Collection = () => {
  const [searchText, setSearchText] = useState("");
  const [pets, setPets] = useState(data.pets);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Recommended");

  const typeRanges = ["All", "Dog", "Rabbit", "Cat", "Bird", "Fish"];
  const priceRanges = ["All", "0-8000", "8000-15000", "15000-30000", "30000+"];
  const sortRanges = ["Recommended","Price: Low to High", "Price: High to Low"]

  const filteredPets = pets.filter((pet) => {
    if (selectedType !== "All" && pet.type !== selectedType) return false;
    if (selectedPrice !== "All") {
      const [minPrice, maxPrice] = selectedPrice.split("-");
      if (pet.price < parseInt(minPrice) || pet.price > parseInt(maxPrice)) {
        return false;
      }
    }
    if (searchText &&
      !(pet.type.toLowerCase().includes(searchText.toLowerCase()) ||
        pet.subtype.toLowerCase().includes(searchText.toLowerCase()) ||
        pet.description.toLowerCase().includes(searchText.toLowerCase()))) {
        return false;
    }
    return true;
  });

  const sortedPets=selectedSort==="Recommended"?[...filteredPets]:[...filteredPets].sort((a,b)=>{
    if(selectedSort==="Price: Low to High") return a.price-b.price;
    else return b.price-a.price;
  })

  return (
    <>
      <Search searchText={searchText} setSearchText={setSearchText} />
      <div className="flex justify-center gap-5 mb-5">
        <div className="border p-2 rounded-lg focus-within:ring ring-yellow-400">
          <label className="mr-1">Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-lg p-1 outline-none text-center"
          >
            {typeRanges.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="border p-2 rounded-lg focus-within:ring ring-yellow-400">
          <label className="mr-1">Price:</label>
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="rounded-lg p-1 outline-none text-center"
          >
            {priceRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
        <div className="border p-2 rounded-lg focus-within:ring ring-yellow-400">
          <label className="mr-1">Sort:</label>
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="rounded-lg p-1 outline-none text-center"
          >
            {sortRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-center text-neutral-500">Showing {sortedPets.length} Results</p>
      <div className="flex flex-wrap p-7 gap-8 justify-center">
        {sortedPets.map((pet) => {
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

export default Collection;
