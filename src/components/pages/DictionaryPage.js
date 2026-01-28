import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Card, CardContent, Chip, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import definitions from '../../static/json/definitions.json';
import { useLocation, useNavigate } from 'react-router';
import { useThemeMode } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import MarkdownWithTooltips from "../MarkdownWithTooltips";
import ExternalLinkModal from "../ExternalLinkModal";

export default function DictionaryPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [highlightedTerm, setHighlightedTerm] = useState(null);
    const [showBackButton, setShowBackButton] = useState(false);
    const { isDarkMode } = useThemeMode();

    const definitionEntries = Object.entries(definitions).sort((a, b) =>
        a[0].localeCompare(b[0], undefined, { sensitivity: 'base' })
    );

    useEffect(() => {
        if (location.hash) {
            const termId = location.hash.substring(1);
            const element = document.getElementById(termId);

            if (element) {
                setShowBackButton(true);

                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);

                setHighlightedTerm(termId);
            }
        } else {
            setShowBackButton(false);
            setHighlightedTerm(null);
        }
    }, [location.hash]);

    const getVariantColor = (type) => {
        if (isDarkMode) {
            // Dark mode background colors
            switch (type) {
                case 'professional':
                    return '#0d47a1';
                case 'academic':
                    return '#b71c1c';
                case 'personal':
                    return '#1b5e20';
                case 'generic':
                default:
                    return '#f9a825';
            }
        } else {
            // Light mode background colors
            switch (type) {
                case 'professional':
                    return '#e3f2fd';
                case 'academic':
                    return '#ffebee';
                case 'personal':
                    return '#e8f5e8';
                case 'generic':
                default:
                    return '#fff3cd';
            }
        }
    };

    const getVariantTextColor = (type) => {
        if (isDarkMode) {
            return '#ffffff';
        } else {
            switch (type) {
                case 'professional':
                    return '#1565c0';
                case 'academic':
                    return '#c62828';
                case 'personal':
                    return '#2e7d32';
                case 'generic':
                default:
                    return '#856404';
            }
        }
    };

    const getVariantBorderColor = (type) => {
        if (isDarkMode) {
            switch (type) {
                case 'professional':
                    return '#1565c0';
                case 'academic':
                    return '#c62828';
                case 'personal':
                    return '#2e7d32';
                case 'generic':
                default:
                    return '#fbc02d';
            }
        } else {
            switch (type) {
                case 'professional':
                    return '#1565c0';
                case 'academic':
                    return '#c62828';
                case 'personal':
                    return '#2e7d32';
                case 'generic':
                default:
                    return '#856404';
            }
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ py: { xs: 2, md: 4 } }}>
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >

                        <Container maxWidth="md">
                            <MarkdownWithTooltips align={"justify"}>
                                {'> The [[highlights]]  on this site are interactable, and can be disabled from the navbar. Hover over one to see a tooltip containing its definition. Click the question icon to be brought to the definition here. They are color-coded and categorized according to the category by which I learned them.'}
                            </MarkdownWithTooltips>
                        </Container>

                        <Container maxWidth="sm">
                            <MarkdownWithTooltips>
                                {'> *"Dictionaries are like watches, the worst is better than none and the best cannot be expected to go quite true." - Samuel Johnson*'}
                            </MarkdownWithTooltips>
                        </Container>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 3 }}>
                    {definitionEntries.map(([term, definition]) => {
                        const defData = typeof definition === 'string'
                            ? { text: definition, type: 'generic' }
                            : definition;

                        const termId = `term-${term.toLowerCase().replace(/\s+/g, '-')}`;
                        const isHighlighted = highlightedTerm === termId;

                        return (
                            <Card
                                key={term}
                                id={termId}
                                variant="outlined"
                                raised={isHighlighted}
                                sx={{
                                    borderLeft: `4px solid ${getVariantBorderColor(defData.type)}`,
                                    '&:hover': {
                                        boxShadow: 2
                                    },
                                    scrollMarginTop: { xs: '70px', md: '80px' },
                                    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                                    ...(isHighlighted && {
                                        boxShadow: 6,
                                        transform: { xs: 'scale(1.01)', md: 'scale(1.02)' }
                                    })
                                }}
                            >
                                <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                                        {showBackButton && isHighlighted && (
                                            <IconButton
                                                size="small"
                                                onClick={() => navigate(-1)}
                                                sx={{
                                                    color: getVariantBorderColor(defData.type),
                                                    minWidth: 44,
                                                    minHeight: 44,
                                                    '&:hover': {
                                                        backgroundColor: getVariantColor(defData.type)
                                                    }
                                                }}
                                                aria-label="Go back"
                                            >
                                                <ArrowBackIcon />
                                            </IconButton>
                                        )}
                                        <Typography
                                            variant="h6"
                                            component="h2"
                                            sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}
                                        >
                                            {term}
                                        </Typography>
                                        <Chip
                                            label={defData.type || 'generic'}
                                            size="small"
                                            sx={{
                                                backgroundColor: getVariantColor(defData.type),
                                                color: getVariantTextColor(defData.type),
                                                fontWeight: 500,
                                                fontSize: { xs: '0.6rem', md: '0.65rem' }
                                            }}
                                        />
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{
                                            fontSize: { xs: '0.875rem', md: '0.9rem' },
                                            textAlign: 'justify'
                                        }}
                                    >
                                        {defData.text}
                                    </Typography>

                                    {definition.sources && definition.sources.length > 0 && (
                                        <Box mt={1.5} sx={{ textAlign: 'justify' }}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    marginBottom: 0.5,
                                                    fontSize: { xs: '0.8rem', md: '0.85rem' }
                                                }}
                                            >
                                                {definition.sources.length === 1 ? 'Source:' : 'Sources:'}
                                            </Typography>
                                            <Box component="ul" sx={{ paddingLeft: 2, margin: 0 }}>
                                                {definition.sources.map((source, index) => (
                                                    <Typography
                                                        component="li"
                                                        key={index}
                                                        variant="body2"
                                                        sx={{ fontSize: { xs: '0.8rem', md: '0.85rem' } }}
                                                    >
                                                        <ExternalLinkModal
                                                            href={source.hyperlink}
                                                            title="External Source"
                                                            message="You are about to visit an external source for this definition."
                                                        >
                                                            <span
                                                                style={{
                                                                    color: isDarkMode ? '#90caf9' : '#1976d2',
                                                                    cursor: 'pointer',
                                                                    textDecoration: 'none'
                                                                }}
                                                                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                                                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                                            >
                                                                {source.name}
                                                            </span>
                                                        </ExternalLinkModal>
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </Box>
                                    )}


                                    {defData['last-updated'] && (
                                        <Typography
                                            variant="caption"
                                            color="text.disabled"
                                            sx={{
                                                mt: 0.5,
                                                display: 'block',
                                                fontSize: { xs: '0.65rem', md: '0.7rem' }
                                            }}
                                        >
                                            Last updated: {defData['last-updated']}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </Box>
                    </motion.div>
                </AnimatePresence>
            </Box>
        </Container>
    );
}

