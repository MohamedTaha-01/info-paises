import { Routes, Route } from "react-router-dom";
import Countries from "./pages/Countries";
import Country from "./pages/Country";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import { createContext } from "react";
import { useMediaQuery } from "react-responsive";

export const ScreenSizeContext = createContext(false);

function App() {
  // useMediaQuery({ maxWidth: 720 });

  return (
    <div className="App">
      <ScreenSizeContext.Provider value={useMediaQuery({ maxWidth: 720 })}>
        <Nav />
        <Routes>
          <Route exact path="/countries" element={<Countries />} />
          <Route exact path="/countries/:id" element={<Country />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </ScreenSizeContext.Provider>
    </div>
  );
}

export default App;
