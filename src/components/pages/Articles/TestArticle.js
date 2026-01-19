import {Container, Typography} from "@mui/material";
import MarkdownWithTooltips from "../../MarkdownWithTooltips";
import React from "react";

const ArticleTitle =
    'All Your Website Are Belong to Us'

const ArticleText =
    'In the age of .'


export default function TestArticle() {
    return <Container className="App">
        <Typography
            variant="h3"
            component="h2"
            gutterBottom
            align="center"
            sx={{
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2,
                fontFamily: 'Times New Roman, serif'
            }}
        >
            {ArticleTitle}
        </Typography>
        <MarkdownWithTooltips align={"justify"}>
            {ArticleText}
        </MarkdownWithTooltips>
    </Container>
}