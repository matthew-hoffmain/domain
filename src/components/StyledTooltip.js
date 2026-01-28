import React from 'react';
import { Tooltip } from '@mui/material';

export default function StyledTooltip({
    children,
    title,
    placement = "top",
    arrow = false,
    offset = [0, 0],
    maxWidth = 'none',
    popperModifiers = [],
    ...otherProps
}) {
    const defaultModifiers = [
        {
            name: 'offset',
            options: {
                offset: offset,
            },
        },
        ...popperModifiers
    ];

    return (
        <Tooltip
            title={title}
            placement={placement}
            arrow={arrow}
            slotProps={{
                popper: {
                    modifiers: defaultModifiers,
                },
                tooltip: {
                    sx: {
                        bgcolor: '#333',
                        color: 'white',
                        fontSize: '0.875rem',
                        maxWidth: maxWidth,
                        whiteSpace: maxWidth === 'none' ? 'normal' : 'pre-wrap',
                        wordBreak: 'break-word',
                        '& .MuiTooltip-arrow': {
                            color: '#333',
                        },
                    },
                },
            }}
            {...otherProps}
        >
            {children}
        </Tooltip>
    );
}
