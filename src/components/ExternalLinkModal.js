import React, { useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
    Fade,
    Backdrop
} from '@mui/material';
import { Close as CloseIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import { useThemeMode } from './contexts/ThemeContext';

const ExternalLinkModal = ({
                               children,
                               href,
                               title = "External Link",
                               message = "You are about to leave this site and go to an external website.",
                               onClick,
                               ...props
                           }) => {
    const [open, setOpen] = useState(false);
    const { isDarkMode } = useThemeMode();

    const linkColor = isDarkMode ? '#90caf9' : '#1976d2';

    const handleOpen = () => {
        if (onClick) {
            onClick();
        }
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleContinue = () => {
        window.open(href, '_blank', 'noopener,noreferrer');
        setOpen(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 400 },
        bgcolor: '#2e3133',
        color: 'white',
        border: '2px solid #444',
        borderRadius: 2,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        p: 4,
        outline: 'none',
    };

    return (
        <>
            <Box
                component="span"
                onClick={handleOpen}
                sx={{
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    ...props.sx
                }}
                {...props}
            >
                {children}
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    sx: { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Typography variant="h6" component="h2" sx={{
                                color: '#ffffff',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <OpenInNewIcon />
                                {title}
                            </Typography>
                            <IconButton
                                onClick={handleClose}
                                sx={{
                                    color: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                    ml: 1
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Typography sx={{ mb: 3, color: '#cccccc', lineHeight: 1.6 }}>
                            {message}
                        </Typography>

                        <Typography sx={{ mb: 3, color: '#999999', fontSize: '0.9rem' }}>
                            Destination: <strong style={{ color: linkColor }}>{href}</strong>
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button
                                onClick={handleClose}
                                variant="outlined"
                                sx={{
                                    borderColor: '#666',
                                    color: '#ffffff',
                                    '&:hover': {
                                        borderColor: '#888',
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    },
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleContinue}
                                variant="contained"
                                sx={{
                                    backgroundColor: '#4caf50',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#45a049',
                                    },
                                }}
                            >
                                Continue
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default ExternalLinkModal;
