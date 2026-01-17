import React from 'react';
import {Route, Routes, useNavigate} from "react-router";
import './App.css';
import SandboxPage from "./components/pages/SandboxPage";
import AboutThisWebsitePage from "./components/pages/AboutThisWebsitePage";
import HomePage from "./components/pages/HomePage";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
        <h1 style={{ fontFamily: 'Times New Roman' }}>
          HOFFMA<span className="blink-letter">I</span>N
        </h1>
        <div>
            <button onClick={() => navigate('/')}>
                Homepage
            </button>
            <button onClick={() => navigate('/about_this_website')}>
                About this Website
            </button>
            <button onClick={() => navigate('/sandbox')}>
                Enter sandbox!
            </button>
        </div>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about_this_website" element={<AboutThisWebsitePage/>} />
            <Route path="/sandbox" element={<SandboxPage/>}/>
        </Routes>
    </div>
  )
}