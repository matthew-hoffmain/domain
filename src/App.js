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

export default function App() {
  const navigate = useNavigate();
  const { highlightEnabled, toggleHighlight } = useHighlight();

  return (
    <div className="App">

        <Container className="TitleBar" maxWidth="md">
            <Box display="flex" alignItems="center" justifyContent="space-between">

                <h1 style={{ fontFamily: 'Times New Roman', margin: 0, flex: 1, textAlign: 'center' }}>
                    HOFFMA<span className="blink-letter">I</span>N
                </h1>
                <Box display="flex" alignItems="center" gap={1}>
                    <Tooltip title={highlightEnabled ? "Disable highlights" : "Enable highlights"}>
                        <IconButton
                            onClick={toggleHighlight}
                            color="black"
                            aria-label="toggle highlights"
                        >
                            {highlightEnabled ? <HighlightIcon /> : <HighlightOffIcon />}
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