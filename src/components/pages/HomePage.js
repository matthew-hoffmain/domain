import React from "react";
import MarkdownWithTooltips from "../MarkdownWithTooltips";
import {Container, Accordion, AccordionSummary, AccordionDetails, Typography, Box} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function HomePage() {
    return (
        <Container maxWidth={'md'}>
            <MarkdownWithTooltips align={"justify"}>
                {'My name is [[Matthew Hoffman]].' +
                    ' I am a law school applicant with a background in ' +
                    'computer and software engineering. I created this website to showcase ' +
                    ' several topics of both legal technologies and legal policies regarding technology.'}
            </MarkdownWithTooltips>
        </Container>
    );
}