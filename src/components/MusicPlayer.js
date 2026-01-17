import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, LinearProgress, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

export default function MusicPlayer({ playlists }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentPlaylistIndex] = useState(0);
    const audioRef = useRef(null);

    const currentPlaylist = playlists[currentPlaylistIndex];
    const currentTrack = currentPlaylist?.tracks[currentTrackIndex];
    const totalTracks = currentPlaylist?.tracks.length || 0;

    useEffect(() => {
        if (audioRef.current && currentTrack) {
            audioRef.current.src = currentTrack.src;
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log('Playback failed:', e));
            }
        }
    }, [currentTrack, isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const handleEnded = () => {
            setIsPlaying(false);
            if (currentTrackIndex < totalTracks - 1) {
                handleNext();
            }
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [currentTrackIndex, totalTracks]);

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayPause = () => {
        if (!audioRef.current) return;
        
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log('Playback failed:', e));
        }
        setIsPlaying(!isPlaying);
    };

    const handlePrevious = () => {
        if (currentTrackIndex > 0) {
            setCurrentTrackIndex(currentTrackIndex - 1);
            setCurrentTime(0);
            setIsPlaying(true);
        }
    };

    const handleNext = () => {
        if (currentTrackIndex < totalTracks - 1) {
            setCurrentTrackIndex(currentTrackIndex + 1);
            setCurrentTime(0);
            setIsPlaying(true);
        }
    };

    const handleProgressClick = (event) => {
        if (!audioRef.current) return;
        
        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const percentage = clickX / rect.width;
        const newTime = percentage * audioRef.current.duration;
        
        if (!isNaN(newTime)) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const duration = audioRef.current?.duration || 0;
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '300px',
                maxWidth: '400px',
                gap: 0.5,
                p: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                boxShadow: 1
            }}
        >
            <audio ref={audioRef} />
            
            <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center' }}>
                {currentTrack?.title || 'No track selected'}
            </Typography>
            
            <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary', mb: 0.5 }}>
                {currentTrack?.artist || ''}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <IconButton 
                    size="small" 
                    onClick={handlePrevious}
                    disabled={currentTrackIndex === 0}
                    sx={{ padding: '4px' }}
                >
                    <SkipPreviousIcon fontSize="small" />
                </IconButton>
                <IconButton 
                    size="small" 
                    onClick={handlePlayPause}
                    color="primary"
                    sx={{ padding: '4px' }}
                >
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton 
                    size="small" 
                    onClick={handleNext}
                    disabled={currentTrackIndex === totalTracks - 1}
                    sx={{ padding: '4px' }}
                >
                    <SkipNextIcon fontSize="small" />
                </IconButton>
            </Box>
            
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Box
                    onClick={handleProgressClick}
                    sx={{ 
                        width: '100%', 
                        cursor: 'pointer',
                        '&:hover': {
                            opacity: 0.8
                        }
                    }}
                >
                    <LinearProgress 
                        variant="determinate" 
                        value={progress} 
                        sx={{ height: 4, borderRadius: 2, pointerEvents: 'none' }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                        {formatTime(currentTime)}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                        {formatTime(duration)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

