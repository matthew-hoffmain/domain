import React, { useEffect } from 'react';
import { Container, Typography, Box, Stack, Divider, Link } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MarkdownWithTooltips from '../MarkdownWithTooltips';
import { useThemeMode } from '../contexts/ThemeContext';

export default function LicensingPage() {
    const { isDarkMode } = useThemeMode();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const freedoms = [
        "Use all content for personal or commercial purposes",
        "Modify, adapt, and build upon the content",
        "Redistribute and share the content freely",
        "Fork and customize the source code",
        "Learn from the code and implementation",
    ];

    return (
        <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        align="center"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            lineHeight: 1.2,
                            fontFamily: 'Times New Roman, serif',
                        }}
                    >
                        Licensing & Usage
                    </Typography>

                    <Divider sx={{ mb: 4 }} />

                    {/* Introduction */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="body1" paragraph align="justify">
                            <MarkdownWithTooltips>
                                This website is built to serve as an exemplary domain comprised solely of content that is freely redistributable.
                                Everything you find here—from the source code to the images, music, and written content—is available for you to use,
                                modify, and redistribute under [[open-source]] and [[Creative Commons]] licenses.
                            </MarkdownWithTooltips>
                        </Typography>
                    </Box>

                    {/* What You Can Do */}
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                fontFamily: 'Times New Roman, serif',
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            What You Can Do
                        </Typography>
                        <Stack spacing={1.5}>
                            {freedoms.map((freedom, index) => (
                                <Stack key={index} direction="row" spacing={1.5} alignItems="flex-start">
                                    <CheckCircleIcon
                                        sx={{
                                            color: isDarkMode ? '#4caf50' : '#2e7d32',
                                            mt: 0.5,
                                            flexShrink: 0,
                                        }}
                                    />
                                    <Typography variant="body1">{freedom}</Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    {/* Source Code License */}
                    <Box sx={{ mb: 4 }}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                            <CodeIcon sx={{ color: isDarkMode ? '#90caf9' : '#1976d2' }} />
                            <Typography
                                variant="h5"
                                sx={{
                                    fontFamily: 'Times New Roman, serif',
                                    fontWeight: 600,
                                }}
                            >
                                Source Code
                            </Typography>
                        </Stack>
                        <Typography variant="body1" paragraph align="justify">
                            <MarkdownWithTooltips>
                                All source code for this website is licensed under the **[[MIT License]]**, one of the most permissive
                                [[open-source]] licenses available. The MIT License allows you to use, copy, modify, merge, publish,
                                distribute, sublicense, and/or sell copies of the software without restriction.
                            </MarkdownWithTooltips>
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
                                p: 2,
                                borderRadius: 2,
                                border: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
                            }}
                        >
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                <strong>Requirements:</strong> Include the original copyright notice and license text in any substantial portions of the code.
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            <Link
                                href="https://github.com/matthew-hoffmain/domain"
                                target="_blank"
                                rel="noopener noreferrer"
                                underline="hover"
                                sx={{ color: isDarkMode ? '#90caf9' : '#1976d2' }}
                            >
                                View the source code on GitHub →
                            </Link>
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    {/* Media & Content License */}
                    <Box sx={{ mb: 4 }}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                            <Stack direction="row" spacing={0.5}>
                                <ImageIcon sx={{ color: isDarkMode ? '#90caf9' : '#1976d2' }} />
                                <MusicNoteIcon sx={{ color: isDarkMode ? '#90caf9' : '#1976d2' }} />
                            </Stack>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontFamily: 'Times New Roman, serif',
                                    fontWeight: 600,
                                }}
                            >
                                Media & Content
                            </Typography>
                        </Stack>
                        <Typography variant="body1" paragraph align="justify">
                            <MarkdownWithTooltips>
                                All media content on this website—including images, visual media, music, and audio files—is either
                                licensed under **[[Creative Commons Attribution 4.0]]** (CC BY 4.0) or is in the **[[public domain]]**.
                                This ensures that all creative works are freely available for use while respecting the rights of original creators.
                            </MarkdownWithTooltips>
                        </Typography>
                        <Typography variant="body1" paragraph align="justify">
                            <MarkdownWithTooltips>
                                For images and visual media, license information is accessible via the info icon when you hover over each image.
                                For music and audio files, specific licensing details are provided with each track in the music player.
                            </MarkdownWithTooltips>
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
                                p: 2,
                                borderRadius: 2,
                                border: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
                            }}
                        >
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 1 }}>
                                <strong>CC BY 4.0 Requirements:</strong> Provide attribution to the original creator, include a link to the license,
                                and indicate if changes were made.
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                <strong>Public Domain:</strong> No attribution required, but always appreciated.
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    {/* Disclaimer */}
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                fontFamily: 'Times New Roman, serif',
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            Disclaimer
                        </Typography>
                        <Box
                            sx={{
                                bgcolor: isDarkMode ? '#1a1a1a' : '#fff3cd',
                                p: 3,
                                borderRadius: 2,
                                border: `1px solid ${isDarkMode ? '#333' : '#856404'}`,
                            }}
                        >
                            <Typography variant="body2" paragraph align="justify">
                                <MarkdownWithTooltips>
                                    **This website and all its content are provided "as is" without warranty of any kind**, either express or implied,
                                    including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                                </MarkdownWithTooltips>
                            </Typography>
                            <Typography variant="body2" paragraph align="justify">
                                <MarkdownWithTooltips>
                                    In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from
                                    the use of this website or its content.
                                </MarkdownWithTooltips>
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                fontFamily: 'Times New Roman, serif',
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            External Links
                        </Typography>
                        <Typography variant="body1" paragraph align="justify">
                            <MarkdownWithTooltips>
                                This website contains links to external sites. We are not responsible for the content, privacy practices,
                                or licensing of external websites. When you click an external link, a confirmation modal will appear to
                                inform you that you are leaving this site.
                            </MarkdownWithTooltips>
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    {/* Questions */}
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Times New Roman, serif' }}>
                            Questions About Licensing?
                        </Typography>
                        <Typography variant="body1">
                            <MarkdownWithTooltips>
                                Check out the **[[FAQ]]** page or visit [Choose a License](https://choosealicense.com/) for more information
                                about open-source licensing.
                            </MarkdownWithTooltips>
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            bgcolor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
                            p: 3,
                            borderRadius: 2,
                            border: `2px solid ${isDarkMode ? '#90caf9' : '#1976d2'}`,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                            <MarkdownWithTooltips>
                                **Remember:** You can borrow, modify, and alter anything you find here, but you can't steal anything because
                                it already belongs to you. The only requirement is that you comply with the terms of the respective licenses.
                            </MarkdownWithTooltips>
                        </Typography>
                    </Box>
                </motion.div>
            </AnimatePresence>
        </Container>
    );
}
