import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import HighlightImage from "./HighlightImage";
import Track from "./Track";
import MarkdownWithTooltips from "./MarkdownWithTooltips";
import bostonImage from "../static/image/Boston_from_the_Longfellow.jpeg";
import italianCoastImage from "../static/image/italian_coast_scene_with_ruined_tower_1993.55.1.jpg";
import smithsonianImage from "../static/image/Smithsonian_Institution.jpeg";
import watercolorImage from "../static/image/Watercolor_Portrait_of_Matthew_Hoffman.jpeg";
import mountainPassImage from "../static/image/a_view_of_the_mountain_pass_called_the_notch_of_the_white_mountains_crawford_notch_1967.8.1.jpg";

// Map image identifiers to actual imports
const imageMap = {
    'italian_coast': italianCoastImage,
    'boston_longfellow': bostonImage,
    'smithsonian': smithsonianImage,
    'watercolor': watercolorImage,
    'A_View_of_the_Mountain_Pass.jpeg': mountainPassImage
};

/**
 * Playlist component displays a playlist with its cover image and track list
 *
 * @param {object} playlist - The playlist object containing title, description, tracks, and image info
 * @param {function} onPlayTrack - Callback when a track is played, receives (playlistTracks, trackIndex)
 */
export default function Playlist({ playlist, onPlayTrack }) {
    const [imageInfoHovered, setImageInfoHovered] = useState(false);

    const handlePlayTrack = (trackIndex) => {
        onPlayTrack(playlist.tracks, trackIndex);
    };

    // Get the actual image source from the map
    const imageSrc = imageMap[playlist.coverImage] || bostonImage;

    return (
        <Box sx={{ mb: { xs: 2, md: 3 } }}>
            <HighlightImage
                imageSrc={imageSrc}
                imageTitle={playlist.imageTitle}
                imageCreator={playlist.imageCreator}
                licenseUrl={playlist.licenseUrl}
                licenseText={playlist.licenseText}
                downloadFileName={playlist.imageTitle?.replace(/\s/g, '_') + '.jpeg'}
                height={600}
                onInfoHoverChange={setImageInfoHovered}
            >
                {/* Overlay content with playlist info and tracks */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: { xs: 2, md: 4 },
                        borderRadius: 3,
                        opacity: imageInfoHovered ? 0 : 1,
                        transition: 'opacity 0.2s',
                        pointerEvents: imageInfoHovered ? 'none' : 'auto'
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: 3,
                            maxWidth: '800px',
                            width: '100%',
                            boxShadow: 5,
                            maxHeight: '480px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        <Box
                            sx={{
                                overflow: 'auto',
                                flex: 1,
                                padding: { xs: 2, sm: 3, md: 4 },
                                '&::-webkit-scrollbar': {
                                    width: '12px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: 'transparent',
                                    borderLeft: { xs: '8px solid transparent', sm: '12px solid transparent', md: '16px solid transparent' },
                                    borderRight: { xs: '8px solid transparent', sm: '12px solid transparent', md: '16px solid transparent' },
                                    borderTop: { xs: '8px solid transparent', sm: '12px solid transparent', md: '16px solid transparent' },
                                    borderBottom: { xs: '8px solid transparent', sm: '12px solid transparent', md: '16px solid transparent' },
                                    backgroundClip: 'padding-box',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(0,0,0,.3)',
                                    borderRadius: '6px',
                                    border: '2px solid transparent',
                                    backgroundClip: 'padding-box',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,.4)',
                                    }
                                }
                            }}
                        >
                            <Box sx={{ mb: { xs: 2, md: 3 }, textAlign: 'center' }}>
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 1,
                                        color: 'text.primary',
                                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                                        fontFamily: '"Times New Roman", Times, serif'
                                    }}
                                >
                                    {playlist.title}
                                </Typography>
                                <Box
                                    sx={{
                                        mb: 1,
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        color: 'text.secondary'
                                    }}
                                >
                                    <MarkdownWithTooltips>{playlist.description}</MarkdownWithTooltips>
                                </Box>
                            </Box>

                            <Stack spacing={{ xs: 1.5, md: 2 }}>
                                {playlist.tracks.map((track, index) => (
                                    <Track
                                        key={index}
                                        track={track}
                                        index={index}
                                        onPlay={handlePlayTrack}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </HighlightImage>
        </Box>
    );
}
