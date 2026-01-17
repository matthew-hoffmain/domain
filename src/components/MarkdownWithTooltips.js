import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Tooltip, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useHighlight } from './contexts/HighlightContext';
import ExternalLinkModal from './ExternalLinkModal';
import definitions from '../definitions.json';

// Create a case-insensitive lookup map
const definitionsLowerCaseMap = Object.keys(definitions).reduce((acc, key) => {
    acc[key.toLowerCase()] = key;
    return acc;
}, {});

const HighlightedText = styled('span')(({ variant = 'generic' }) => ({
    backgroundColor:
        variant === 'professional' ? '#e3f2fd' :
            variant === 'academic' ? '#ffebee' :
                variant === 'personal' ? '#e8f5e8' :
                    '#fff3cd',
    color:
        variant === 'professional' ? '#1565c0' :
            variant === 'academic' ? '#c62828' :
                variant === 'personal' ? '#2e7d32' :
                    '#856404',
    padding: '2px 0px',
    borderRadius: '3px',
    cursor: 'help',
    borderBottom: `1px dotted ${
        variant === 'professional' ? '#1565c0' :
            variant === 'academic' ? '#c62828' :
                variant === 'personal' ? '#2e7d32' :
                    '#856404'
    }`,
    '&:hover': {
        backgroundColor:
            variant === 'professional' ? '#bbdefb' :
                variant === 'academic' ? '#ffcdd2' :
                    variant === 'personal' ? '#c8e6c9' :
                        '#ffeaa7',
    },
}));


// Forward declaration - will be defined after processTextWithTooltips
let processTextWithTooltips;

const TooltipContent = ({ content }) => {
    const imageMatch = content.match(/^(IMG|GIF):(.+)$/);
    const textAndImageMatch = content.match(/^(.+?)\s*\|\s*(IMG|GIF):(.+)$/);

    if (imageMatch) {
        const [, type, url] = imageMatch;
        return (
            <Box sx={{ textAlign: 'center', maxWidth: '300px' }}>
                <img
                    src={url}
                    alt={`${type} tooltip`}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        borderRadius: '4px'
                    }}
                />
            </Box>
        );
    } else if (textAndImageMatch) {
        const [, text, type, url] = textAndImageMatch;
        return (
            <Box sx={{ textAlign: 'center', maxWidth: '300px' }}>
                <Typography sx={{
                    mb: 1,
                    fontSize: '0.875rem',
                    color: 'inherit'
                }}>
                    {processTextWithTooltips(text.trim(), true)}
                </Typography>
                <img
                    src={url}
                    alt={`${type} tooltip`}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '150px',
                        borderRadius: '4px'
                    }}
                />
            </Box>
        );
    } else {
        return (
            <Typography sx={{
                fontSize: '0.875rem',
                maxWidth: '300px'
            }}>
                {processTextWithTooltips(content, true)}
            </Typography>
        );
    }
};

processTextWithTooltips = (text, highlightEnabled = true) => {
    if (typeof text !== 'string') return text;

    if (!highlightEnabled) {
        const tooltipRegex = /\[\[([^:\]]+)(?:::([^\]]+))?]]/g;
        return text.replace(tooltipRegex, (match, word) => word);
    }

    const tooltipRegex = /\[\[([^:\]]+)(?:::([^\]]+))?]]/g;

    if (!tooltipRegex.test(text)) {
        return text;
    }

    const parts = [];
    let lastIndex = 0;
    let match;

    tooltipRegex.lastIndex = 0;

    while ((match = tooltipRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }

        const word = match[1];
        const inlineDefinition = match[2];

        // Check definitions.json first (case-insensitive), then fall back to in-text definition
        const wordLowerCase = word.toLowerCase();
        const originalKey = definitionsLowerCaseMap[wordLowerCase];
        const jsonDefinition = originalKey ? definitions[originalKey] : null;
        let finalDefinition, variant;

        if (jsonDefinition) {
            if (typeof jsonDefinition === 'string') {
                finalDefinition = jsonDefinition;
                variant = 'generic';
            } else {
                finalDefinition = jsonDefinition.text;
                variant = jsonDefinition.type || 'generic';
            }
        } else {
            finalDefinition = inlineDefinition;
            variant = 'generic';
        }

        if (finalDefinition) {
            parts.push(
                <Tooltip
                    key={match.index}
                    title={<TooltipContent content={finalDefinition} />}
                    placement="top"
                    arrow
                    slotProps={{
                        tooltip: {
                            sx: {
                                bgcolor: '#333',
                                color: 'white',
                                fontSize: '0.875rem',
                                maxWidth: 'none',
                                '& .MuiTooltip-arrow': {
                                    color: '#333',
                                },
                            },
                        },
                    }}
                >
                    <HighlightedText variant={variant}>{word}</HighlightedText>
                </Tooltip>
            );
        } else {
            parts.push(
                <HighlightedText key={match.index} variant={variant}>{word}</HighlightedText>
            );
        }

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return <>{parts}</>;
};

const TextRenderer = ({ children }) => {
    const { highlightEnabled } = useHighlight();

    if (typeof children === 'string') {
        return processTextWithTooltips(children, highlightEnabled);
    }

    if (Array.isArray(children)) {
        return children.map((child, index) => {
            if (typeof child === 'string') {
                return <React.Fragment key={index}>{processTextWithTooltips(child, highlightEnabled)}</React.Fragment>;
            }
            return child;
        });
    }

    return children;
};

const LinkRenderer = ({ href, children, ...props }) => {
    const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));

    if (isExternal) {
        return (
            <ExternalLinkModal
                href={href}
                title="External Link"
                message="You are about to leave this site and visit an external website. This will open in a new tab."
            >
                <Box
                    component="span"
                    sx={{
                        color: '#4caf50',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        '&:hover': {
                            color: '#45a049',
                        },
                    }}
                >
                    <TextRenderer>{children}</TextRenderer>
                </Box>
            </ExternalLinkModal>
        );
    } else {
        return (
            <a href={href} {...props} style={{ color: '#4caf50', textDecoration: 'underline' }}>
                <TextRenderer>{children}</TextRenderer>
            </a>
        );
    }
};

export default function MarkdownWithTooltips({ children, align, variant, color, sx, component, ...props }) {
    const typographyProps = {
        align,
        variant,
        color,
        sx,
        component
    };

    const inheritedTypographyProps = Object.fromEntries(
        Object.entries(typographyProps).filter(([_, value]) => value !== undefined)
    );

    return (
        <ReactMarkdown
            skipHtml={false}
            breaks={true}
            components={{
                text: ({ children }) => <TextRenderer>{children}</TextRenderer>,
                a: ({ href, children, ...props }) => <LinkRenderer href={href} {...props}>{children}</LinkRenderer>,
                p: ({ node, children, ...mdProps }) => (
                    <Typography
                        {...inheritedTypographyProps}
                        {...mdProps}
                        sx={{ margin: 0, ...inheritedTypographyProps.sx, ...mdProps.sx }}
                    >
                        <TextRenderer>{children}</TextRenderer>
                    </Typography>
                ),
                li: ({ node, children, ...mdProps }) => (
                    <li {...mdProps}>
                        <TextRenderer>{children}</TextRenderer>
                    </li>
                ),
                h1: ({ node, children, ...mdProps }) => (
                    <Typography
                        variant="h1"
                        {...inheritedTypographyProps}
                        {...mdProps}
                        sx={{ ...inheritedTypographyProps.sx, ...mdProps.sx }}
                    >
                        <TextRenderer>{children}</TextRenderer>
                    </Typography>
                ),
                h2: ({ node, children, ...mdProps }) => (
                    <Typography
                        variant="h2"
                        {...inheritedTypographyProps}
                        {...mdProps}
                        sx={{ ...inheritedTypographyProps.sx, ...mdProps.sx }}
                    >
                        <TextRenderer>{children}</TextRenderer>
                    </Typography>
                ),
                h3: ({ node, children, ...mdProps }) => (
                    <Typography
                        variant="h3"
                        {...inheritedTypographyProps}
                        {...mdProps}
                        sx={{ ...inheritedTypographyProps.sx, ...mdProps.sx }}
                    >
                        <TextRenderer>{children}</TextRenderer>
                    </Typography>
                ),
                h4: ({ node, children, ...mdProps }) => (
                    <Typography
                        variant="h4"
                        {...inheritedTypographyProps}
                        {...mdProps}
                        sx={{ ...inheritedTypographyProps.sx, ...mdProps.sx }}
                    >
                        <TextRenderer>{children}</TextRenderer>
                    </Typography>
                ),
                h5: ({ node, children, ...mdProps }) => (
                    <Typography
                        variant="h5"
                        {...inheritedTypographyProps}
                        {...mdProps}
                        sx={{ ...inheritedTypographyProps.sx, ...mdProps.sx }}
                    >
                        <TextRenderer>{children}</TextRenderer>
                    </Typography>
                ),
                h6: ({ node, children, ...mdProps }) => (
                    <Typography
                        variant="h6"
                        {...inheritedTypographyProps}
                        {...mdProps}
                        sx={{ whiteSpace: 'pre-wrap', ...inheritedTypographyProps.sx, ...mdProps.sx }}
                    >
                        <TextRenderer>{children}</TextRenderer>
                    </Typography>
                ),
                strong: ({ node, children, ...mdProps }) => (
                    <strong {...mdProps}>
                        <TextRenderer>{children}</TextRenderer>
                    </strong>
                ),
                em: ({ node, children, ...mdProps }) => (
                    <em {...mdProps}>
                        <TextRenderer>{children}</TextRenderer>
                    </em>
                ),
            }}
            {...props}
        >
            {children}
        </ReactMarkdown>
    );
}

