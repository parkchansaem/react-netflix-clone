import React from "react";
import { QueryClient } from "react-query";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./Component/Header";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <>
          <Route path="/tv/*" element={<Tv />}></Route>
          <Route path="/search/*" element={<Search />}></Route>
          <Route path="/movie/*" element={<Movie />}></Route>
          <Route path="/*" element={<Home />}></Route>
        </>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
