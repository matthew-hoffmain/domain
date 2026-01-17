import React from 'react';
import { Container, Box, Typography, Card, CardContent, Chip } from '@mui/material';
import definitions from '../../definitions.json';

export default function DictionaryPage() {
    const definitionEntries = Object.entries(definitions).sort((a, b) =>
        a[0].localeCompare(b[0], undefined, { sensitivity: 'base' })
    );

    const getVariantColor = (type) => {
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
    };

    const getVariantTextColor = (type) => {
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
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dictionary
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                    All definitions available on this website. Click on any term in the content to see its definition in a tooltip.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                    {definitionEntries.map(([term, definition]) => {
                        const defData = typeof definition === 'string'
                            ? { text: definition, type: 'generic' }
                            : definition;

                        return (
                            <Card
                                key={term}
                                variant="outlined"
                                sx={{
                                    borderLeft: `4px solid ${getVariantTextColor(defData.type)}`,
                                    '&:hover': {
                                        boxShadow: 2
                                    }
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <Typography variant="h6" component="h2">
                                            {term}
                                        </Typography>
                                        <Chip
                                            label={defData.type || 'generic'}
                                            size="small"
                                            sx={{
                                                backgroundColor: getVariantColor(defData.type),
                                                color: getVariantTextColor(defData.type),
                                                fontWeight: 500,
                                                fontSize: '0.7rem'
                                            }}
                                        />
                                    </Box>
                                    <Typography variant="body1" color="text.secondary">
                                        {defData.text}
                                    </Typography>
                                    {defData['last-updated'] && (
                                        <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
                                            Last updated: {defData['last-updated']}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </Box>
            </Box>
        </Container>
    );
}

