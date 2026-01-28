import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExternalLinkModal from "./ExternalLinkModal";
import { useThemeMode } from "./contexts/ThemeContext";

/**
 * HighlightImage component displays a background image with an optional hoverable info overlay
 * and optional children content overlaid on top of the image.
 *
 * @param {string} imageSrc - The source URL of the background image
 * @param {string} imageTitle - The title of the image (displayed in info overlay)
 * @param {string} imageCreator - The creator/photographer name (displayed in info overlay)
 * @param {string} licenseUrl - The URL to the license information
 * @param {string} licenseText - The display text for the license link
 * @param {string} downloadFileName - The filename for the downloaded image
 * @param {number} height - The height of the image in pixels (default: 500)
 * @param {ReactNode} children - Optional content to overlay on the image
 * @param {function} onInfoHoverChange - Callback when info hover state changes
 */
export default function HighlightImage({
    imageSrc,
    imageTitle,
    imageCreator,
    licenseUrl,
    licenseText,
    downloadFileName,
    height = 500,
    children,
    onInfoHoverChange
}) {
    const [imageInfoHovered, setImageInfoHovered] = useState(false);
    const { isDarkMode } = useThemeMode();

    const handleMouseEnter = () => {
        setImageInfoHovered(true);
        if (onInfoHoverChange) {
            onInfoHoverChange(true);
        }
    };

    const handleMouseLeave = () => {
        setImageInfoHovered(false);
        if (onInfoHoverChange) {
            onInfoHoverChange(false);
        }
    };

    return (
        <Box sx={{ position: 'relative' }}>
            <Box
                component="img"
                src={imageSrc}
                sx={{
                    objectFit: 'cover',
                    width: '100%',
                    height: height,
                    borderRadius: 3,
                    boxShadow: 5,
                }}
            />
            {isDarkMode && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        borderRadius: 3,
                        pointerEvents: 'none',
                    }}
                />
            )}

            {children}

            <Box
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: 2,
                    padding: imageInfoHovered ? 2 : 1,
                    display: 'flex',
                    alignItems: imageInfoHovered ? 'flex-start' : 'center',
                    gap: imageInfoHovered ? 2 : 0,
                    boxShadow: 3,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    maxHeight: imageInfoHovered ? '400px' : '40px',
                    maxWidth: imageInfoHovered ? '400px' : '40px',
                    overflow: 'hidden',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    }
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        flexShrink: 0
                    }}
                >
                    <InfoOutlinedIcon
                        sx={{
                            color: 'primary.main',
                            flexShrink: 0
                        }}
                    />
                    {imageInfoHovered && downloadFileName && (
                        <IconButton
                            component="a"
                            href={imageSrc}
                            download={downloadFileName}
                            sx={{
                                padding: 0,
                                color: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    opacity: 0.7
                                }
                            }}
                            aria-label="Download image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/>
                            </svg>
                        </IconButton>
                    )}
                </Box>

                <Box
                    sx={{
                        opacity: imageInfoHovered ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden'
                    }}
                >
                    {imageTitle && (
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {imageTitle}
                        </Typography>
                    )}
                    {imageCreator && (
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {imageCreator}
                        </Typography>
                    )}
                    {licenseUrl && licenseText && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'primary.main',
                                display: 'block',
                                mt: 0.5
                            }}
                        >
                            <ExternalLinkModal
                                href={licenseUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid currentColor'
                                }}
                                onClick={handleMouseLeave}
                            >
                                {licenseText}
                            </ExternalLinkModal>
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
