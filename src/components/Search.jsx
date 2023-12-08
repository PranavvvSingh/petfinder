import React from 'react'
import { IoSearchOutline as SearchIcon } from "react-icons/io5";


const Search = ({searchText, setSearchText}) => {

  function handleSubmit(event) {
    event.preventDefault();
    setSearchText("");
  }

  return (
    <div className='flex justify-center p-10'>
      <form
        className="flex border-4 focus-within:ring-2 ring-inset ring-yellow-500 justify-between w-[400px] px-4 py-2 gap-2 rounded-full"
        onSubmit={handleSubmit}
      >
        <input
          className="outline-none ps-2 bg-inherit text-black w-full"
          type="search"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          spellCheck="true"
          required
        />
        <SearchIcon className="text-3xl" />
      </form>
    </div>
  );
}

export default Search