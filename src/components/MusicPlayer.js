import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Box,
    IconButton,
    Typography,
    Slider,
    Paper,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    PlayArrow,
    Pause,
    SkipNext,
    SkipPrevious,
    VolumeUp,
    VolumeDown,
    DragIndicator,
    Close,
    Minimize
} from '@mui/icons-material';
import playlistsData from '../static/json/playlists.json';
import localRecording from '../static/audio/op_55_no_1_matthew_hoffman.wav';

// Import all Classicals.de Chopin MP3s
import chopin_op9_no1 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 9 no. 1 in B-flat minor/Classicals.de - Chopin - Nocturne Op. 9 no. 1 in B-flat minor.mp3';
import chopin_op9_no2 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 9 no. 2 in E-flat major/Classicals.de - Chopin - Nocturne Op. 9 no. 2 in E-flat major.mp3';
import chopin_op9_no3 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 9 no. 3 in B major/Classicals.de - Chopin - Nocturne Op. 9 no. 3 in B major.mp3';
import chopin_op15_no1 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 15 no. 1 in F major/Classicals.de - Chopin - Nocturne Op. 15 no. 1 in F major.mp3';
import chopin_op15_no2 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 15 no. 2 F-sharp major/Classicals.de - Chopin - Nocturne Op. 15 no. 2 F-sharp major.mp3';
import chopin_op15_no3 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 15 no. 3 in G minor/Classicals.de - Chopin - Nocturne Op. 15 no. 3 in G minor.mp3';
import chopin_op27_no1 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 27 no.1 in C-sharp minor/Classicals.de - Chopin - Nocturne Op. 27 no.1 in C-sharp minor.mp3';
import chopin_op27_no2 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 27 no. 2 D-flat major/Classicals.de - Chopin - Nocturne Op. 27 no. 2 D-flat major.mp3';
import chopin_op32_no1 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 32 no.1 B major/Classicals.de - Chopin - Nocturne Op. 32 no.1 B major.mp3';
import chopin_op32_no2 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 32 no. 2 in A-flat major/Classicals.de - Chopin - Nocturne Op. 32 no. 2 in A-flat major.mp3';
import chopin_op37_no1 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 37 no. 1 in G minor/Classicals.de - Chopin - Nocturne Op. 37 no. 1 in G minor.mp3';
import chopin_op48_no1 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 48 no.1 in C minor/Classicals.de - Chopin - Nocturne Op. 48 no.1 in C minor.mp3';
import chopin_op48_no2 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 48 no. 2 F-sharp minor/Classicals.de - Chopin - Nocturne Op. 48 no. 2 F-sharp minor.mp3';
import chopin_op55_no1 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 55 no. 1 in F minor/Classicals.de - Chopin - Nocturne Op. 55 no. 1 in F minor.mp3';
import chopin_op62_no1 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 62 no. 1 in B major/Classicals.de - Chopin - Nocturne Op. 62 no. 1 in B major.mp3';
import chopin_op62_no2 from '../static/audio/Classicals.de - Chopin - Nocturne Op. 62 no. 2 in E major/Classicals.de - Chopin - Nocturne Op. 62 no. 2 in E major.mp3';
import chopin_op72 from '../static/audio/Classicals.de - Chopin - Nocturne Op. posth. 72 in E minor/Classicals.de - Chopin - Nocturne Op. posth. 72 in E minor.mp3';
import chopin_b49 from '../static/audio/Classicals.de - Chopin - Nocturne B. 49 in C-sharp minor \'Lento con gran espressione\'/Classicals.de - Chopin - Nocturne B. 49 in C-sharp minor \'Lento con gran espressione\'.mp3';
import chopin_b108 from '../static/audio/Classicals.de - Chopin - Nocturne B. 108 in C minor/Classicals.de - Chopin - Nocturne B. 108 in C minor.mp3';

// Map special identifiers to imported assets
const audioAssetMap = {
    'local-recording': localRecording,
    'chopin-op9-no1': chopin_op9_no1,
    'chopin-op9-no2': chopin_op9_no2,
    'chopin-op9-no3': chopin_op9_no3,
    'chopin-op15-no1': chopin_op15_no1,
    'chopin-op15-no2': chopin_op15_no2,
    'chopin-op15-no3': chopin_op15_no3,
    'chopin-op27-no1': chopin_op27_no1,
    'chopin-op27-no2': chopin_op27_no2,
    'chopin-op32-no1': chopin_op32_no1,
    'chopin-op32-no2': chopin_op32_no2,
    'chopin-op37-no1': chopin_op37_no1,
    'chopin-op48-no1': chopin_op48_no1,
    'chopin-op48-no2': chopin_op48_no2,
    'chopin-op55-no1': chopin_op55_no1,
    'chopin-op62-no1': chopin_op62_no1,
    'chopin-op62-no2': chopin_op62_no2,
    'chopin-op72': chopin_op72,
    'chopin-b49': chopin_b49,
    'chopin-b108': chopin_b108
};

export default function MusicPlayer ({ onClose, onMinimize, isMinimized = false, playlist: externalPlaylist, startingTrack = 0, onPlayingStateChange }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(70);
    const [isDragging, setIsDragging] = useState(false);
    const [isSliderActive, setIsSliderActive] = useState(false);
    const audioRef = useRef(null);
    const playerRef = useRef(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Use the personal-recordings playlist as the default
    const personalRecordingsPlaylist = playlistsData.find(p => p.id === 'personal-recordings');
    const defaultPlaylist = personalRecordingsPlaylist?.tracks || [];

    const playlist = externalPlaylist || defaultPlaylist;
    const [currentTrack, setCurrentTrack] = useState(0);

    // Helper function to resolve audio src
    const getAudioSrc = (track) => {
        return audioAssetMap[track?.src] || track?.src;
    };

    // Reset to starting track when playlist changes
    useEffect(() => {
        if (externalPlaylist) {
            setCurrentTrack(startingTrack);
            setIsPlaying(false);
        }
    }, [externalPlaylist, startingTrack]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handlePlay = () => {
            setIsPlaying(true);
            onPlayingStateChange?.(true);
        };
        const handlePause = () => {
            setIsPlaying(false);
            onPlayingStateChange?.(false);
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, [currentTrack, onPlayingStateChange]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeChange = (_, newValue) => {
        const audio = audioRef.current;
        audio.currentTime = newValue;
        setCurrentTime(newValue);
    };

    const handleVolumeChange = (_, newValue) => {
        const audio = audioRef.current;
        audio.volume = newValue / 100;
        setVolume(newValue);
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % playlist.length);
        setIsPlaying(false);
    };

    const prevTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
        setIsPlaying(false);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSliderStart = () => {
        setIsSliderActive(true);
    };

    const handleSliderEnd = () => {
        setIsSliderActive(false);
    };

    const setMinVolume = () => {
        const audio = audioRef.current;
        audio.volume = 0;
        setVolume(0);
    };

    const setMaxVolume = () => {
        const audio = audioRef.current;
        audio.volume = 1;
        setVolume(100);
    };

    return (
        <>
            {/* Always render audio element to keep music playing */}
            <audio
                ref={audioRef}
                src={getAudioSrc(playlist[currentTrack])}
                onEnded={nextTrack}
            />

            {/* Only render UI when not minimized */}
            {!isMinimized && (
                <motion.div
                    ref={playerRef}
                    drag={!isSliderActive && !isMobile}
                    dragMomentum={false}
                    dragListener={!isSliderActive && !isMobile}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                    initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                    animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 0.3
                    }}
                    style={{
                        position: 'fixed',
                        bottom: isMobile ? 0 : 20,
                        right: isMobile ? 0 : 20,
                        left: isMobile ? 0 : 'auto',
                        zIndex: 1300,
                        cursor: isDragging ? 'grabbing' : (isMobile ? 'auto' : 'grab')
                    }}
                >
                    <Paper
                        elevation={8}
                        sx={{
                            p: { xs: 2, md: 2 },
                            minWidth: { xs: '100%', md: 400 },
                            maxWidth: { xs: '100%', md: 500 },
                            bgcolor: 'rgba(255, 255, 255, 0.85)',
                            color: '#1a1a1a',
                            borderRadius: { xs: '16px 16px 0 0', md: 5 },
                            backdropFilter: 'blur(10px)',
                            position: 'relative'
                        }}
                    >
                        {/* Close Button */}
                        <IconButton
                            onClick={onClose}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: 'rgba(0, 0, 0, 0.6)',
                                '&:hover': {
                                    color: '#000',
                                    bgcolor: 'rgba(0, 0, 0, 0.1)'
                                },
                                zIndex: 1
                            }}
                            size="small"
                        >
                            <Close fontSize="small" />
                        </IconButton>

                        {/* Minimize Button */}
                        <IconButton
                            onClick={onMinimize}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 40,
                                color: 'rgba(0, 0, 0, 0.6)',
                                '&:hover': {
                                    color: '#000',
                                    bgcolor: 'rgba(0, 0, 0, 0.1)'
                                },
                                zIndex: 1
                            }}
                            size="small"
                        >
                            <Minimize fontSize="small" />
                        </IconButton>

                        {/* Drag Handle */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                            <DragIndicator sx={{ color: 'rgba(0, 0, 0, 0.3)' }} />
                        </Box>

                        {/* Track Info */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" noWrap>
                                {playlist[currentTrack]?.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                {playlist[currentTrack]?.artist}
                            </Typography>
                        </Box>

                        {/* Progress Bar */}
                        <Box
                            onPointerDown={(e) => e.stopPropagation()}
                            style={{ touchAction: 'none' }}
                        >
                            <Box
                                onMouseDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                                onPointerDown={(e) => e.stopPropagation()}
                                style={{ pointerEvents: 'auto' }}
                            >
                                <Slider
                                    value={currentTime}
                                    max={duration || 100}
                                    onChange={handleTimeChange}
                                    onMouseDown={handleSliderStart}
                                    onTouchStart={handleSliderStart}
                                    onPointerDown={handleSliderStart}
                                    onMouseUp={handleSliderEnd}
                                    onTouchEnd={handleSliderEnd}
                                    onPointerUp={handleSliderEnd}
                                    sx={{
                                        color: '#1a1a1a',
                                        '& .MuiSlider-thumb': {
                                            bgcolor: '#1a1a1a',
                                            width: { xs: 20, md: 12 },
                                            height: { xs: 20, md: 12 }
                                        },
                                        '& .MuiSlider-track': {
                                            bgcolor: '#1a1a1a',
                                        },
                                        '& .MuiSlider-rail': {
                                            bgcolor: 'rgba(0, 0, 0, 0.2)',
                                        },
                                        '& .MuiSlider-root': {
                                            touchAction: 'none'
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant="caption">
                                    {formatTime(currentTime)}
                                </Typography>
                                <Typography variant="caption">
                                    {formatTime(duration)}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Controls */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { xs: 1, md: 0 } }}>
                            <IconButton
                                onClick={prevTrack}
                                sx={{
                                    color: '#1a1a1a',
                                    minWidth: 44,
                                    minHeight: 44
                                }}
                            >
                                <SkipPrevious sx={{ fontSize: { xs: '2rem', md: '1.5rem' } }} />
                            </IconButton>
                            <IconButton
                                onClick={togglePlayPause}
                                sx={{
                                    color: '#1a1a1a',
                                    bgcolor: 'rgba(0, 0, 0, 0.05)',
                                    minWidth: 44,
                                    minHeight: 44,
                                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' }
                                }}
                            >
                                {isPlaying ? <Pause sx={{ fontSize: { xs: '2rem', md: '1.5rem' } }} /> : <PlayArrow sx={{ fontSize: { xs: '2rem', md: '1.5rem' } }} />}
                            </IconButton>
                            <IconButton
                                onClick={nextTrack}
                                sx={{
                                    color: '#1a1a1a',
                                    minWidth: 44,
                                    minHeight: 44
                                }}
                            >
                                <SkipNext sx={{ fontSize: { xs: '2rem', md: '1.5rem' } }} />
                            </IconButton>
                        </Box>

                        <Box
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                            onPointerDown={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                            onTouchStart={(e) => e.stopPropagation()}
                            style={{ touchAction: 'none', pointerEvents: 'auto' }}
                        >
                            <IconButton
                                onClick={setMinVolume}
                                sx={{
                                    color: '#1a1a1a',
                                    minWidth: 44,
                                    minHeight: 44,
                                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.05)' }
                                }}
                            >
                                <VolumeDown sx={{ fontSize: { xs: '1.5rem', md: '1.25rem' } }} />
                            </IconButton>
                            <Box
                                onMouseDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                                onPointerDown={(e) => e.stopPropagation()}
                                style={{ flex: 1, pointerEvents: 'auto' }}
                            >
                                <Slider
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    onMouseDown={handleSliderStart}
                                    onTouchStart={handleSliderStart}
                                    onPointerDown={handleSliderStart}
                                    onMouseUp={handleSliderEnd}
                                    onTouchEnd={handleSliderEnd}
                                    onPointerUp={handleSliderEnd}
                                    sx={{
                                        color: '#1a1a1a',
                                        '& .MuiSlider-thumb': {
                                            bgcolor: '#1a1a1a',
                                            width: { xs: 20, md: 12 },
                                            height: { xs: 20, md: 12 }
                                        },
                                        '& .MuiSlider-track': {
                                            bgcolor: '#1a1a1a',
                                        },
                                        '& .MuiSlider-rail': {
                                            bgcolor: 'rgba(0, 0, 0, 0.2)',
                                        },
                                        '& .MuiSlider-root': {
                                            touchAction: 'none'
                                        }
                                    }}
                                />
                            </Box>
                            <IconButton
                                onClick={setMaxVolume}
                                sx={{
                                    color: '#1a1a1a',
                                    minWidth: 44,
                                    minHeight: 44,
                                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.05)' }
                                }}
                            >
                                <VolumeUp sx={{ fontSize: { xs: '1.5rem', md: '1.25rem' } }} />
                            </IconButton>
                        </Box>
                    </Paper>
                </motion.div>
            )}
        </>
    );
};