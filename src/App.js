import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCadidate from "./components/AddCandiate";
import { Header } from "./components/Header";
import Home from "./components/Home";
import Register from "./components/Register";
import Signin from "./components/Signin";
import Voters from "./components/Vote";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/addCandidate" element={<AddCadidate />} />
          <Route path="/voters" element={<Voters />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
