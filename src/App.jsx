import { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Countries from "./pages/Countries";
import Country from "./pages/Country";
import Home from "./pages/Home";
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
