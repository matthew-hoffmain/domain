import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Tooltip, Typography, Box, IconButton, Divider } from '@mui/material';
import { useNavigate } from 'react-router';
import { useHighlight, useThemeMode } from './contexts/ThemeContext';
import ExternalLinkModal from './ExternalLinkModal';
import StyledTooltip from './StyledTooltip';
import definitions from '../static/json/definitions.json';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const definitionsLowerCaseMap = Object.keys(definitions).reduce((acc, key) => {
    acc[key.toLowerCase()] = key;
    return acc;
}, {});

const HighlightedText = React.forwardRef(({ variant = 'generic', children, ...props }, ref) => {
    const { isDarkMode } = useThemeMode();

    const getColors = () => {
        if (isDarkMode) {
            // Darker colors for dark mode
            return {
                backgroundColor:
                    variant === 'professional' ? '#0d47a1' :
                    variant === 'academic' ? '#b71c1c' :
                    variant === 'personal' ? '#1b5e20' :
                        '#f9a825',
                color: '#ffffff',
                borderBottom:
                    variant === 'professional' ? '1px dotted #1565c0' :
                    variant === 'academic' ? '1px dotted #c62828' :
                    variant === 'personal' ? '1px dotted #2e7d32' :
                        '1px dotted #fbc02d',
                hoverBackgroundColor:
                    variant === 'professional' ? '#1565c0' :
                    variant === 'academic' ? '#c62828' :
                    variant === 'personal' ? '#2e7d32' :
                        '#fdd835',
            };
        } else {
            return {
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
                borderBottom:
                    variant === 'professional' ? '1px dotted #1565c0' :
                    variant === 'academic' ? '1px dotted #c62828' :
                    variant === 'personal' ? '1px dotted #2e7d32' :
                        '1px dotted #856404',
                hoverBackgroundColor:
                    variant === 'professional' ? '#bbdefb' :
                    variant === 'academic' ? '#ffcdd2' :
                    variant === 'personal' ? '#c8e6c9' :
                        '#ffeaa7',
            };
        }
    };

    const colors = getColors();

    return (
        <Box
            ref={ref}
            component="span"
            {...props}
            sx={{
                backgroundColor: colors.backgroundColor,
                color: colors.color,
                padding: '2px 0px',
                borderRadius: '3px',
                cursor: 'help',
                borderBottom: colors.borderBottom,
                '&:hover': {
                    backgroundColor: colors.hoverBackgroundColor,
                },
            }}
        >
            {children}
        </Box>
    );
});


let processTextWithTooltips;

const TooltipContent = ({ content, term }) => {
    const navigate = useNavigate();
    const imageMatch = content.match(/^(IMG|GIF):(.+)$/);
    const textAndImageMatch = content.match(/^(.+?)\s*\|\s*(IMG|GIF):(.+)$/);

    const handleIconClick = (e) => {
        e.stopPropagation();
        if (term) {
            const termId = term.toLowerCase().replace(/\s+/g, '-');
            navigate(`/glossary#term-${termId}`);
        }
    };

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
                    color: 'inherit',
                    margin: 0,
                    textAlign: 'left'
                }}>
                    <HelpOutlineIcon
                        onClick={handleIconClick}
                        sx={{
                            fontSize: '1rem',
                            verticalAlign: 'text-top',
                            mr: 0.5,
                            cursor: term ? 'pointer' : 'default',
                            '&:hover': term ? {
                                opacity: 0.7
                            } : {}
                        }}
                    />
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
                maxWidth: '300px',
                margin: 0
            }}>
                <HelpOutlineIcon
                    onClick={handleIconClick}
                    sx={{
                        fontSize: '1rem',
                        verticalAlign: 'text-top',
                        mr: 0.5,
                        mt: 0.2,
                        cursor: term ? 'pointer' : 'default',
                        '&:hover': term ? {
                            opacity: 0.7
                        } : {}
                    }}
                />
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
                <StyledTooltip
                    key={match.index}
                    title={<TooltipContent content={finalDefinition} term={originalKey || word} />}
                    placement="bottom"
                    arrow={true}
                >
                    <HighlightedText variant={variant}>{word}</HighlightedText>
                </StyledTooltip>
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
    const navigate = useNavigate();
    const { isDarkMode } = useThemeMode();
    const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));

    const linkColor = isDarkMode ? '#90caf9' : '#1976d2';
    const linkHoverColor = isDarkMode ? '#64b5f6' : '#1565c0';

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
                        color: linkColor,
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        '&:hover': {
                            color: linkHoverColor,
                        },
                    }}
                >
                    <TextRenderer>{children}</TextRenderer>
                </Box>
            </ExternalLinkModal>
        );
    } else {
        return (
            <Box
                component="span"
                onClick={(e) => {
                    e.preventDefault();
                    navigate(href);
                }}
                sx={{
                    color: linkColor,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    '&:hover': {
                        color: linkHoverColor,
                    },
                }}
            >
                <TextRenderer>{children}</TextRenderer>
            </Box>
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
                hr: () => <Divider sx={{ my: 4 }} />,
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

