import React, { useState, useEffect } from "react";
import AudioPlayerV2 from "../TrackComponents/AudioPlayerV2/AudioPlayer";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <AudioPlayerV2 />
        </footer>
    )
}

export default Footer;