import React from "react";
import { Container, Typography, Box, Stack } from "@mui/material";
import Playlist from "../Playlist";
import playlistsData from "../../static/json/playlists.json";
import { motion, AnimatePresence } from 'framer-motion';

export default function RadioPage({ onPlayPlaylist }) {
    const handlePlayTrack = (tracks, trackIndex) => {
        if (onPlayPlaylist) {
            onPlayPlaylist(tracks, trackIndex);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: { xs: 6, md: 8 }, mb: 3, px: { xs: 2, md: 3 } }}>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <Stack spacing={{ xs: 4, md: 6 }}>
                        {playlistsData.map((playlist) => (
                            <Playlist
                                key={playlist.id}
                                playlist={playlist}
                                onPlayTrack={handlePlayTrack}
                            />
                        ))}
                    </Stack>
                </motion.div>
            </AnimatePresence>
        </Container>
    );
}