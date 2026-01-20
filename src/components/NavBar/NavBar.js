import React from "react";
import {Box, Container, IconButton, Paper, Tooltip} from "@mui/material";
import HighlightIcon from "@mui/icons-material/Highlight";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {useHighlight} from "../contexts/HighlightContext";
import GitHubIcon from '@mui/icons-material/GitHub';
import ExternalLinkModal from "../ExternalLinkModal";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicPlayer from "../MusicPlayer";
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import RadioIcon from '@mui/icons-material/Radio';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import AbcIcon from '@mui/icons-material/Abc';
import {useNavigate} from "react-router";
import './NavBar.css';
import MarkdownWithTooltips from "../MarkdownWithTooltips";

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

export default function NavBar() {
    const { highlightEnabled, toggleHighlight } = useHighlight();
    const [showMusicPlayer, setShowMusicPlayer] = React.useState(false);
    const navigate = useNavigate();

    return <Box display="flex" sx={{ padding: -5, marginBottom: -5 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
            <Paper display="flex" alignItems="center" gap={1} sx={{ flex: '1 1 0', padding: 1, justifyContent: 'flex-start' }}>
                <Tooltip title="Home">
                    <IconButton
                        onClick={() => navigate('/')}
                        bgColor="black"
                        aria-label="home"
                    >
                        <HomeIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="About Me">
                    <IconButton
                        onClick={() => navigate('/about_me')}
                        color="black"
                        aria-label="about"
                    >
                        <PersonIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="About This Website">
                    <IconButton
                        variant="outlined"
                        onClick={() => navigate('/about_this_website')}
                        color="black"
                        aria-label="about"
                    >
                        <ForumIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Articles">
                    <IconButton
                        onClick={() => navigate('/articles')}
                        color="black"
                        aria-label="about"
                    >
                        <ArticleIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Radio">
                    <IconButton
                        onClick={() => navigate('/radio')}
                        color="black"
                        aria-label="sandbox"
                    >
                        <RadioIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Dictionary">
                    <IconButton
                        onClick={() => navigate('/dictionary')}
                        color="black"
                        aria-label="dictionary"
                    >
                        <AbcIcon/>
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
            </Paper>

            <Tooltip
                title={<Box sx={{ maxWidth: 600, whiteSpace: 'normal' }}>
                    <MarkdownWithTooltips>{'The personal website of Matthew Hoffman. "Hoffmain" is a [[portmanteau]] of the last name "Hoffman" and the word "main", which in software marks the entry point for a program\'s execution. The website functions similarly as an entryway.'}</MarkdownWithTooltips>
                </Box>}
                placement="bottom"
                arrow
                slotProps={{
                    tooltip: {
                        sx: {
                            bgcolor: '#333',
                            color: 'white',
                            fontSize: '0.875rem',
                            maxWidth: 600,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            '& .MuiTooltip-arrow': {
                                color: '#333',
                            },
                        },
                    },
                }}
            >
                <Paper sx={{ flex: '1 1 0', padding: 1, display: 'flex', justifyContent: 'center' }}>
                    <h1 className="navbar-title" onClick={() => navigate('/')}>
                        HOFFMAiN
                    </h1>
                </Paper>
            </Tooltip>

            <Paper display="flex" alignItems="center" gap={1} sx={{ flex: '1 1 0', padding: 1, justifyContent: 'flex-end' }}>
                <Tooltip title={highlightEnabled ? "Disable highlights" : "Enable highlights"}>
                    <IconButton
                        onClick={toggleHighlight}
                        sx={{ color: highlightEnabled ? 'green' : 'red' }}
                        aria-label="toggle highlights"
                    >
                        {highlightEnabled ? <HighlightIcon /> : <HighlightOffIcon />}
                    </IconButton>
                </Tooltip>
                <Tooltip title={showMusicPlayer ? "Hide music player" : "Show music player"}>
                    <IconButton
                        onClick={() => setShowMusicPlayer(!showMusicPlayer)}
                        sx={{ color: showMusicPlayer ? 'green' : 'red' }}
                        aria-label="toggle music player"
                    >
                        <MusicNoteIcon />
                    </IconButton>
                </Tooltip>
            </Paper>
        </Box>

        {showMusicPlayer && (
            <Container maxWidth="md" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <MusicPlayer playlists={playlists} />
            </Container>
        )}
    </Box>
}