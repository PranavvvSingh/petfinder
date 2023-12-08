import React from "react";
import "./App.css";
import Collection from "./components/Collection";
import Login from "./components/Login";
import Layout from "./components/Layout"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pet from "./components/Pet";
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Collection />} />
            <Route path="login" element={<Login />} />
            <Route path="pet/:petId" element={<Pet />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
