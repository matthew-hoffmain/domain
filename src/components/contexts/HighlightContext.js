import React, { createContext, useContext, useState } from 'react';

const HighlightContext = createContext();

export const useHighlight = () => {
    const context = useContext(HighlightContext);
    if (context === undefined) {
        throw new Error('useHighlight must be used within a HighlightProvider');
    }
    return context;
};

export const HighlightProvider = ({ children }) => {
    const [highlightEnabled, setHighlightEnabled] = useState(true);

    const toggleHighlight = () => {
        setHighlightEnabled(prev => !prev);
    };

    const value = {
        highlightEnabled,
        toggleHighlight,
        setHighlightEnabled
    };

    return (
        <HighlightContext.Provider value={value}>
            {children}
        </HighlightContext.Provider>
    );
};
