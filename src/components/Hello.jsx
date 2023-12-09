import React, { useEffect } from 'react'
import {auth} from "../config/firebase"
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from "../config/firebase";
import { collection, getDoc, getDocs, setDoc, doc } from "firebase/firestore";


const Hello = () => {
  const user = useSelector((state) => state.auth.user);
const docRef = doc(db, "favorites", "qO6SOUjLURwt41H9Kdmu");

  // useEffect(()=>{
  //   const func= async()=>{
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) console.log(docSnap.data())
  //     else console.error("error")
  //   }
  //   func()
  // },[])
  return (
    <>
      <div>Hello</div>
      <div>{user!==null?user:"empty"}</div>
    </>
  );
}

export default Hello