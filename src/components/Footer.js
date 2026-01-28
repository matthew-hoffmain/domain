import React from 'react';
import { Box, Container, Typography, Stack, Divider } from '@mui/material';
import { useNavigate } from 'react-router';
import { useThemeMode } from './contexts/ThemeContext';
import CodeIcon from '@mui/icons-material/Code';
import GavelIcon from '@mui/icons-material/Gavel';
import DescriptionIcon from '@mui/icons-material/Description';
import ExternalLinkModal from './ExternalLinkModal';

export default function Footer() {
    const { isDarkMode } = useThemeMode();
    const navigate = useNavigate();

    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
                py: 2.5,
                px: 2,
                width: '100%',
                backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
                borderTop: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
            }}
        >
            <Container maxWidth={false} sx={{ maxWidth: '100%', px: 4 }}>
                <Stack spacing={1.5}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: isDarkMode ? '#a0a0a0' : '#666',
                                maxWidth: 800,
                                mx: 'auto',
                            }}
                        >
                            This website is built to serve as an exemplary domain comprised solely of content
                            that is freely redistributable, from art and music to open-source software.
                        </Typography>
                    </Box>

                    <Divider sx={{ borderColor: isDarkMode ? '#333' : '#e0e0e0', my: 0.5 }} />

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={3}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <ExternalLinkModal
                            href="https://github.com/matthew-hoffmain/domain"
                            title="GitHub Repository"
                            message="This will open the GitHub repository for this website in a new tab. All source code is available under the MIT License."
                        >
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{
                                    cursor: 'pointer',
                                    color: isDarkMode ? '#90caf9' : '#1976d2',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    }
                                }}
                            >
                                <CodeIcon />
                                <Typography sx={{ fontWeight: 500 }}>
                                    View Source on GitHub
                                </Typography>
                            </Stack>
                        </ExternalLinkModal>

                        <ExternalLinkModal
                            href="https://opensource.org/licenses/MIT"
                            title="MIT License"
                            message="This will open the MIT License page in a new tab. This license allows anyone to use, modify, and distribute the code."
                        >
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{
                                    cursor: 'pointer',
                                    color: isDarkMode ? '#90caf9' : '#1976d2',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    }
                                }}
                            >
                                <GavelIcon />
                                <Typography sx={{ fontWeight: 500 }}>
                                    MIT License
                                </Typography>
                            </Stack>
                        </ExternalLinkModal>

                        <ExternalLinkModal
                            href="https://creativecommons.org/licenses/by/4.0/"
                            title="Creative Commons Attribution 4.0"
                            message="This will open the Creative Commons BY 4.0 License page in a new tab. All media on this site is licensed under CC BY 4.0 or is in the public domain."
                        >
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{
                                    cursor: 'pointer',
                                    color: isDarkMode ? '#90caf9' : '#1976d2',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    }
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    CC
                                </Typography>
                                <Typography sx={{ fontWeight: 500 }}>
                                    CC BY 4.0 Media
                                </Typography>
                            </Stack>
                        </ExternalLinkModal>
                    </Stack>

                    <Box sx={{ textAlign: 'center' }}>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            justifyContent="center"
                            onClick={() => navigate('/licensing')}
                            sx={{
                                cursor: 'pointer',
                                color: isDarkMode ? '#90caf9' : '#1976d2',
                                display: 'inline-flex',
                                '&:hover': {
                                    textDecoration: 'underline',
                                }
                            }}
                        >
                            <DescriptionIcon />
                            <Typography sx={{ fontWeight: 500 }}>
                                View Full Licensing & Usage Information
                            </Typography>
                        </Stack>
                    </Box>

                    <Divider sx={{ borderColor: isDarkMode ? '#333' : '#e0e0e0', my: 0.5 }} />

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: isDarkMode ? '#a0a0a0' : '#666',
                                mb: 0.5,
                            }}
                        >
                            Built with React & Material-UI • Hosted on GitHub Pages
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: isDarkMode ? '#a0a0a0' : '#666',
                            }}
                        >
                            All content is freely redistributable under their respective licenses
                        </Typography>
                    </Box>

                    <Box sx={{ textAlign: 'center', mt: 0.5 }}>
                        <Typography
                            variant="caption"
                            sx={{
                                color: isDarkMode ? '#666' : '#999',
                            }}
                        >
                            © {new Date().getFullYear()} Matthew Hoffman • Free to use, modify, and distribute
                        </Typography>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
