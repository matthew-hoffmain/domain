import React from 'react';
import {Route, Routes} from "react-router";
import './App.css';
import HomePage from "./components/pages/HomePage/HomePage";
import DictionaryPage from "./components/pages/DictionaryPage";
import RadioPage from "./components/pages/RadioPage";
import NavBar from "./components/NavBar/NavBar";
import AboutMePage from "./components/pages/AboutMePage";
import ArticlePage from "./components/pages/ArticlePage";
import MusicPlayer from "./components/MusicPlayer";
import PDFViewerPage from "./components/pages/PDFViewerPage";
import EasterEggPage from "./components/pages/EasterEggPage";
import LicensingPage from "./components/pages/LicensingPage";
import Footer from "./components/Footer";


export default function App() {
    const [showMusicPlayer, setShowMusicPlayer] = React.useState(false);
    const [isMinimized, setIsMinimized] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = React.useState(null);
    const [startingTrack, setStartingTrack] = React.useState(0);
    const topRef = React.useRef(null);

    const handleCloseMusicPlayer = () => {
        setShowMusicPlayer(false);
        setIsMinimized(false);
        setIsPlaying(false);
    };

    const handleMinimizeMusicPlayer = () => {
        setIsMinimized(true);
    };

    const handleToggleMusicPlayer = () => {
        if (!showMusicPlayer) {
            setShowMusicPlayer(true);
            setIsMinimized(false);
        } else if (isMinimized) {
            setIsMinimized(false);
        } else {
            handleCloseMusicPlayer();
        }
    };

    const handlePlayPlaylist = (playlist, trackIndex = 0) => {
        setSelectedPlaylist(playlist);
        setStartingTrack(trackIndex);
        setShowMusicPlayer(true);
        setIsMinimized(false);
    };

    return (
        <div className="App">
            <div ref={topRef} style={{ position: 'absolute', top: 0, left: 0 }} />

            <NavBar
                showMusicPlayer={showMusicPlayer}
                setShowMusicPlayer={handleToggleMusicPlayer}
                isMinimized={isMinimized}
                isPlaying={isPlaying}
                topRef={topRef}
            />

            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/about_me" element={<AboutMePage topRef={topRef}/>} />
                <Route path="/pdf/:file" element={<PDFViewerPage />} />
                <Route path="/radio" element={<RadioPage onPlayPlaylist={handlePlayPlaylist}/>} />
                <Route path="/dictionary" element={<DictionaryPage/>} />
                <Route path="/licensing" element={<LicensingPage/>} />
                <Route path="/easter_egg" element={<EasterEggPage/>} />
                <Route path="/articles/:id" element={<ArticlePage/>}/>
            </Routes>

            <Footer />

            {showMusicPlayer && (
                <MusicPlayer
                    onClose={handleCloseMusicPlayer}
                    onMinimize={handleMinimizeMusicPlayer}
                    isMinimized={isMinimized}
                    onPlayingStateChange={setIsPlaying}
                    playlist={selectedPlaylist}
                    startingTrack={startingTrack}
                />
            )}
        </div>
      )
}