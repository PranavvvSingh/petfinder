import React from "react";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Collection />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup/>} />
          <Route path="pet/:petId" element={<RequireAuth><Pet /></RequireAuth>} />
          <Route path="saved" element={<RequireAuth><Saved /></RequireAuth>} />
          <Route path="hello" element={<Hello />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
