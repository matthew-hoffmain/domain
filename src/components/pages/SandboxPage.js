import ExternalLinkModal from "../ExternalLinkModal";
import React from "react";

export default function SandboxPage() {
    return (<div>
        <h2>Sandbox Page</h2>
        <p>This is a sandbox page for testing and experimentation.</p>
        <ExternalLinkModal href={"https://www.google.com"}>Click here to go to Google</ExternalLinkModal>
    </div>
    );
}