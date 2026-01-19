import ExternalLinkModal from "../ExternalLinkModal";
import React from "react";
import {Container} from "@mui/material";
import MarkdownWithTooltips from "../MarkdownWithTooltips";

export default function AboutMePage() {
    return (
        <Container maxWidth={'md'}>
            <MarkdownWithTooltips align={"justify"}>
                {'Welcome to my website! My name is [[Matthew Hoffman]].' +
                    ' I am a law school applicant with a background in ' +
                    'computer and software engineering. I created this website to showcase ' +
                    ' several topics of both legal technologies and legal policies regarding technology.'}
            </MarkdownWithTooltips>
        </Container>
    );
}