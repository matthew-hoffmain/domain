import React from "react";
import MarkdownWithTooltips from "../MarkdownWithTooltips";

export default function HomePage() {
    return (<div>
            <MarkdownWithTooltips>
                My name is [[Matthew Hoffman::The person who created this website.]].
                I am a [[law school applicant::A person seeking entry into law schools.]] with a background in [[computer and software engineering::Coding!]].
            </MarkdownWithTooltips>
        </div>
    );
}