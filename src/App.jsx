import { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Countries from "./components/Countries";
import Country from "./components/Country";
import Home from "./components/Home";
import Nav from "./components/Nav";

function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:id" element={<Country />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
