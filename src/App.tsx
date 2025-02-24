import React from "react";
import Homepage from "./pages/homepage";
import { Route, Routes } from "react-router-dom";
import Notfound from "./pages/notfound";
import Movies from "./pages/movies";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
