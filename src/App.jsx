import React, { useEffect } from "react";
import "./App.css";
import Collection from "./components/Collection";
import Login from "./components/Login";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pet from "./components/Pet";
import Saved from "./components/Saved";
import Hello from "./components/Hello";
import RequireAuth from "./components/RequireAuth";
import Signup from "./components/Signup";
import { useDispatch } from "react-redux";
import { auth } from "./config/firebase";
import { login } from "./features/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login());
        console.log("user is logging in (from listener)");
      } else {
        console.log("user is logging out (from listener)");
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Collection />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="pet/:petId"
            element={
              <RequireAuth>
                <Pet />
              </RequireAuth>
            }
          />
          <Route
            path="saved"
            element={
              <RequireAuth>
                <Saved />
              </RequireAuth>
            }
          />
          <Route path="hello" element={<Hello />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
