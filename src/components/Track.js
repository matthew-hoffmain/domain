import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExternalLinkModal from "./ExternalLinkModal";


export default function Track({ track, index, onPlay }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 1,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: 1,
                transition: 'all 0.2s',
                '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)',
                    backgroundColor: 'action.hover'
                }
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 2 }, flexGrow: 1, minWidth: 0 }}>
                <IconButton
                    onClick={() => onPlay(index)}
                    sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        minWidth: 44,
                        minHeight: 44,
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        }
                    }}
                    aria-label="Play track"
                >
                    <PlayArrowIcon sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }} />
                </IconButton>

                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 600,
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {track.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            fontSize: { xs: '0.8rem', md: '0.875rem' },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {track.artist}
                    </Typography>
                </Box>
            </Box>

            {track.license && (
                <Tooltip title={`License: ${track.license.type}`}>
                    <ExternalLinkModal
                        href={track.license.url}
                        title="License Information"
                        message={`This track is licensed under ${track.license.type}. Click OK to view the license details.`}
                    >
                        <IconButton
                            size="small"
                            sx={{
                                color: 'primary.main',
                                minWidth: 44,
                                minHeight: 44,
                                flexShrink: 0,
                                '&:hover': {
                                    opacity: 0.7
                                }
                            }}
                        >
                            <InfoOutlinedIcon sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }} />
                        </IconButton>
                    </ExternalLinkModal>
                </Tooltip>
            )}
        </Box>
    );
}
