import ReactMarkdown from "react-markdown";
import {Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography} from "@mui/material";
import MarkdownWithTooltips from "../MarkdownWithTooltips";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

export default function AboutThisWebsitePage() {
    return (
        <Container maxWidth={"md"}>
            <h2 align={"left"}>About This Website (i.e: why I've brought you here)</h2>
            <MarkdownWithTooltips align={"justify"}>
                {'This website is designed to include only highly-permissible software licensing and works included ' +
                    'in the public domain or acquired via [[Creative Commons]]. This is part of an intentional effort ' +
                    'to create a domain that is indefinitely accessible, reproducible, and modifiable by anyone who ' +
                    'wishes to do so. As such, this website is open-source and includes the MIT License.'}
            </MarkdownWithTooltips>
            <h2 align={"left"}>Website Features</h2>
            <h3 align={"left"}>Highlighted Text</h3>
            <MarkdownWithTooltips align={"justify"}>
                {'The [[highlights]] you see throughout the website are interactive. Hovering over any highlighted ' +
                    'word will display a tooltip containing its definition.'}
            </MarkdownWithTooltips>
            <Box sx={{ mb: 1 }} />
            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontStyle="italic">Where do you get the definitions for the highlighted words?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MarkdownWithTooltips align={"justify"}>
                        {'The source of each definition is viewable from the dictionary page, which can be accessed ' +
                            'by clicking the any highlighted words.'}
                    </MarkdownWithTooltips>
                </AccordionDetails>
            </Accordion>
            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontStyle="italic">Why do some highlights have different colors?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MarkdownWithTooltips align={"justify"}>
                        {'The words are highlighted according to certain categories.\n\n' +
                            '- [[Generic]] terms are highlighted in yellow.\n\n' +
                            '- Words associated with my [[professional]] background are highlighted in blue.\n\n' +
                            '- Words associated with my [[academic]] background are highlighted in red.\n\n' +
                            '- Words associated with my [[personal]] background are highlighted in green.\n\n'}
                    </MarkdownWithTooltips>
                </AccordionDetails>
            </Accordion>
            <h3 align={"left"}>Free-Use Music</h3>
            <MarkdownWithTooltips align={"justify"}>
                {'This website features a music player that allows you to listen to music licensed under Creative ' +
                    'Commons. This music is either created and licensed by myself or by other artists who have ' +
                    'granted permission for free use of their works.'}
            </MarkdownWithTooltips>
            <Box sx={{ mb: 1 }} />
            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontStyle="italic">What music have you created?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MarkdownWithTooltips align={"justify"}>
                        {"I play piano and have recorded a series of Chopin's [[Nocturnes]]. While the sheet music for " +
                            "these pieces is in the public domain, my recordings are licensed under Creative Commons."}
                    </MarkdownWithTooltips>
                </AccordionDetails>
            </Accordion>
            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontStyle="italic">What is the difference between public domain and Creative Commons?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MarkdownWithTooltips align={"justify"}>
                        {"Public domain works are free for anyone to use without any restrictions, as their copyright " +
                            "has expired or been forfeited. Creative Commons works, on the other hand, are still under " +
                            "copyright, but the creators have granted certain permissions for their use, often with " +
                            "specific conditions such as attribution or non-commercial use.\n\n" +
                            "For example, my recordings of Chopin's Nocturnes are licensed under Creative Commons " +
                            "because, while the compositions themselves are in the public domain, my specific " +
                            "recordings are protected by copyright."}
                    </MarkdownWithTooltips>
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}