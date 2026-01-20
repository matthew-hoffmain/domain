import React, { useState } from "react";
import {Container, Typography, Box, IconButton, Button} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router';
import MarkdownWithTooltips from '../MarkdownWithTooltips';
import "./HomePage.css";

const mockArticles = [
    {
        id: 1,
        title: "You Can't Steal It, It's Yours",
        excerpt: "I designed this [[open-source]] website to be indefinitely accessible, reproducible, and modifiable by using standard [[highly-permissible software licenses]]. " +
            "Read about why this is important.",
        date: "January 15, 2026",
        author: "Matthew Hoffman",
        category: "Technology",
        color: "#3498db",
        readTime: "5 min read",
        buttonText: "Read Full Article",
        link: "/articles/1"
    },
    {
        id: 2,
        title: "Understanding React Hooks",
        excerpt: "A deep dive into React Hooks and how they've revolutionized the way we write React components and manage state.",
        date: "January 10, 2026",
        author: "Sarah Chen",
        category: "Development",
        color: "#9b59b6",
        readTime: "8 min read",
        buttonText: "Learn More",
        link: "/articles/2"
    },
    {
        id: 3,
        title: "Modern CSS Techniques",
        excerpt: "Discover powerful CSS features like Grid, Flexbox, and custom properties that make styling websites easier than ever.",
        date: "January 5, 2026",
        author: "Michael Brown",
        category: "Design",
        color: "#e74c3c",
        readTime: "6 min read",
        buttonText: "Explore Techniques",
        link: "/articles/3"
    },
    {
        id: 4,
        title: "Building Scalable Applications",
        excerpt: "Best practices for architecting applications that can grow with your business needs and handle increasing traffic.",
        date: "December 28, 2025",
        author: "Emily Rodriguez",
        category: "Architecture",
        color: "#2ecc71",
        readTime: "10 min read",
        buttonText: "View Best Practices",
        link: "/articles/4"
    },
    {
        id: 5,
        title: "The Art of Clean Code",
        excerpt: "Writing maintainable, readable code that your future self and teammates will thank you for.",
        date: "December 20, 2025",
        author: "David Kim",
        category: "Best Practices",
        color: "#f39c12",
        readTime: "7 min read",
        buttonText: "Discover More",
        link: "/articles/5"
    }
];

export default function HomePage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % mockArticles.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + mockArticles.length) % mockArticles.length);
    };

    const currentArticle = mockArticles[currentIndex];

    return (
        <Container maxWidth={'lg'}>
            <Box sx={{ mt: 8, mb: 6 }}>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    maxWidth: '1000px',
                    mx: 'auto'
                }}>
                    <IconButton
                        onClick={handlePrev}
                        sx={{
                            flexShrink: 0,
                            backgroundColor: 'background.paper',
                            boxShadow: 2,
                            '&:hover': {
                                backgroundColor: 'background.paper',
                                boxShadow: 4,
                                transform: 'scale(1.1)'
                            },
                            transition: 'all 0.2s'
                        }}
                        aria-label="Previous article"
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>

                    <Box sx={{
                        flexGrow: 1,
                        overflow: 'hidden',
                        position: 'relative',
                        height: '450px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 1
                    }}>
                        <Box
                            sx={{
                                backgroundColor: 'background.paper',
                                borderRadius: 3,
                                overflow: 'hidden',
                                boxShadow: 3,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Box sx={{
                                height: 20,
                                backgroundColor: currentArticle.color
                            }} />

                            <Box sx={{ p: 5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        component="span"
                                        sx={{
                                            display: 'inline-block',
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: 2,
                                            backgroundColor: currentArticle.color,
                                            color: 'white',
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            textTransform: 'uppercase',
                                            letterSpacing: 0.5
                                        }}
                                    >
                                        {currentArticle.category}
                                    </Typography>
                                </Box>

                                <Box component="span" className="article-title">
                                    <Typography
                                        variant="h3"
                                        component="h2"
                                        gutterBottom
                                        sx={{
                                            fontWeight: 700,
                                            mb: 2,
                                            lineHeight: 1.2,
                                            fontFamily: 'Times New Roman, serif'
                                        }}
                                    >
                                        {currentArticle.title}
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    display: 'flex',
                                    gap: 2,
                                    mb: 3,
                                    flexWrap: 'wrap',
                                    alignItems: 'center'
                                }}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        {currentArticle.author}
                                    </Typography>
                                    <Box sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                        backgroundColor: 'text.secondary'
                                    }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {currentArticle.date}
                                    </Typography>
                                    <Box sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: '50%',
                                        backgroundColor: 'text.secondary'
                                    }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {currentArticle.readTime}
                                    </Typography>
                                </Box>
                                {/* Excerpt */}
                                <Box
                                    sx={{
                                        fontSize: '1.125rem',
                                        lineHeight: 1.8,
                                        mb: 3,
                                        flexGrow: 1
                                    }}
                                >
                                    <MarkdownWithTooltips color="text.secondary">
                                        {currentArticle.excerpt}
                                    </MarkdownWithTooltips>
                                </Box>

                                {/* Button */}
                                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        variant="contained"
                                        onClick={() => navigate(currentArticle.link)}
                                        sx={{
                                            backgroundColor: currentArticle.color,
                                            color: 'white',
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            borderRadius: 2,
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

                                {/* Indicator dots */}
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 1.5,
                                    alignItems: 'center'
                                }}>
                                    {mockArticles.map((article, index) => (
                                        <Box
                                            key={index}
                                            onClick={() => {
                                                if (index !== currentIndex) {
                                                    setCurrentIndex(index);
                                                }
                                            }}
                                            sx={{
                                                width: index === currentIndex ? 32 : 12,
                                                height: 12,
                                                borderRadius: 6,
                                                backgroundColor: index === currentIndex
                                                    ? currentArticle.color
                                                    : 'action.disabled',
                                                transition: 'all 0.3s',
                                                cursor: 'pointer',
                                                '&:hover': {
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
                            '&:hover': {
                                backgroundColor: 'background.paper',
                                boxShadow: 4,
                                transform: 'scale(1.1)'
                            },
                            transition: 'all 0.2s'
                        }}
                        aria-label="Next article"
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Box>
        </Container>
    );
}