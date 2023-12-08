import React from "react";
import { MdOutlinePets as Logo } from "react-icons/md";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="sticky top-0 z-10 flex flex-row justify-between px-8 py-3 bg-yellow-500">
      <Link to="/" className="text-2xl flex gap-2 items-center">
        <Logo />
        PetFinder
      </Link>
      <div className="flex gap-5 items-center">
        <Link to="login">Favorites</Link>
        <Link to="login">Login</Link>
      </div>
    </div>
  );
};

export default Header;
