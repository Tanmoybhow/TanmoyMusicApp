import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import Search from "./components/Search.jsx"
import PlayList from "./components/PlayList.jsx"
import Liked from "./components/Liked.jsx"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
        <Route index element={<Home/>} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/playlist" element={<PlayList/>}/>
        <Route path="/liked" element={<Liked/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
