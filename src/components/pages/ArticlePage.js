import React, { useState, useEffect } from "react";
import ArticlesDict from '../../static/json/articles.json';
import {Container, Typography, Box, Divider, Button} from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';
import MarkdownWithTooltips from "../MarkdownWithTooltips";
import { useParams, useNavigate } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ArticlePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [articleContent, setArticleContent] = useState([]);
    const [article, setArticle] = useState(null);

    const currentIndex = ArticlesDict.findIndex(a => a.id === parseInt(id));
    const previousArticle = currentIndex > 0 ? ArticlesDict[currentIndex - 1] : null;
    const nextArticle = currentIndex < ArticlesDict.length - 1 ? ArticlesDict[currentIndex + 1] : null;

    useEffect(() => {
        window.scrollTo(0, 0);

        const foundArticle = ArticlesDict.find(a => a.id === parseInt(id));
        if (!foundArticle) {
            setArticle(null);
            return;
        }
        setArticle(foundArticle);

        const loadContent = async () => {
            const content = [];
            const folder = foundArticle.folder;

            for (let fileIndex = 1; fileIndex <= 30; fileIndex++) {
                try {
                    const mdPath = require(`../../static/articles/${folder}/${fileIndex}.md`);
                    const response = await fetch(mdPath);
                    const text = await response.text();
                    content.push({ type: 'markdown', content: text, index: fileIndex });
                } catch (error) {
                }
            }

            const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

            for (let i = 1; i <= 30; i++) {
                for (const ext of imageExtensions) {
                    try {
                        const imgPath = require(`../../static/image/${folder}/${i}.${ext}`);
                        content.push({ type: 'image', content: imgPath, index: i });
                        break;
                    } catch (error) {
                    }
                }
            }

            content.sort((a, b) => a.index - b.index);
            setArticleContent(content);
        };

        loadContent();
    }, [id]);

    if (!article) {
        return (
            <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
                <Typography variant="h4" align="center">
                    Article not found
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: { xs: 6, md: 10 }, mb: 4, px: { xs: 2, md: 3 } }}>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
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
                            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
                        }}
                    >
                        {article.title}
                    </Typography>
                    <Typography
                        fontFamily={"Times New Roman, serif"}
                        align="center"
                        sx={{
                            mb: 4,
                            color: 'text.secondary',
                            fontSize: { xs: '0.875rem', md: '1rem' }
                        }}
                    >
                        Written by {article.author} - {article.date}
                    </Typography>

                    <Divider sx={{ mb: 4 }} />

                    {articleContent.map((item, index) => {
                        if (item.type === 'markdown') {
                            return (
                                <MarkdownWithTooltips key={`md-${index}`} align={"justify"}>
                                    {item.content}
                                </MarkdownWithTooltips>
                            );
                        } else if (item.type === 'image') {
                            return (
                                <Box
                                    key={`img-${index}`}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        my: 3
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={item.content}
                                        alt={`Article image ${item.index}`}
                                        sx={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                            borderRadius: 2,
                                            boxShadow: 2
                                        }}
                                    />
                                </Box>
                            );
                        }
                        return null;
                    })}

                    {/* Navigation to adjacent articles */}
                    <Divider sx={{ my: 4 }} />

                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'stretch', sm: 'center' },
                        gap: { xs: 2, sm: 0 },
                        mt: 4,
                        mb: 2
                    }}>
                        {previousArticle ? (
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                onClick={() => navigate(`/articles/${previousArticle.id}`)}
                                sx={{
                                    textTransform: 'none',
                                    maxWidth: { xs: '100%', sm: '45%' },
                                    minHeight: 44,
                                    justifyContent: 'flex-start'
                                }}
                            >
                                <Box sx={{ textAlign: 'left', overflow: 'hidden' }}>
                                    <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
                                        Previous
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 500,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {previousArticle.title}
                                    </Typography>
                                </Box>
                            </Button>
                        ) : (
                            <Box></Box>
                        )}

                        {nextArticle ? (
                            <Button
                                variant="outlined"
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => navigate(`/articles/${nextArticle.id}`)}
                                sx={{
                                    textTransform: 'none',
                                    maxWidth: { xs: '100%', sm: '45%' },
                                    minHeight: 44,
                                    justifyContent: 'flex-end'
                                }}
                            >
                                <Box sx={{ textAlign: 'right', overflow: 'hidden' }}>
                                    <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
                                        Next
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 500,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {nextArticle.title}
                                    </Typography>
                                </Box>
                            </Button>
                        ) : (
                            <Box></Box>
                        )}
                    </Box>
                </motion.div>
            </AnimatePresence>
        </Container>
    );
}