import React from 'react';
import {Route, Routes, useNavigate} from "react-router";
import './App.css';
import SandboxPage from "./components/pages/SandboxPage";
import AboutThisWebsitePage from "./components/pages/AboutThisWebsitePage";
import HomePage from "./components/pages/HomePage";
import DictionaryPage from "./components/pages/DictionaryPage";
import {Box, Container, IconButton, Tooltip} from "@mui/material";
import {useHighlight} from "./components/contexts/HighlightContext";
import HighlightIcon from '@mui/icons-material/Highlight';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import GitHubIcon from '@mui/icons-material/GitHub';
import ExternalLinkModal from "./components/ExternalLinkModal";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicPlayer from "./components/MusicPlayer";

const playlists = [
    {
        id: 'chopin',
        name: 'Set Chopin Free',
        description: 'A set of my personal favorite Chopin pieces, recorded as part of Musopen\'s "Set Chopin Free" Kickstarter Project.',
        tracks: [
            {
                title: "Nocturne Op. 55 No. 1 in F minor",
                artist: "Frederic Chopin",
                src: "https://www.classicals.de/s/Classicalsde-Chopin-Nocturne-in-F-minor-Op-55-No-1.mp3",
                license: {
                    type: "Non-Commercial License",
                    url: "https://www.classicals.de/chopin-collection"
                }
            },
            {
                title: "Nocturne Op. 9 No. 1 in B-flat minor",
                artist: "Frederic Chopin",
                src: "https://www.quantumdigitalmedia.de/Classicals-Music/Chopin%20-%20Collection/Classicals.de%20-%20Chopin%20-%20Nocturne%20Op.%209%20no.%201%20in%20B-flat%20minor.mp3",
                license: {
                    type: "Non-Commercial License",
                    url: "https://www.classicals.de/chopin-collection"
                }
            },
        ]
    },
];

export default function App() {
  const navigate = useNavigate();
  const { highlightEnabled, toggleHighlight } = useHighlight();
  const [showMusicPlayer, setShowMusicPlayer] = React.useState(false);

  return (
    <div className="App">

        <Container className="TitleBar" maxWidth="md">
            <Box display="flex" alignItems="center" justifyContent="center" position="relative">

                <h1 style={{ fontFamily: 'Times New Roman', margin: 0 }}>
                    HOFFMA<span className="blink-letter">I</span>N
                </h1>
                <Box display="flex" alignItems="center" gap={1} position="absolute" right={0}>
                    <Tooltip title={highlightEnabled ? "Disable highlights" : "Enable highlights"}>
                        <IconButton
                            onClick={toggleHighlight}
                            color="black"
                            aria-label="toggle highlights"
                        >
                            {highlightEnabled ? <HighlightIcon /> : <HighlightOffIcon />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={showMusicPlayer ? "Hide music player" : "Show music player"}>
                        <IconButton
                            onClick={() => setShowMusicPlayer(!showMusicPlayer)}
                            color={showMusicPlayer ? "primary" : "default"}
                            aria-label="toggle music player"
                        >
                            <MusicNoteIcon />
                        </IconButton>
                    </Tooltip>

                    <ExternalLinkModal
                        href="https://github.com/matthew-hoffmain/domain"
                        title="GitHub Repository"
                        message="This will open the GitHub repository for this website in a new tab."
                    >
                        <Tooltip title="View source code on GitHub">
                            <IconButton
                                color="black"
                                aria-label="github"
                            >
                                <GitHubIcon />
                            </IconButton>
                        </Tooltip>
                    </ExternalLinkModal>
                </Box>
            </Box>
        </Container>

        {showMusicPlayer && (
            <Container maxWidth="md" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <MusicPlayer playlists={playlists} />
            </Container>
        )}

        <Box marginBottom={2}>
            <button onClick={() => navigate('/')}>
                Homepage
            </button>
            <button onClick={() => navigate('/about_this_website')}>
                About this Website
            </button>
            <button onClick={() => navigate('/dictionary')}>
                Dictionary
            </button>
            <button onClick={() => navigate('/sandbox')}>
                Enter sandbox!
            </button>
        </Box>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/about_this_website" element={<AboutThisWebsitePage/>} />
            <Route path="/dictionary" element={<DictionaryPage/>} />
            <Route path="/sandbox" element={<SandboxPage/>}/>
        </Routes>
    </div>
  )
}