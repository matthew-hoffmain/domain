import React, { useState } from "react";
import {Box, Button, Tooltip, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useTheme, useMediaQuery, Divider} from "@mui/material";
import HighlightIcon from "@mui/icons-material/Highlight";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {useHighlight} from "../contexts/ThemeContext";
import {useThemeMode} from "../contexts/ThemeContext";
import GitHubIcon from '@mui/icons-material/GitHub';
import ExternalLinkModal from "../ExternalLinkModal";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import RadioIcon from '@mui/icons-material/Radio';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import AbcIcon from '@mui/icons-material/Abc';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router";
import './NavBar.css';
import MarkdownWithTooltips from "../MarkdownWithTooltips";
import StyledTooltip from "../StyledTooltip";



export default function NavBar({ setShowMusicPlayer, showMusicPlayer, isMinimized, isPlaying, topRef }) {
    const { highlightEnabled, toggleHighlight } = useHighlight();
    const { isDarkMode, toggleTheme } = useThemeMode();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setDrawerOpen(false);
    };

    const getMusicPlayerButtonColor = () => {
        if (!showMusicPlayer) return 'red';
        if (isMinimized) return '#ffa500';
        return 'green';
    };

    const getMusicPlayerTooltip = () => {
        if (!showMusicPlayer) return "Show music player";
        if (isMinimized) return "Restore music player";
        return "Close music player";
    };

    const navButtonsConfig = [
        {
            id: 'home',
            title: 'Home',
            path: '/',
            icon: HomeIcon,
            ariaLabel: 'home'
        },
        {
            id: 'about-me',
            title: 'About Me',
            path: '/about_me',
            icon: PersonIcon,
            ariaLabel: 'about'
        },
        {
            id: 'radio',
            title: 'Radio',
            path: '/radio',
            icon: RadioIcon,
            ariaLabel: 'radio'
        },
        {
            id: 'dictionary',
            title: 'Dictionary',
            path: '/dictionary',
            icon: AbcIcon,
            ariaLabel: 'dictionary'
        },
        {
            id: 'resume',
            title: 'Resume',
            path: '/pdf/resume',
            icon: ArticleIcon,
            ariaLabel: 'articles'
        },
        {
            id: 'github',
            title: 'GitHub',
            icon: GitHubIcon,
            ariaLabel: 'github',
            external: true,
            href: 'https://github.com/matthew-hoffmain'
        }
    ];

    const navButtons = <>
        {navButtonsConfig.map((navItem) => {
            const IconComponent = navItem.icon;

            if (navItem.external) {
                return (
                    <ExternalLinkModal
                        key={navItem.id}
                        href={navItem.href}
                        title={navItem.modalTitle}
                        message={navItem.modalMessage}
                    >
                        <Tooltip title={navItem.title}>
                            <Button
                                variant='contained'
                                aria-label={navItem.ariaLabel}
                                sx={{ minWidth: 'auto', px: 1 }}
                            >
                                <IconComponent />
                            </Button>
                        </Tooltip>
                    </ExternalLinkModal>
                );
            }

            return (
                <Tooltip key={navItem.id} title={navItem.title}>
                    <Button
                        variant='contained'
                        onClick={() => navigate(navItem.path)}
                        aria-label={navItem.ariaLabel}
                        sx={{ minWidth: 'auto', px: 1 }}
                    >
                        <IconComponent />
                    </Button>
                </Tooltip>
            );
        })}
    </>

    return (
        <>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: { xs: 2, md: 5 },
                mt: { xs: 1, md: 3 },
                mb: { xs: -2, md: -4 },
                width: '100%',
                minHeight: { xs: '60px', md: '80px' }
            }}>

                {/* Mobile: Hamburger menu button on left */}
                {isMobile && (
                    <Box sx={{ position: 'absolute', left: 16 }}>
                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                },
                                minWidth: 44,
                                minHeight: 44
                            }}
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                )}

                {!isMobile && (
                    <Box sx={{
                        position: 'absolute',
                        left: 30,
                        marginBottom: 0
                    }}>
                        <Box sx={{ padding: 1, display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'nowrap' }}>
                            {navButtons}
                        </Box>
                    </Box>
                )}

                <Box sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: 0
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <h1
                            className={`navbar-title ${isDarkMode ? 'dark-mode' : ''}`}
                            onClick={() => navigate('/')}
                        >
                            HOFFMA<span className="blinking">I</span>N
                        </h1>
                    </Box>
                </Box>

                <Box sx={{
                    position: 'absolute',
                    right: { xs: 16, md: 30 },
                    marginBottom: { xs: 0, md: 2 }
                }}>
                    <Box sx={{ padding: 1, display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'nowrap' }}>
                        <StyledTooltip
                            title={
                                <Box
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('/dictionary#term-highlights');
                                    }}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': { opacity: 0.8 }
                                    }}
                                >
                                    {highlightEnabled ? "Disable highlights" : "Enable highlights"}
                                </Box>
                            }
                        >
                            <Button
                                variant='contained'
                                onClick={toggleHighlight}
                                sx={{
                                    bgcolor: highlightEnabled ? 'green' : 'red',
                                    color: 'white',
                                    minWidth: 'auto',
                                    px: 1
                                }}
                                aria-label="toggle highlights"
                            >
                                {highlightEnabled ? <HighlightIcon /> : <HighlightOffIcon />}
                            </Button>
                        </StyledTooltip>
                        <Tooltip title={getMusicPlayerTooltip()}>
                            <Button
                                variant='contained'
                                onClick={() => setShowMusicPlayer()}
                                sx={{
                                    bgcolor: getMusicPlayerButtonColor(),
                                    color: 'white',
                                    minWidth: 'auto',
                                    px: 1
                                }}
                                aria-label="toggle music player"
                            >
                                <MusicNoteIcon />
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 280,
                        pt: 2
                    }
                }}
            >
                <List>
                    {navButtonsConfig.map((navItem) => {
                        const IconComponent = navItem.icon;

                        if (navItem.external) {
                            return (
                                <ExternalLinkModal
                                    key={navItem.id}
                                    href={navItem.href}
                                    title={navItem.modalTitle}
                                    message={navItem.modalMessage}
                                >
                                    <ListItem
                                        button
                                        onClick={() => setDrawerOpen(false)}
                                        sx={{ minHeight: 48 }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 44 }}>
                                            <IconComponent />
                                        </ListItemIcon>
                                        <ListItemText primary={navItem.title} />
                                    </ListItem>
                                </ExternalLinkModal>
                            );
                        }

                        return (
                            <ListItem
                                button
                                key={navItem.id}
                                onClick={() => handleNavigation(navItem.path)}
                                sx={{ minHeight: 48 }}
                            >
                                <ListItemIcon sx={{ minWidth: 44 }}>
                                    <IconComponent />
                                </ListItemIcon>
                                <ListItemText primary={navItem.title} />
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
        </>
    );
}