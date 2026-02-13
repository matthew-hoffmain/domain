import {Accordion, AccordionDetails, AccordionSummary, Container, Typography} from "@mui/material";
import MarkdownWithTooltips from "../MarkdownWithTooltips";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

export default function FAQPage() {
    return (
        <Container maxWidth={"md"} sx={{'mt': 4, 'display': 'flex', 'flexDirection': 'column'}}>
            <h2 align={"left"}>Website Features</h2>
            <h3 align={"left"}>Highlighted Text</h3>
            <MarkdownWithTooltips align={"justify"}>
                {'The [[highlights]] you see throughout the website are interactive. Hovering over any highlighted ' +
                    'word will display a tooltip containing its definition. You can view all the definitions of all words ' +
                    'by visiting the glossary page [here](/glossary).'}
            </MarkdownWithTooltips>
            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontStyle="italic">Why provide highlights and definitions within tooltips?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MarkdownWithTooltips align={"justify"}>
                        {'The intended audience for this website is technology and legal professionals, each of which ' +
                            'may find certain topics from the other side. An online textbook-like experience seemed ' +
                            'like the best method for allowing any user from either background to become part ' +
                            'of the conversation without needing to leave the page to look up unfamiliar terms.'}
                    </MarkdownWithTooltips>
                </AccordionDetails>
            </Accordion>
            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontStyle="italic">Where do you get the definitions for the highlighted words?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MarkdownWithTooltips align={"justify"}>
                        {'The source of each definition is viewable from the glossary page, which can be accessed ' +
                            'by clicking the info icon inside the definition tooltips.'}
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
            <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontStyle="italic">Why would you want a license for content you don't want to monetize?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MarkdownWithTooltips align={"justify"}>
                        {"Monetization isn't the only reason to use licensing. By applying a Creative Commons license " +
                        "to music or art, you can ensure that others can freely use, share, and even build upon your " +
                        "work, while still receiving proper attribution. This helps promote a culture of sharing " +
                        "and collaboration, which is especially important in creative communities."}
                    </MarkdownWithTooltips>
                </AccordionDetails>
            </Accordion>
        </Container>
    )
}