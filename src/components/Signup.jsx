import React, { useState } from "react";
import { MdOutlinePets as Logo } from "react-icons/md";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { set } from "../features/favorites";
import { useNavigate } from "react-router-dom";
import { setPending } from "../features/auth";
import Loader from "../components/Loader";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isPending = useSelector((state) => state.auth.isPending);

  async function signIn(e) {
    e.preventDefault();
    try {
      dispatch(setPending(true));
      await createUserWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, "favorites", auth.currentUser.uid.toString());
      await setDoc(docRef, {});
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setPending(false));
      navigate("/");
    }
  }
  async function signInWithGoogle(e) {
    e.preventDefault();
    try {
      dispatch(setPending(true));
      const data = await signInWithPopup(auth, googleProvider);

      const docRef = doc(db, "favorites", data.user.uid.toString());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().favorites) dispatch(set(docSnap.data().favorites));
      } else {
        await setDoc(docRef, {});
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setPending(false));
      navigate("/");
    }
  }
  if (isPending) return <Loader />;
  else
    return (
      <div className="flex justify-center items-center mt-[50px]">
        <form
          action=""
          className="w-[350px] mx-auto flex flex-col  justify-center p-5 border-2 border-amber-500 rounded-xl"
        >
          <h1 className="text-center text-3xl flex justify-center items-center mb-5">
            <Logo className="" />
            PetFinder
          </h1>
          <input
            type="text"
            size={1}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-5 rounded-lg p-2 bg-transparent border border-amber-500 outline-none"
          />
          <input
            type="password"
            size={1}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-5 rounded-lg p-2 bg-transparent border border-amber-500 outline-none"
          />
          <button
            className="mb-5 bg-amber-500 p-2 rounded-xl"
            onClick={(e) => signIn(e)}
          >
            Sign Up
          </button>
          <hr className="bg-neutral-200 h-[2px]   mb-5" />
          <button
            className="bg-amber-500 p-2 rounded-xl flex items-center justify-center gap-2"
            onClick={(e) => signInWithGoogle(e)}
          >
            <FaGoogle />
            Sign In With Google
          </button>
        </form>
      </div>
    );
};

export default Signup;
