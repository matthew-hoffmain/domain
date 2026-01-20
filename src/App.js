import React from 'react';
import {Route, Routes, useNavigate} from "react-router";
import './App.css';
import SandboxPage from "./components/pages/SandboxPage";
import AboutThisWebsitePage from "./components/pages/AboutThisWebsitePage";
import HomePage from "./components/pages/HomePage";
import DictionaryPage from "./components/pages/DictionaryPage";
import {Box, Container, IconButton, Tooltip} from "@mui/material";
import {useHighlight} from "./components/contexts/HighlightContext";
import NavBar from "./components/NavBar/NavBar";
import AboutMePage from "./components/pages/AboutMePage";
import TestArticle from "./components/pages/Articles/TestArticle";


export default function App() {

  return (
    <div className="App">

        <NavBar/>

        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about_me" element={<AboutMePage/>} />
            <Route path="/about_this_website" element={<AboutThisWebsitePage/>} />
            <Route path="/dictionary" element={<DictionaryPage/>} />
            <Route path="/sandbox" element={<SandboxPage/>}/>
            <Route path="/articles/1" element={<TestArticle/>}/>
        </Routes>


    </div>
  )
}