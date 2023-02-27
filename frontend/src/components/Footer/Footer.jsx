import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadTracks } from "../../store/track";
import AudioPlayer from "../TrackComponents/AudioPlayer/AudioPlayer";
// import AudioPlayer from "../TrackComponents/AltAudioPlayer/AudioPlayer";
import './Footer.css';

const Footer = () => {
    const tracks = Object.values(useSelector(state => state.tracks.allTracks));
    console.log("FOOTER TRACKS===>", tracks);

    return (
        <footer className="footer">
            <AudioPlayer tracks={tracks} />
        </footer>
    )
}

export default Footer;