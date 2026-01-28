import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router";
import './index.css';
import App from './App';
import {HighlightProvider, ThemeContextProvider} from "./components/contexts/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ThemeContextProvider>
            <HighlightProvider>
                <App />
            </HighlightProvider>
        </ThemeContextProvider>
    </BrowserRouter>
);
