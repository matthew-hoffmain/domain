import Container from "@mui/material/Container";
import React from "react";
import MyTimeline from "../MyTimeline";
import Box from "@mui/material/Box";
import profileImage from '../../static/image/Blue_Steel_Matthew_Hoffman.jpeg';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from "../contexts/ThemeContext";

export default function AboutMePage({ topRef }) {
    const { isDarkMode } = useThemeMode();

    return (
        <Container
            maxWidth="lg"
            component="main"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 2, md: 4 },
                mt: { xs: 6, md: 8 },
                mb: 5,
                px: { xs: 2, md: 3 }
            }}
        >
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Box
                            component="img"
                            src={profileImage}
                            alt="Portrait"
                            sx={{
                                width: { xs: 200, sm: 250, md: 300 },
                                height: { xs: 200, sm: 250, md: 300 },
                                borderRadius: '50%',
                                objectFit: 'cover',
                                objectPosition: '50% 0%',
                                boxShadow: 5,
                                mb: { xs: 3, md: 5 },
                            }}
                        />
                        {isDarkMode && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: { xs: 200, sm: 250, md: 300 },
                                    height: { xs: 200, sm: 250, md: 300 },
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    pointerEvents: 'none',
                                }}
                            />
                        )}
                    </Box>

                    <MyTimeline topRef={topRef}/>
                </motion.div>
            </AnimatePresence>
        </Container>
    );
}