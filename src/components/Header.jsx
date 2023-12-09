import React from "react";
import { MdOutlinePets as Logo } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { setUser } from "../features/auth";
import { set } from "../features/favorites";

const Header = () => {
  const userId = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleSignOut() {
    try {
      await signOut(auth);
      console.log("signed out");
      dispatch(setUser(null));
      dispatch(set([]));
    } catch (error) {
      console.log(error);
    } finally{
      navigate("/")
    }
  }

  return (
    <div className="sticky top-0 z-10 flex flex-row justify-between px-8 py-3 bg-yellow-500">
      <NavLink to="/" className="text-xl md:text-2xl flex gap-2 items-center">
        <Logo />
        PetFinder
      </NavLink>
      <div className="flex gap-3 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            "px-2 py-1 rounded-lg hover:ring-black text-sm md:text-base" +
            (isActive ? " bg-black/[0.2] " : "")
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            "px-2 py-1 rounded-lg hover:ring-black text-sm md:text-base" +
            (isActive ? " bg-black/[0.2] " : "")
          }
        >
          Favorites
        </NavLink>
        {userId ? (
          <p
            onClick={handleSignOut}
            className="cursor-pointer px-2 py-1 rounded-lg text-sm md:text-base"
          >
            Logout
          </p>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              "px-2 py-1 rounded-lg  hover:ring-black text-sm md:text-base" +
              (isActive ? " bg-black/[0.2] " : "")
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
