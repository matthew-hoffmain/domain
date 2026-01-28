import React, { useState } from "react";
import {Container, Typography, Box, IconButton, Button, useTheme, useMediaQuery} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import MarkdownWithTooltips from '../../MarkdownWithTooltips';
import HighlightImage from '../../HighlightImage';
import "./HomePage.css";
import highlightBackgroundImage from "../../../static/image/Boston_from_the_Longfellow.jpeg";
import articlesDict from "../../../static/json/articles.json"
import ExampleImagePage from "../ExampleImageUsage";

const defaultColors = [
    "#3498db", // Blue
    "#9b59b6", // Purple
    "#e74c3c", // Red
    "#2ecc71", // Green
    "#f39c12", // Orange
    "#1abc9c", // Turquoise
    "#e91e63", // Pink
    "#ff5722", // Deep Orange
    "#00bcd4", // Cyan
    "#673ab7", // Deep Purple
    "#009688", // Teal
    "#ff9800", // Amber
    "#795548", // Brown
    "#607d8b", // Blue Grey
    "#4caf50", // Light Green
    "#ffc107", // Yellow
    "#8bc34a", // Lime
    "#cddc39", // Lime Yellow
    "#ff6f00", // Dark Orange
    "#d32f2f"  // Dark Red
];

const processedArticles = articlesDict.map((article, index) => ({
    ...article,
    category: article.category || "Article",
    color: article.color || defaultColors[index % defaultColors.length],
    link: article.link || `/articles/${article.id}`
}));

export default function HomePage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageInfoHovered, setImageInfoHovered] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % processedArticles.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + processedArticles.length) % processedArticles.length);
    };

    const currentArticle = processedArticles[currentIndex];

    return (
        <Container maxWidth={'100%'} sx={{ mt: 8, mb: 6 }}>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <HighlightImage
                        imageSrc={highlightBackgroundImage}
                        imageTitle="Boston from the Longfellow Bridge"
                        imageCreator="Matthew Hoffman"
                        licenseUrl="https://creativecommons.org/licenses/by/4.0/"
                        licenseText="CC BY 4.0 License"
                        downloadFileName="Boston_from_the_Longfellow.jpeg"
                        height={isMobile ? 350 : 500}
                        onInfoHoverChange={setImageInfoHovered}
                    >
                <Box sx={{
                    position: 'absolute',
                    top: { xs: 10, md: 20 },
                    left: 0,
                    right: 0,
                    px: { xs: 1, md: 2 }
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 1, md: 3 },
                        maxWidth: '1000px',
                        mx: 'auto'
                    }}>
                        <IconButton
                            onClick={handlePrev}
                            sx={{
                                flexShrink: 0,
                                backgroundColor: 'background.paper',
                                boxShadow: 2,
                                opacity: imageInfoHovered ? 0 : 1,
                                minWidth: 44,
                                minHeight: 44,
                                width: { xs: 40, md: 48 },
                                height: { xs: 40, md: 48 },
                                '&:hover': {
                                    backgroundColor: 'background.paper',
                                    boxShadow: 4,
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.2s'
                            }}
                            aria-label="Previous article"
                        >
                            <ArrowBackIosNewIcon sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }} />
                        </IconButton>

                        <Box sx={{
                            flexGrow: 1,
                            overflow: 'hidden',
                            position: 'relative',
                            height: { xs: '300px', md: '450px' },
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 1,
                            opacity: imageInfoHovered ? 0 : .9,
                            transition: 'opacity 0.2s'
                        }}>
                            <Box
                                sx={{
                                    backgroundColor: 'background.paper',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    boxShadow: 3,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative'
                                }}
                            >
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: 20,
                                    backgroundColor: currentArticle.color,
                                    zIndex: 1
                                }} />

                                <Box sx={{
                                    p: { xs: 2, sm: 3, md: 5 },
                                    pb: { xs: 8, md: 10 },
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative'
                                }}>
                                    {/*<Box sx={{ mb: { xs: 1.5, md: 3 } }}>*/}
                                    {/*    <Typography*/}
                                    {/*        component="span"*/}
                                    {/*        sx={{*/}
                                    {/*            display: 'inline-block',*/}
                                    {/*            px: { xs: 1.5, md: 2 },*/}
                                    {/*            py: 0.5,*/}
                                    {/*            borderRadius: 2,*/}
                                    {/*            backgroundColor: currentArticle.color,*/}
                                    {/*            color: 'white',*/}
                                    {/*            fontSize: { xs: '0.75rem', md: '0.875rem' },*/}
                                    {/*            fontWeight: 600,*/}
                                    {/*            textTransform: 'uppercase',*/}
                                    {/*            letterSpacing: 0.5*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        {currentArticle.category}*/}
                                    {/*    </Typography>*/}
                                    {/*</Box>*/}

                                    <Box component="span" className="article-title">
                                        <Typography
                                            variant="h3"
                                            component="h2"
                                            gutterBottom
                                            sx={{
                                                fontWeight: 700,
                                                mb: { xs: 1, md: 2 },
                                                lineHeight: 1.1,
                                                fontFamily: 'Times New Roman, serif',
                                                fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }
                                            }}
                                        >
                                            {currentArticle.title}
                                        </Typography>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        gap: { xs: 1, md: 1 },
                                        flexWrap: 'wrap',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: { xs: '0.75rem', md: '0.875rem' }
                                            }}
                                        >
                                            Written by {currentArticle.author} - {currentArticle.date}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            fontSize: { xs: '0.875rem', md: '2rem' },
                                            lineHeight: 1.4,
                                            flexGrow: 1,
                                            display: { xs: 'none', md: 'flex' },
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center',
                                            px: { md: 2 },
                                            py: { md: 3 }
                                        }}
                                    >
                                        <MarkdownWithTooltips color="text.secondary"
                                                              sx={{
                                                                  fontSize: { xs: '1rem', md: '1.15rem' }
                                                              }}>
                                            {currentArticle.excerpt}
                                        </MarkdownWithTooltips>
                                    </Box>

                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        mt: { xs: 3, md: 0 }
                                    }}>
                                        <Button
                                            variant="contained"
                                            onClick={() => navigate(currentArticle.link)}
                                            sx={{
                                                backgroundColor: currentArticle.color,
                                                color: 'white',
                                                px: { xs: 2, md: 3 },
                                                py: { xs: 0.75, md: 1 },
                                                fontSize: { xs: '0.875rem', md: '1rem' },
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                borderRadius: 2,
                                                minHeight: 44,
                                                '&:hover': {
                                                    backgroundColor: currentArticle.color,
                                                    opacity: 0.9,
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: 3
                                                },
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {currentArticle.buttonText}
                                        </Button>
                                    </Box>

                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: { xs: 5, md: 15 },
                                        left: 0,
                                        right: 0,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: { xs: 1, md: 1.5 },
                                        alignItems: 'center'
                                    }}>
                                        {processedArticles.map((article, index) => (
                                            <Box
                                                key={index}
                                                onClick={() => {
                                                    if (index !== currentIndex) {
                                                        setCurrentIndex(index);
                                                    }
                                                }}
                                                sx={{
                                                    width: { xs: 44, md: 44 },
                                                    height: { xs: 44, md: 44 },
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    '&::after': {
                                                        content: '""',
                                                        width: index === currentIndex ? { xs: 24, md: 32 } : { xs: 10, md: 12 },
                                                        height: { xs: 10, md: 12 },
                                                        borderRadius: 6,
                                                        backgroundColor: index === currentIndex
                                                            ? currentArticle.color
                                                            : 'action.disabled',
                                                        transition: 'all 0.3s',
                                                        display: 'block',
                                                    },
                                                    '&:hover::after': {
                                                        backgroundColor: index === currentIndex
                                                            ? currentArticle.color
                                                            : 'action.selected'
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <IconButton
                            onClick={handleNext}
                            sx={{
                                flexShrink: 0,
                                backgroundColor: 'background.paper',
                                boxShadow: 2,
                                opacity: imageInfoHovered ? 0 : 1,
                                minWidth: 44,
                                minHeight: 44,
                                width: { xs: 40, md: 48 },
                                height: { xs: 40, md: 48 },
                                '&:hover': {
                                    backgroundColor: 'background.paper',
                                    boxShadow: 4,
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.2s'
                            }}
                            aria-label="Next article"
                        >
                            <ArrowForwardIosIcon sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }} />
                        </IconButton>
                    </Box>
                </Box>
            </HighlightImage>
                </motion.div>
            </AnimatePresence>
        </Container>
    );
}