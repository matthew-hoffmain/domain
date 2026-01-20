import {Container, Typography} from "@mui/material";
import MarkdownWithTooltips from "../../MarkdownWithTooltips";
import React from "react";

const ArticleTitle =
    'You Can\'t Steal It, It\'s Yours'

const ArticleText =
    '> First and foremost, welcome to my website. I started this project to serve as an online portfolio, and to demonstrate a few of my passioned interests in the realm between technology and law. I am a professional software engineer 4 years out of graduate school, with a paralegal certification, and I am currently applying to law schools. My background lends me towards intellectual property and technology law, but I am deeply interested in all aspects of legal advocacy and the creation of informed policy.\n\n' +
    '> A common issue in the Age of the Internet, in my experience as a web designer, is the question of ownership of content in an environment where reproducing someone else\'s work is a matter of automation, a few clicks, or even voice commands. The question really only becomes an issue when monetization is attempted. For many volunteer developers who work on open-sourced projects, they forgoe this question by giving their software highly-permissable licensing rights to anyone who wishes to use their work.\n\n' +
    '> **This website is built to serve as an exemplary platform comprised solely of content that is freely redistributable, from art and music to open-source software.** You can borrow, modify, reproduce, and alter anything you find here, but you can\'t steal anything because it already belongs to you.\n\n' +
    '> The website is built using React, a popular JavaScript library for building user interfaces, and Material-UI, a widely used React component library that implements Google\'s Material Design principles. The website is hosted on GitHub Pages, a free hosting service provided by GitHub for static websites, and the source code is viewable on GitHub as well. The source contains the MIT license, and all media is either licensed through Creative Commons or part of the public domain.\n\n' +
    '> Think of this site as a meal made with only locally-sourced, fully organic produce. While it might be the same as your other options, it provides a host of other benefits.\n\n' +
    '> *Phantom Reader: Matt, why* \n\n'


export default function TestArticle() {
    return <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
        <Typography
            variant="h3"
            component="h2"
            gutterBottom
            align="center"
            sx={{
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2,
                fontFamily: 'Times New Roman, serif',
                textDecoration: 'underline'
            }}
        >
            {ArticleTitle}
        </Typography>
        <Typography fontFamily={"times-new-roman"}>Written by Matthew Hoffman</Typography>
        <MarkdownWithTooltips align={"justify"}>
            {ArticleText}
        </MarkdownWithTooltips>
    </Container>
}