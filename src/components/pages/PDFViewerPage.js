import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useParams } from 'react-router';

export default function PDFViewerPage() {
    const { file } = useParams();
    const [pdfPath, setPdfPath] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fileName = file || 'resume';

        const loadPDF = async () => {
            try {
                const path = require(`../../static/pdfs/${fileName}.pdf`);
                setPdfPath(path);
                setError(false);
            } catch (err) {
                try {
                    const path = require(`../../static/pdfs/${fileName}`);
                    setPdfPath(path);
                    setError(false);
                } catch (err2) {
                    try {
                        const path = require(`../../static/image/${fileName}`);
                        setPdfPath(path);
                        setError(false);
                    } catch (err3) {
                        setError(true);
                    }
                }
            }
        };

        loadPDF();
    }, [file]);

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                <Typography variant="h4" align="center">
                    PDF not found
                </Typography>
            </Container>
        );
    }

    if (!pdfPath) {
        return (
            <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                <Typography variant="h5" align="center">
                    Loading PDF...
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <Box
                    sx={{
                        width: '100%',
                        height: 'calc(100vh - 250px)',
                        minHeight: '600px',
                        border: '1px solid #ddd',
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: 3
                    }}
                >
                    <iframe
                        src={pdfPath}
                        title="PDF Viewer"
                        width="100%"
                        height="100%"
                        style={{
                            border: 'none'
                        }}
                    />
                </Box>
            </Box>
        </Container>
    );
}
