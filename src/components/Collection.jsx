import React, { useEffect, useState } from "react";
import Card from "./Card";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedType,
  setSelectedPrice,
  setSelectedSort,
} from "../features/filter";
import { setSearchText } from "../features/filter";
import { collection, getDoc, getDocs, orderBy, where, query } from "firebase/firestore";
import { db } from "../config/firebase";

const Collection = () => {
  // eslint-disable-next-line no-unused-vars

  const { searchText, selectedType, selectedPrice, selectedSort } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const typeRanges = ["All", "Dog", "Rabbit", "Cat", "Bird", "Fish"];
  const priceRanges = ["All", "0-8000", "8000-15000", "15000-30000", "30000+"];
  const sortRanges = [
    "Recommended",
    "Price: Low to High",
    "Price: High to Low",
  ];

  function handleClearFilters() {
    dispatch(setSelectedType("All"));
    dispatch(setSelectedPrice("All"));
    dispatch(setSelectedSort("Recommended"));
    dispatch(setSearchText(""));
  }
  const [pets, setPets] = useState([]);

  useEffect(()=>{
    const fetchData= async()=>{
    const collectionRef=collection(db,"pets")
    const queryConstraints = [];
    if(searchText!="") queryConstraints.push(
      where("keywords", "array-contains-any", searchText.toLowerCase().split(" "))
    );
    if(selectedType!="All") queryConstraints.push(where("type", "==", selectedType));
    if(selectedSort!="All"){
      if(selectedSort=="Price: Low to High") queryConstraints.push(orderBy("price"));
      else queryConstraints.push(orderBy("price", "desc"));
    }
    if(selectedPrice!="All"){
      if(selectedPrice=="30000+") queryConstraints.push(where("price", ">=", 30000));
      else{
        queryConstraints.push(
          where("price", ">=", parseInt(selectedPrice.split("-")[0]))
        );
        queryConstraints.push(
          where("price", "<=", parseInt(selectedPrice.split("-")[1]))
        );
      }    
    }
    const q=query(collectionRef,...queryConstraints)
    const querySnapshot = await getDocs(q);
    setPets([])
    querySnapshot.forEach(doc=>{
      setPets(curr=>[...curr,doc.data()])
    })
  }
    fetchData();
  },[selectedPrice,selectedSort,selectedType,searchText])

  return (
    <>
      <Search />
      <div className="flex flex-row flex-wrap items-center justify-center gap-5 md:gap-8 mb-5">
        <div className="flex flex-wrap items-center">
          <label className="mr-1">Type:</label>
          <div className="border p-1 rounded-lg focus-within:ring ring-yellow-400">
            <select
              value={selectedType}
              onChange={(e) => dispatch(setSelectedType(e.target.value))}
              className="rounded-lg p-1 outline-none text-center "
            >
              {typeRanges.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center">
          <label className="mr-1">Price:</label>
          <div className="border p-1 rounded-lg focus-within:ring ring-yellow-400">
            <select
              value={selectedPrice}
              onChange={(e) => dispatch(setSelectedPrice(e.target.value))}
              className="rounded-lg p-1 outline-none text-center"
            >
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center">
          <label className="mr-1">Sort:</label>
          <div className="border p-1 rounded-lg focus-within:ring ring-yellow-400">
            <select
              value={selectedSort}
              onChange={(e) => dispatch(setSelectedSort(e.target.value))}
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
        <button
          className="text-neutral-400 rounded-full hover:shadow-lg p-2 text-center border"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
      <p className="text-center text-neutral-500">
        Showing {pets.length} Results
      </p>
      <div className="flex flex-wrap p-7 gap-8 justify-center">
        {pets.map((pet) => {
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
        {/* <pre>{JSON.stringify(pets)}</pre> */}
      </div>
    </>
  );
};

export default Collection;
