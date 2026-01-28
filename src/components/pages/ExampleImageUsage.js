// Example of using HighlightImage component without articles overlay
// This demonstrates the flexibility of the abstracted component

import React from "react";
import { Container } from "@mui/material";
import HighlightImage from '../HighlightImage';
import exampleImage from '../../static/image/Smithsonian_Institution.jpeg';

export default function ExampleImagePage() {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <HighlightImage
                imageSrc={exampleImage}
                imageTitle="Smithsonian Institution"
                imageCreator="Photo by Matthew Hoffman"
                licenseUrl="https://creativecommons.org/licenses/by/4.0/"
                licenseText="CC BY 4.0 License"
                downloadFileName="Smithsonian_Institution.jpeg"
                height={1000}
            />

            {/*
                To add custom content over the image, just pass it as children:

                <HighlightImage
                    imageSrc={exampleImage}
                    imageTitle="My Image"
                    imageCreator="Photo by Me"
                    height={500}
                >
                    <Box sx={{ position: 'absolute', top: 50, left: 50 }}>
                        <Typography variant="h1">Custom Content</Typography>
                    </Box>
                </HighlightImage>
            */}
        </Container>
    );
}
