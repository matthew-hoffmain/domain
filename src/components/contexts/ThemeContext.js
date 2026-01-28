import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const HighlightContext = createContext();
const ThemeContext = createContext();

export const useHighlight = () => {
    const context = useContext(HighlightContext);
    if (context === undefined) {
        throw new Error('useHighlight must be used within a HighlightProvider');
    }
    return context;
};

export const useThemeMode = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeMode must be used within a ThemeContextProvider');
    }
    return context;
};

export const HighlightProvider = ({ children }) => {
    const [highlightEnabled, setHighlightEnabled] = useState(true);

    const toggleHighlight = () => {
        setHighlightEnabled(prev => !prev);
    };

    const value = {
        highlightEnabled,
        toggleHighlight,
        setHighlightEnabled
    };

    return (
        <HighlightContext.Provider value={value}>
            {children}
        </HighlightContext.Provider>
    );
};

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(
        () =>
            createTheme({
                typography: {
                    fontFamily: "sans-serif, 'Times New Roman'",
                    h1: {
                        fontFamily: "'Times New Roman', Times, serif",
                        color: mode === 'light' ? '#333' : '#e0e0e0',
                    },
                    h2: {
                        fontFamily: "'Times New Roman', Times, serif",
                        color: mode === 'light' ? '#333' : '#e0e0e0',
                    },
                    h3: {
                        fontFamily: "'Times New Roman', Times, serif",
                        color: mode === 'light' ? '#333' : '#e0e0e0',
                    },
                    h4: {
                        fontFamily: "'Times New Roman', Times, serif",
                        color: mode === 'light' ? '#333' : '#e0e0e0',
                    },
                    h5: {
                        fontFamily: "'Times New Roman', Times, serif",
                        color: mode === 'light' ? '#333' : '#e0e0e0',
                    },
                    h6: {
                        fontFamily: "'Times New Roman', Times, serif",
                        color: mode === 'light' ? '#333' : '#e0e0e0',
                    },
                    overline: {
                        fontFamily: "'Times New Roman', Times, serif",
                    },
                },
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            primary: {
                                main: '#1976d2',
                            },
                            background: {
                                default: '#ffffff',
                                paper: '#f5f5f5',
                            },
                            text: {
                                primary: '#000000',
                                secondary: '#666666',
                            },
                        }
                        : {
                            primary: {
                                main: '#90caf9',
                            },
                            background: {
                                default: '#0a0a0a',
                                paper: '#1a1a1a',
                            },
                            text: {
                                primary: '#e0e0e0',
                                secondary: '#a0a0a0',
                            },
                        }),
                },
            }),
        [mode]
    );

    const value = {
        mode,
        toggleTheme,
        isDarkMode: mode === 'dark',
    };

    return (
        <ThemeContext.Provider value={value}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

