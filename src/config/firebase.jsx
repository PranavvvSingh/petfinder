import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { doc,  getDoc, getFirestore, updateDoc, arrayRemove, arrayUnion,getDocs, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA-AdWqZstl6-yMxD_dp9g9XaYlQyQOCgo",
  authDomain: "petfinder-7411d.firebaseapp.com",
  projectId: "petfinder-7411d",
  storageBucket: "petfinder-7411d.appspot.com",
  messagingSenderId: "669995814141",
  appId: "1:669995814141:web:a5c746158cfc16a4120294",
  measurementId: "G-Q6FJPKS2YF",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const db= getFirestore(app)

// export functions 

export const fetchCollection= async() =>{
  const querySnapshot = await getDocs(collection(db, "pets"));
  const data= querySnapshot.docs.map((doc)=>{
    return { id: doc.id, data: doc.data() };
  })
  return data;
}
export const fetchPet= async(petId)=>{
  const docSnap=await getDoc(doc(db, "pets", petId));
  if(docSnap.exists()){ console.log(docSnap.data()); return docSnap.data();}
  return null;
}
export const addToStore = async (pet) => {
  const docRef = doc(db, "favorites", auth.currentUser.uid.toString());
  await updateDoc(docRef, {
    favorites: arrayUnion({
      id: pet?.id,
      name: pet?.name,
      price: pet?.price,
      image: pet?.image,
    }),
  });
};
export const removeFromStore = async (pet) => {
  const docRef = doc(db, "favorites", auth.currentUser.uid.toString());
  await updateDoc(docRef, {
    favorites: arrayRemove({
      id: pet?.id,
      name: pet?.name,
      price: pet?.price,
      image: pet?.image,
    }),
  });
};
